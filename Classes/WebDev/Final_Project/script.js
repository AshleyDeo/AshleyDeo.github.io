let scene, renderer, camera;

function main() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x330075);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 100);

    let radius = 1;
    let geometry1 = new THREE.OctahedronBufferGeometry(radius);
    let geometry2 = new THREE.SphereGeometry(radius, 8, 8);

    for (let i = 0; i < 50; i++) {
        let Material = new THREE.MeshBasicMaterial({ color: Math.floor(Math.random() * 16777215) });
        let objN;
        if (i % 2 == 0) {
            objN = new THREE.Mesh(geometry1, Material);
        } else {
            objN = new THREE.Mesh(geometry2, Material);
        }
        objN.position.set((Math.random() * 20 / 2) * 2 - 10, (Math.random() * 20 / 2) * 2 - 10, (Math.random() * 20 / 2) * 2 - 10);
        scene.add(objN);
    }

    camera.position.z = 5;

    window.addEventListener('resize', onWindowResize, false);
}
function animate() {
    scene.traverse(function (child) {
        child.rotation.x += 0.001;
        child.rotation.y += 0.01;
    });
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};

main();
animate();