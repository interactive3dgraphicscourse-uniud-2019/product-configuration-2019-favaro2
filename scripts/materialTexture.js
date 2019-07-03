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

uniforms.clight.value = new THREE.Vector3(
    lightParameters.red * lightParameters.intensity,
    lightParameters.green * lightParameters.intensity,
    lightParameters.blue * lightParameters.intensity);
uniforms.textureRepeat.value = new THREE.Vector2( textureParameters.repeatS, textureParameters.repeatT);
uniforms.diffuseMap.value = diffuseMap;
uniforms.specularMap.value = specularMap;
uniforms.roughnessMap.value = roughnessMap;

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

//renderer = getRenderer();

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load( file , function ( texture ) {

      texture.minFilter = THREE.LinearMipMapLinearFilter;
      //texture.anisotropy = renderer.getMaxAnisotropy();
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set( 0, 0 );
      texture.needsUpdate = true;
      //render();
    } )
    return texture;
}

function getTextureMaterial(){
  return new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
}
