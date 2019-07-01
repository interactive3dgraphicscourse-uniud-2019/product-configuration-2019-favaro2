var camera, scene, renderer, mesh, material, stats;
var container, w, h;


init();
animate();

function init() {
  // Renderer.
  renderer = new THREE.WebGLRenderer({antialias: true});
  //renderer.setPixelRatio(window.devicePixelRatio);
  //renderer.setSize(window.innerWidth, window.innerHeight);
  // Add renderer to page
  //document.body.appendChild(renderer.domElement);

  // get container to contain three.js canvas.
  container = document.getElementById('canvas-container');
  w = container.offsetWidth;
  h = container.offsetHeight;
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

  // Create camera.
  //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera = new THREE.PerspectiveCamera(70, w / h, 1, 1000);
  camera.position.z = 400;

  // Create scene.
  scene = new THREE.Scene();

  // Create material
  material = new THREE.MeshPhongMaterial();

  // Create cube and add to scene.
  var geometry = new THREE.BoxGeometry(150, 150, 150);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Create ambient light and add to scene.
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  // Create directional light and add to scene.
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Add listener for window resize.
  //window.addEventListener('resize', onWindowResize, false);

  // Add stats to page.
  stats = new Stats();
  document.body.appendChild( stats.dom );

  controls = new THREE.OrbitControls( camera, document.getElementById('canvas-container') );
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  stats.update();
}

addEventListener('resize', function() {
  location.reload();
});
