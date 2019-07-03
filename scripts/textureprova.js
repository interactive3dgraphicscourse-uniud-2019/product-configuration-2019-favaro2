var scene, meshFrame, renderer;

function showTextureDoor1(){

document.getElementById('canvas-container').innerHTML = "";

var camera, stats, controls, ourMaterial, container, w, h;

// default: white, 1.0 intensity
var lightParameters = {
  red: 1.0,
  green: 1.0,
  blue: 1.0,
  intensity: 1.0,
}

var textureParameters = {
  material: "Wood_StaggeredFloorPlanks",
  repeatS: 1.0,
  repeatT: 1.0,
}

var diffuseMap = loadTexture( "textures/" + textureParameters.material + "_Diffuse.png" );
var specularMap = loadTexture( "textures/" + textureParameters.material + "_Specular.png" );
var roughnessMap = loadTexture( "textures/" + textureParameters.material + "_Roughness.png" );

var uniforms = {
      specularMap: { type: "t", value: specularMap},
      diffuseMap:	{ type: "t", value: diffuseMap},
      roughnessMap:	{ type: "t", value: roughnessMap},
      pointLightPosition1:	{ type: "v3", value: new THREE.Vector3() },
      pointLightPosition2:	{ type: "v3", value: new THREE.Vector3() },
      pointLightPosition3:	{ type: "v3", value: new THREE.Vector3() },
      pointLightPosition4:	{ type: "v3", value: new THREE.Vector3() },
      clight:	{ type: "v3", value: new THREE.Vector3() },
      textureRepeat: { type: "v2", value: new THREE.Vector2(1,1) }
    };

vs = document.getElementById("vertex-texture").textContent;
fs = document.getElementById("fragment-texture").textContent;

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
  camera = new THREE.PerspectiveCamera( 70, w / h, 1, 10000 );
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

      //telaio della porta
      geometryFrame = object.children[0].geometry;
      meshFrame = new THREE.Mesh( geometryFrame, ourMaterial );
      meshFrame.scale.set(200, 200, 200);
      meshFrame.position.y = -200;
      scene.add( meshFrame );

      //porta
      geometryDoor = object.children[1].geometry;
      meshDoor = new THREE.Mesh( geometryDoor, ourMaterial );
      meshDoor.scale.set(200, 200, 200);
      meshDoor.position.y = -200;
      scene.add( meshDoor );

      //scrocco serratura
      geometryLatch = object.children[2].geometry;
      meshLatch = new THREE.Mesh( geometryLatch, getGoldMaterial() );
      meshLatch.scale.set(200, 200, 200);
      meshLatch.position.y = -200;
      scene.add( meshLatch );

      //maniglia
      geometryHandle = object.children[3].geometry;
      meshHandle = new THREE.Mesh( geometryHandle, getGoldMaterial() );
      meshHandle.scale.set(200, 200, 200);
      meshHandle.position.y = -200;
      scene.add( meshHandle );
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

  camera.position.set( 0, 0, 400 );

  uniforms.clight.value = new THREE.Vector3(
      lightParameters.red * lightParameters.intensity,
      lightParameters.green * lightParameters.intensity,
      lightParameters.blue * lightParameters.intensity);
  uniforms.textureRepeat.value = new THREE.Vector2( textureParameters.repeatS, textureParameters.repeatT);
  uniforms.diffuseMap.value = diffuseMap;
  uniforms.specularMap.value = specularMap;
  uniforms.roughnessMap.value = roughnessMap;

}

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  controls.update();


  renderer.render(scene, camera);
}

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load( file , function ( texture ) {

      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.anisotropy = renderer.getMaxAnisotropy();
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.needsUpdate = true;
      //render();
    } )
    return texture;
}

addEventListener('resize', function() {
  location.reload();
});

init();
animate();
}

function hideFrame(){
  scene.remove( meshFrame );
}

function showFrame(){
  scene.add( meshFrame );
}
