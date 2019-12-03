var scene, renderer, camera;
var controls;
var board;
var raycaster = new THREE.Raycaster(), pIntersected, bIntersected;
var mouse = new THREE.Vector2();
var playerPieces = new THREE.Object3D();
var enemyPieces = new THREE.Object3D();
var gameBoard = new THREE.Object3D();
var clickedPiece = null;
var hoverPiece = null;
var clickedPieceColor = null;
var hoverPieceColor = null;
var clickedSpace = null;
var hoverSpace = null;
var clickedSpaceColor = null;
var hoverSpaceColor = null;
var colors = [0xaaaaaa, 0xffaa00, 0xaaaaff];
document.getElementById("Trapdoor").addEventListener("click", useTrap);

function main() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff0cc);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //camera.position.set(0, 20, 0);
    camera.position.set(0, (window.innerWidth/ window.innerHeight) * 10, 0);
    controls.update();

    board = new Array(8);
    for (var i = 0; i < 8; i++) {
        board[i] = new Array(8);
    }

    //BOARD
    var boardBoxGeo = new THREE.BoxGeometry(1, 1, 1);
  
    for (var x = 0; x < 8; x++) { // Create Board
        for (var y = 0; y < 8; y++) {
            if ((x + y) % 2 == 0) {
                var Material = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
                board[x][y] = new THREE.Mesh(boardBoxGeo, Material);
                board[x][y].position.set(x - 4, 0, -y + 4);
            } else if ((x + y) % 2 == 0 && 2 < y && y < 5) {
                var Material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
                board[x][y] = new THREE.Mesh(boardBoxGeo, Material);
                board[x][y].position.set(x - 4, 0, -y + 4);
            } else {
                var Material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                board[x][y] = new THREE.Mesh(boardBoxGeo, Material);
                board[x][y].position.set(x - 4, 0, -y + 4);
            }
            gameBoard.add(board[x][y]);
        }
    }
    scene.add(gameBoard);

    //PLAYER
    var playerPieceGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
    var z = 4;
    var x = -4;
    for (var i = 0; i < 12; i++) {
        var Material = new THREE.MeshBasicMaterial({ color: 0xaaaaff });
        var playerPiece = new THREE.Mesh(playerPieceGeo, Material);
        playerPiece.position.set(x, 0.7, z);
        playerPieces.add(playerPiece);

        x += 2;
        
        if (i % 4 == 3) {
            z--;
            if (i < 7) {
                x = -3;

            } else {
                x = -4;
            }
        }
    }
    scene.add(playerPieces);

    //ENEMY
    z = -3;
    x = -3;
    for (var i = 0; i < 12; i++) {
        var Material = new THREE.MeshBasicMaterial({ color: 0xaaffaa });
        var enemyPiece = new THREE.Mesh(playerPieceGeo, Material);
        enemyPiece.position.set(x, 0.7, z);
        enemyPieces.add(enemyPiece);
        x += 2;
        
        if (i % 4 == 3) {
            z++;
            if (i < 7) {
                x = -4;

            } else {
                x = -3;
            }
        }
    }
    scene.add(enemyPieces);


    //Event Listeners
    window.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    window.requestAnimationFrame(render);
}
function onDocumentMouseDown(event) {

    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    //Space selected
    if (clickedPiece != null) {

        var intersects = raycaster.intersectObjects(gameBoard.children);
        if (intersects.length > 0) {
            if (clickedSpace != intersects[0]) {
                if (clickedSpace != null) {
                    clickedSpace.object.material.color.setHex(clickedSpaceColor);
                }
                if (clickedSpace == null || bIntersected != clickedSpace.object) {
                    clickedSpaceColor = hoverSpaceColor;
                }
                clickedSpace = intersects[0];
                clickedSpace.object.material.color.set(0xff00ff);
                clickedPiece.object.material.color.setHex(clickedPieceColor);
                clickedPiece.object.position.set(clickedSpace.object.position.x, clickedPiece.object.position.y - 0.5, clickedSpace.object.position.z);
                clickedPiece = null;

                document.getElementById("Trapdoor").style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

            }
            clickedSpace.object.material.color.setHex(clickedSpaceColor);
            clickedSpace = null;
            console.log("Clicked");
        }
    }

    //Player Pieces selected
    var pintersects = raycaster.intersectObjects(playerPieces.children);
    if (pintersects.length > 0) {
        if (clickedPiece != pintersects[0]) {
            if (clickedPiece != null) {
                clickedPiece.object.material.color.setHex(clickedPieceColor);
                clickedPiece.object.position.set(clickedPiece.object.position.x, clickedPiece.object.position.y - 0.5, clickedPiece.object.position.z);
            }
            if (clickedPiece == null || pIntersected != clickedPiece.object) {
                clickedPieceColor = hoverPieceColor;
            }
            clickedPiece = pintersects[0];
            clickedPiece.object.material.color.set(0xff00ff);
            clickedPiece.object.position.set(clickedPiece.object.position.x, clickedPiece.object.position.y + 0.5, clickedPiece.object.position.z);

            document.getElementById("Trapdoor").style.backgroundColor ='#'+(Math.random()*0xFFFFFF<<0).toString(16);

        } else {
            clickedPiece.object.material.color.setHex(clickedPieceColor);
            clickedPiece.object.position.set(clickedPiece.object.position.x, clickedPiece.object.position.y - 0.5, clickedPiece.object.position.z);
            clickedPiece = null;
        }
        console.log("Clicked");
    }
};

