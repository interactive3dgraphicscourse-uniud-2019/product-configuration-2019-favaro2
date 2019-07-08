var scene, renderer, meshFrame, meshDoor, meshLatch, meshHandle, doorMaterial, lockMaterial;

// funzione iniziale per il caricamento dell'oggetto
function mainFunction(){

  var camera, controls, container, w, h;
  //var stats;


  function init() {

    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});

    // contenitore della scena nella pagina
    container = document.getElementById('canvas-container');
    w = container.offsetWidth;
    h = container.offsetHeight;

    renderer.setSize(w, h);
    renderer.setClearColor( 0xf0f0f0 );
    container.appendChild(renderer.domElement);

    // creazione camera
    camera = new THREE.PerspectiveCamera(70, w / h, 1, 10000);

    // creazione scena
    scene = new THREE.Scene();

    doorMaterial = getTextureMaterial();
    lockMaterial = getMetalMaterial();

    // istanziazione loader
    var loader = new THREE.OBJLoader();
    // carica il modello
    loader.load(
      // URL modello
      'model/Door_Component_BI3.obj',
      // funzione attivata al caricamento del modello
      function ( object ) {

        //telaio della porta
        geometryFrame = object.children[0].geometry;
        meshFrame = new THREE.Mesh( geometryFrame, doorMaterial );
        meshFrame.scale.set(200, 200, 200);
        meshFrame.position.y = -200;
        meshFrame.rotation.y = 180 * Math.PI/180;
        scene.add( meshFrame );

        //porta
        geometryDoor = object.children[1].geometry;
        meshDoor = new THREE.Mesh( geometryDoor, doorMaterial );
        meshDoor.scale.set(200, 200, 200);
        meshDoor.position.y = -200;
        meshDoor.rotation.y = 180 * Math.PI/180;
        scene.add( meshDoor );

        //scrocco serratura
        geometryLatch = object.children[2].geometry;
        meshLatch = new THREE.Mesh( geometryLatch, lockMaterial );
        meshLatch.scale.set(200, 200, 200);
        meshLatch.position.y = -200;
        meshLatch.rotation.y = 180 * Math.PI/180;
        scene.add( meshLatch );

        //maniglia
        geometryHandle = object.children[3].geometry;
        meshHandle = new THREE.Mesh( geometryHandle, lockMaterial );
        meshHandle.scale.set(200, 200, 200);
        meshHandle.position.y = -200;
        meshHandle.rotation.y = 180 * Math.PI/180;
        scene.add( meshHandle );
      }
    );

    //show stats
    //stats = new Stats();
    //document.body.appendChild( stats.domElement );

    controls = new THREE.OrbitControls( camera, document.getElementById('canvas-container') );
    controls.maxPolarAngle = 110 * Math.PI/180;
    controls.minDistance = 235;
    controls.maxDistance = 1000;

    camera.position.set( 0, 10, 600 );

    //mostra mesh delle luci
    /*scene.add(lightMesh1);
    scene.add(lightMesh2);
    scene.add(lightMesh3);
    scene.add(lightMesh4);*/
  }

  function animate() {
    requestAnimationFrame(animate);
    //stats.update();
    controls.update();
    renderer.render(scene, camera);
  }

  // ridimensiona canvas in base alla grandezza della pagina
  addEventListener('resize', function() {
    // solo su schermi grandi (su smartphone creava problemi)
    if (screen.width > 600) {
      location.reload();
    }
  });

  init();
  animate();
}

// funzione per gestire il cambio materiali di porta e telaio
function changeDoorMaterial(m){
  if (m == "mahogany") {
    doorPrice = 129.99;
    texture = "mahogany";
    meshFrame.material = getTextureMaterial();
    meshDoor.material = getTextureMaterial();
  } else if (m == "gold") {
    doorPrice = 109.99;
    metal = "gold";
    meshFrame.material = getMetalMaterial();
    meshDoor.material = getMetalMaterial();
  } else if (m == "zinc") {
    doorPrice = 99.99;
    metal = "zinc";
    meshFrame.material = getMetalMaterial();
    meshDoor.material = getMetalMaterial();
  } else if (m == "walnut") {
    doorPrice = 199.99;
    texture = "walnut";
    meshFrame.material = getTextureMaterial();
    meshDoor.material = getTextureMaterial();
  } else if (m == "pine") {
    doorPrice = 119.99;
    texture = "pine";
    meshFrame.material = getTextureMaterial();
    meshDoor.material = getTextureMaterial();
  } else if (m == "bamboo") {
    doorPrice = 219.99;
    texture = "bamboo";
    meshFrame.material = getTextureMaterial();
    meshDoor.material = getTextureMaterial();
  }
  calcPrice()
}

// funzione per gestire il cambio materiali di maniglia e scrocco
function changeHandleMaterial(m){
  if (m == "gold") {
    handlePrice = 35.99;
    metal = "gold";
    meshHandle.material = getMetalMaterial();
    meshLatch.material = getMetalMaterial();
  } else if (m == "zinc") {
    handlePrice = 29.99;
    metal = "zinc";
    meshHandle.material = getMetalMaterial();
    meshLatch.material = getMetalMaterial();
  } else if (m == "plastic") {
    handlePrice = 9.99;
    texture = "plastic";
    meshHandle.material = getTextureMaterial();
    metal = "zinc";
    meshLatch.material = getMetalMaterial();
  }
  calcPrice()
}

// funzioni per nascondere/mostrare il telaio

function hideFrame(){
  scene.remove( meshFrame );
}

function showFrame(){
  scene.add( meshFrame );
}
