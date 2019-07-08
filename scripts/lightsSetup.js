// setup delle luci
var lightMesh1 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
  new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
lightMesh1.position.set( 300, 300, 800 );

var lightMesh2 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
  new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
lightMesh2.position.set( -300, 300, -800 );

var lightMesh3 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
  new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
lightMesh3.position.set( -300, 300, 800 );

var lightMesh4 = new THREE.Mesh( new THREE.SphereGeometry( 25, 16, 16),
  new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
lightMesh4.position.set( 300, 300, -800 );