function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function render() {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    /* https://codepen.io/PavelLaptev/pen/Rjxoeq?editors=0010 */
    /* https://jsfiddle.net/zbomt9cf/ */

    //Select Space
    if (clickedPiece != null) {
        var intersects = raycaster.intersectObjects(gameBoard.children);
        if (clickedSpace != null) {
            clickedSpace.object.material.color.set(0x0000ff);
        }
        if (intersects.length > 0) {
            // if the closest object pIntersected is not the currently stored intersection object
            if (intersects[0].object != bIntersected) {
                // restore previous intersection object (if it exists) to its original color
                if (bIntersected)
                    bIntersected.material.color.setHex(hoverSpaceColor);
                // store reference to closest object as current intersection object
                bIntersected = intersects[0].object;
                // store color of closest object (for later restoration)
                hoverSpaceColor = bIntersected.material.color.getHex();
                // set a new color for closest object
                if (clickedSpace == null || bIntersected != clickedSpace.object) {
                    bIntersected.material.color.setHex(0x0000ff);
                }
            }
        } else { // there are no intersections

            if (bIntersected) {
                bIntersected.material.color.setHex(hoverSpaceColor);
            }
            bIntersected = null;
        }
    }

    //Select Player
    var pintersects = raycaster.intersectObjects(playerPieces.children);

    if (clickedPiece != null) {
        clickedPiece.object.material.color.set(0xffaaff);
    }
    if (pintersects.length > 0) {
        // if the closest object pIntersected is not the currently stored intersection object
        if (pintersects[0].object != pIntersected) {
            // restore previous intersection object (if it exists) to its original color
            if (pIntersected)
                pIntersected.material.color.setHex(hoverPieceColor);
            // store reference to closest object as current intersection object
            pIntersected = pintersects[0].object;
            // store color of closest object (for later restoration)
            hoverPieceColor = pIntersected.material.color.getHex();
            // set a new color for closest object
            if (clickedPiece == null || pIntersected != clickedPiece.object) {
                pIntersected.material.color.setHex(0xffff00);
            }
        }
    } else { // there are no intersections

        if (pIntersected) {
            pIntersected.material.color.setHex(hoverPieceColor);
        }
        pIntersected = null;
    }
}

function animate() {
    requestAnimationFrame(animate);

    render();
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};

function useTrap() {
    console.log("Trap Used!!");
}

main();
animate();