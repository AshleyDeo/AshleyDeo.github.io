let scene, renderer, camera;
let controls;
let board;
let raycaster = new THREE.Raycaster(), pIntersected, bIntersected;
let mouse = new THREE.Vector2();
let playerPieces = new THREE.Object3D();
let enemyPieces = new THREE.Object3D();
let gameBoard = new THREE.Object3D();

let clickedPiece = null;
let hoverPiece = null;
let clickedPieceColor = null;
let hoverPieceColor = null;
let clickedSpace = null;
let hoverSpace = null;
let clickedSpaceColor = null;
let hoverSpaceColor = null;

let colors = [0xaaaaaa, 0xffaa00, 0xaaaaff];
//document.getElementById("Trapdoor").addEventListener("click", useTrap);
let modal = document.getElementById("modal");
let btn = document.getElementById("Help-Button");
//let span = document.getElementsByClassName("close")[0];
let ctrlBar = document.getElementById("snackbar");


let TurnCounter = 0;

enemyPositions = new Array(8);
boardPositions = new Array(8);
for (let i = 0; i < 8; i++) {
    boardPositions[i] = new Array(8);
}


function main() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff0cc);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //camera.position.set(0, 20, 0);
    camera.position.set(0, (window.innerWidth/ window.innerHeight) * 10, 0);
    controls.update();

    board = new Array(8);
    for (let i = 0; i < 8; i++) {
        board[i] = new Array(8);
    }

    //BOARD
    let boardBoxGeo = new THREE.BoxGeometry(1, 1, 1);
  
    for (let x = 0; x < 8; x++) { // Create Board
        for (let y = 0; y < 8; y++) {
            boardPositions[x][y] = 0;
            if ((x + y) % 2 == 0 && 1 < y && y < 6) {
                let Material = new THREE.MeshBasicMaterial({ color: 0x00b000 });
                board[x][y] = new THREE.Mesh(boardBoxGeo, Material);
                board[x][y].position.set(x - 4, 0, -y + 4);
                gameBoard.add(board[x][y]);
            } else if ((x + y) % 2 == 0) {
                let Material = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
                board[x][y] = new THREE.Mesh(boardBoxGeo, Material);
                board[x][y].position.set(x - 4, 0, -y + 4);
                gameBoard.add(board[x][y]);
            } else {
                let Material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                board[x][y] = new THREE.Mesh(boardBoxGeo, Material);
                board[x][y].position.set(x - 4, 0, -y + 4);
                //scene.add(board[x][y]);
                scene.add(board[x][y]);
            }
        }
    }
    scene.add(gameBoard);

    //PLAYER
    let playerPieceGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
    let z = 4;
    let x = -4;
    for (let i = 0; i < 12; i++) {
        let Material = new THREE.MeshBasicMaterial({ color: 0xaaaaff });
        let playerPiece = new THREE.Mesh(playerPieceGeo, Material);
        playerPiece.position.set(x, 0.6, z);
        console.log((x + 4) + ", " + (z + 4));
        boardPositions[z + 3][x + 4] = 1;
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
    for (let i = 0; i < 12; i++) {
        let Material = new THREE.MeshBasicMaterial({ color: 0xaaffaa });
        let enemyPiece = new THREE.Mesh(playerPieceGeo, Material);
        enemyPiece.position.set(x, 0.6, z);
        boardPositions[z + 3][x + 4] = 2;
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

    printBoard();

    //Event Listeners
    document.addEventListener('DOMContentLoaded', showControl, false);

    btn.addEventListener("click", openPopUp);
    //span.addEventListener("click", closePopUp);
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    window.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    window.requestAnimationFrame(render);
}
function onDocumentMouseDown(event) {

    //event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    //Space selected
    movePiece();

    //Player Pieces selected
    let pintersects;
    if (TurnCounter % 2 == 0) {
        pintersects = raycaster.intersectObjects(playerPieces.children);
    } else {
        pintersects = raycaster.intersectObjects(enemyPieces.children);
    }
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

            //document.getElementById("Trapdoor").style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

        } else {
            clickedPiece.object.material.color.setHex(clickedPieceColor);
            clickedPiece.object.position.set(clickedPiece.object.position.x, clickedPiece.object.position.y - 0.5, clickedPiece.object.position.z);
            clickedPiece = null;
        }

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
        let intersects = raycaster.intersectObjects(gameBoard.children);
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
    let pintersects;
    //Select Player
    if (TurnCounter % 2 == 0) {
        pintersects = raycaster.intersectObjects(playerPieces.children);
    } else {
        pintersects = raycaster.intersectObjects(enemyPieces.children);
    }

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
function openPopUp() {
    modal.style.display = "block";
}
function closePopUp() {
    modal.style.display = "none";
}
function showControl() {
    ctrlBar.className = "show";
    setTimeout(function () { ctrlBar.className = ctrlBar.className.replace("show", ""); }, 3000);
}
function useTrap() {
    console.log("Trap Used!!");
}

function movePiece() {
    if (clickedPiece != null) {

        let intersects = raycaster.intersectObjects(gameBoard.children);
        let moveable;
        if (intersects.length > 0) {
            if (TurnCounter % 2 == 0) {
                moveable = checkPositions(intersects[0].object);
            } else {
                moveable = moveEnemy(intersects[0].object);
            }
            if (clickedSpace != intersects[0]) {
                if (clickedSpace != null) {
                    clickedSpace.object.material.color.setHex(clickedSpaceColor);
                }
                if (clickedSpace == null || bIntersected != clickedSpace.object) {
                    clickedSpaceColor = hoverSpaceColor;
                }
                clickedSpace = intersects[0];

                if (moveable) {
                    boardPositions[clickedPiece.object.position.z + 3][clickedPiece.object.position.x + 4] = 0;
                    clickedSpace.object.material.color.set(0xff00ff);
                    clickedPiece.object.material.color.setHex(clickedPieceColor);
                    clickedPiece.object.position.set(clickedSpace.object.position.x, clickedPiece.object.position.y - 0.5, clickedSpace.object.position.z);
                    if (TurnCounter % 2 == 0) {
                        boardPositions[clickedSpace.object.position.z + 3][clickedSpace.object.position.x + 4] = 1;
                    } else {
                        boardPositions[clickedSpace.object.position.z + 3][clickedSpace.object.position.x + 4] = 2;
                    }
                    clickedPiece = null;
                    TurnCounter++;

                    //document.getElementById("Trapdoor").style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                    //console.log("MOVED!!");
                }
                printBoard();
            }
            clickedSpace.object.material.color.setHex(clickedSpaceColor);
            clickedSpace = null;
            //console.log("Clicked");
        }
    }
}

function printBoard() {
    console.log("--BOARD--");
    for (let x = 0; x < 8; x++) { // Create Board
        console.log(boardPositions[x]);
    }
}

function checkPositions(space) {
    console.log("movePlayer");
    let piece = clickedPiece.object;
    if (space.position.z == piece.position.z - 1) {
        if (space.position.x == piece.position.x + 1 || space.position.x == piece.position.x - 1) {
            if (boardPositions[space.position.z + 3][space.position.x + 4] == 0) {
                return true;
            }
        }
    }
    if (space.position.z == piece.position.z - 2) {
        //console.log("1");
        if (space.position.x == piece.position.x + 2 || space.position.x == piece.position.x - 2) {
            //console.log("2");
            if (boardPositions[piece.position.z + 2][piece.position.x + 5] == 2) {
                //console.log("3");
                if (boardPositions[space.position.z + 3][space.position.x + 4] == 0) {
                    boardPositions[piece.position.z + 2][piece.position.x + 5] = 0;
                    removePiece(space.position.z - 1, space.position.x - 1);
                    return true;
                }
            }
            if (boardPositions[piece.position.z + 2][piece.position.x + 3] == 2) {
                //console.log("3");
                if (boardPositions[space.position.z + 3][space.position.x + 4] == 0) {
                    boardPositions[piece.position.z + 2][piece.position.x + 3] = 0;
                    removePiece(piece.position.z - 1, piece.position.x + 1);
                    return true;
                }
            }
        }
    }
    return false;
}

function moveEnemy(space) {
    console.log("moveEnemy");
    let piece = clickedPiece.object;
    if (space.position.z == piece.position.z + 1) {
        if (space.position.x == piece.position.x + 1 || space.position.x == piece.position.x - 1) {
            if (boardPositions[space.position.z + 3][space.position.x + 4] == 0) {
                return true;
            }
        }
    }
    if (space.position.z == piece.position.z + 2) {
        //console.log("1");
        if (space.position.x == piece.position.x + 2 || space.position.x == piece.position.x - 2) {
            //console.log("2");
            if (boardPositions[piece.position.z + 4][piece.position.x + 5] == 1) {
                //console.log("3");
                if (boardPositions[space.position.z + 3][space.position.x + 4] == 0) {
                    boardPositions[piece.position.z + 4][piece.position.x + 5] = 0;
                    removePiece(piece.position.z + 1, piece.position.x + 1);
                    return true;
                }
            }
            if (boardPositions[piece.position.z + 4][piece.position.x + 3] == 1) {
                //console.log("3");
                if (boardPositions[space.position.z + 3][space.position.x + 4] == 0) {
                    boardPositions[piece.position.z + 4][piece.position.x + 3] = 0;
                    removePiece(piece.position.z + 1, piece.position.x - 1);
                    return true;
                }
            }
        }
    }
    return false;
}
let remZPosE = -5;
let remZPosP = 5;
function removePiece(remPosX, remPosZ) {
    playerPieces.traverse(function (child) {
        if (child.position.x == remPosX &&
            child.position.z == remPosZ) {
            console.log("PlayerRemoved");
            child.position.x = -5;
            child.position.z == remZPosP;
            remZPosP++;
        }
    });
    enemyPieces.traverse(function (child) {
        if (child.position.x == remPosX &&
            child.position.z == remPosZ) {
            console.log("EnemyRemoved");
            child.position.x = 5;
            child.position.z == remZPosE;
            remZPosE++;
        }
    });

}

main();
animate();