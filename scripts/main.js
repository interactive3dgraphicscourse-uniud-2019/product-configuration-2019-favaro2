var scene, renderer, meshFrame, meshDoor, meshLatch, meshHandle, doorMaterial, lockMaterial;

function mainFunction(){

  var camera, stats, controls, ourMaterial, container, w, h;


  function init() {

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});

    // get container to contain three.js canvas.
    container = document.getElementById('canvas-container');
    w = container.offsetWidth;
    h = container.offsetHeight;
    renderer.setSize(w, h);
    renderer.setClearColor( 0xf0f0f0 );
    container.appendChild(renderer.domElement);

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, w / h, 1, 10000);
    camera.position.z = 10;

    // Create scene.
    scene = new THREE.Scene();

    doorMaterial = getTextureMaterial();
    lockMaterial = getMetalMaterial();

    // instantiate a loader
    var loader = new THREE.OBJLoader();
    // load a resource
    loader.load(
      // resource URL
      'model/Door_Component_BI3.obj',
      // Function when resource is loaded
      function ( object ) {

        //telaio della porta
        geometryFrame = object.children[0].geometry;
        meshFrame = new THREE.Mesh( geometryFrame, doorMaterial );
        meshFrame.scale.set(200, 200, 200);
        meshFrame.position.y = -200;
        scene.add( meshFrame );

        //porta
        geometryDoor = object.children[1].geometry;
        meshDoor = new THREE.Mesh( geometryDoor, doorMaterial );
        meshDoor.scale.set(200, 200, 200);
        meshDoor.position.y = -200;
        scene.add( meshDoor );

        //scrocco serratura
        geometryLatch = object.children[2].geometry;
        meshLatch = new THREE.Mesh( geometryLatch, lockMaterial );
        meshLatch.scale.set(200, 200, 200);
        meshLatch.position.y = -200;
        scene.add( meshLatch );

        //maniglia
        geometryHandle = object.children[3].geometry;
        meshHandle = new THREE.Mesh( geometryHandle, lockMaterial );
        meshHandle.scale.set(200, 200, 200);
        meshHandle.position.y = -200;
        scene.add( meshHandle );
      }
    );

    stats = new Stats();
    //stats.domElement.style.position = 'absolute';
    //stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    controls = new THREE.OrbitControls( camera, document.getElementById('canvas-container') );

    camera.position.set( 0, 10, 450 );

    //show lights setup
    scene.add(lightMesh1);
    scene.add(lightMesh2);
    scene.add(lightMesh3);
    scene.add(lightMesh4);


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

function changeDoorMaterial(m){
  if (m == "mahogany") {
    doorPrice = 250;
    texture = "mahogany";
    meshFrame.material = getTextureMaterial();
    meshDoor.material = getTextureMaterial();
  } else if (m == "gold") {
    doorPrice = 10200;
    metal = "gold";
    meshFrame.material = getMetalMaterial();
    meshDoor.material = getMetalMaterial();
  } else if (m == "iron") {
    doorPrice = 120;
    metal = "iron";
    meshFrame.material = getMetalMaterial();
    meshDoor.material = getMetalMaterial();
  } else if (m == "wood29") {
    doorPrice = 200;
    texture = "wood29";
    meshFrame.material = getTextureMaterial();
    meshDoor.material = getTextureMaterial();
  }
  calcPrice()
}

function changeHandleMaterial(m){
  if (m == "gold") {
    handlePrice = 230;
    metal = "gold";
    meshHandle.material = getMetalMaterial();
    meshLatch.material = getMetalMaterial();
  } else if (m == "iron") {
    handlePrice = 20;
    metal = "iron";
    meshHandle.material = getMetalMaterial();
    meshLatch.material = getMetalMaterial();
  }
  calcPrice()
}


function hideFrame(){
  scene.remove( meshFrame );
}

function showFrame(){
  scene.add( meshFrame );
}
