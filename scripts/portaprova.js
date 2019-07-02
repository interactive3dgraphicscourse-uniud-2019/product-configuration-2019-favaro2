function showGoldDoor(){

document.getElementById('canvas-container').innerHTML = "";

var scene, renderer, camera, stats, controls, ourMaterial, container, w, h;

// default: white, 1.0 intensity
var lightParameters = {
  red: 1.0,
  green: 1.0,
  blue: 1.0,
  intensity: 1.0,
}

// default: gold
var cspec = {
  red: 1.0,
  green: 0.71,
  blue: 0.29,
  roughness: 0.54
}

var uniforms = {
      cspec:	{ type: "v3", value: new THREE.Vector3() },
      roughness: {type: "f", value: 0.5},
      pointLightPosition1:	{ type: "v3", value: new THREE.Vector3() },
      pointLightPosition2:	{ type: "v3", value: new THREE.Vector3() },
      pointLightPosition3:	{ type: "v3", value: new THREE.Vector3() },
      pointLightPosition4:	{ type: "v3", value: new THREE.Vector3() },
      clight:	{ type: "v3", value: new THREE.Vector3() },
    };

vs = document.getElementById("vertex").textContent;
fs = document.getElementById("fragment").textContent;

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
  renderer.setClearColor( 0xf0f0f0 );
  container.appendChild(renderer.domElement);

  // Create camera.
  //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera = new THREE.PerspectiveCamera(70, w / h, 1, 10000);
  camera.position.z = 10;

  // Create scene.
  scene = new THREE.Scene();

  ourMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });


  // instantiate a loader
  var loader = new THREE.OBJLoader();
  // load a resource
  loader.load(
    // resource URL
    'model/Door_Component_BI3.obj',
    // Function when resource is loaded
    function ( object ) {
      //object.scale.set(0.1, 0.1, 0.1);
      //object.position.set(0, -175, 0);
      //scene.add( object );
      console.log(object);

      geometry = object.children[0].geometry;
      mesh = new THREE.Mesh( geometry,ourMaterial );
      mesh.scale.set(200, 200, 200);
      //mesh.position.set(100, 100, 100);
      mesh.position.y = -200;
      scene.add( mesh );
      console.log(mesh.position);

      geometry1 = object.children[1].geometry;
      mesh1 = new THREE.Mesh( geometry1, ourMaterial );
      mesh1.scale.set(200, 200, 200);
      mesh1.position.y = -200;
      scene.add( mesh1 );
    }
  );

  var lightMesh1 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
    new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
  lightMesh1.position.set( 300, 300, 800 );
  uniforms.pointLightPosition1.value = new THREE.Vector3(lightMesh1.position.x,
  lightMesh1.position.y,
  lightMesh1.position.z);

  var lightMesh2 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
    new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
  lightMesh2.position.set( -300, 300, -800 );
  uniforms.pointLightPosition2.value = new THREE.Vector3(lightMesh2.position.x,
  lightMesh2.position.y,
  lightMesh2.position.z);

  var lightMesh3 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
    new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
  lightMesh3.position.set( -300, 300, 800 );
  uniforms.pointLightPosition3.value = new THREE.Vector3(lightMesh3.position.x,
  lightMesh3.position.y,
  lightMesh3.position.z);

  var lightMesh4 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
    new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
  lightMesh4.position.set( 300, 300, -800 );
  uniforms.pointLightPosition4.value = new THREE.Vector3(lightMesh4.position.x,
  lightMesh4.position.y,
  lightMesh4.position.z);

  scene.add(lightMesh1);
  scene.add(lightMesh2);
  scene.add(lightMesh3);
  scene.add(lightMesh4);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  document.body.appendChild( stats.domElement );

  controls = new THREE.OrbitControls( camera, document.getElementById('canvas-container') );

  camera.position.set( 0, 10, 400 );
  uniforms.cspec.value = new THREE.Vector3(cspec.red,cspec.green,cspec.blue);
  uniforms.roughness.value = cspec.roughness>0.0?cspec.roughness:0.01;
  uniforms.clight.value = new THREE.Vector3(
      lightParameters.red * lightParameters.intensity,
      lightParameters.green * lightParameters.intensity,
      lightParameters.blue * lightParameters.intensity);

}

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  controls.update();


  renderer.render(scene, camera);
}

addEventListener('resize', function() {
  location.reload();
});

init();
animate();
}
