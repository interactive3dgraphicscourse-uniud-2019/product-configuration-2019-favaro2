var texture = "walnut";

// generazione di materiali da texture
function getTextureMaterial(){

  // default: white, 1.0 intensity
  var lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0,
  }

  var textureParameters = {
    material: getTexture(texture),
    repeatS: 1.0,
    repeatT: 1.0,
  }

  var diffuseMap = loadTexture( "textures/" + textureParameters.material + "_col.jpg" );
  var specularMap = loadTexture( "textures/" + textureParameters.material + "_spc.jpg" );
  var roughnessMap = loadTexture( "textures/" + textureParameters.material + "_rgh.jpg" );

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

  uniforms.pointLightPosition1.value = new THREE.Vector3(lightMesh1.position.x, lightMesh1.position.y, lightMesh1.position.z);
  uniforms.pointLightPosition2.value = new THREE.Vector3(lightMesh2.position.x, lightMesh2.position.y, lightMesh2.position.z);
  uniforms.pointLightPosition3.value = new THREE.Vector3(lightMesh3.position.x, lightMesh3.position.y, lightMesh3.position.z);
  uniforms.pointLightPosition4.value = new THREE.Vector3(lightMesh4.position.x, lightMesh4.position.y, lightMesh4.position.z);


  return new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });

}


function loadTexture(file) {
  var texture = new THREE.TextureLoader().load( file , function ( texture ) {

    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.anisotropy = renderer.getMaxAnisotropy();
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.needsUpdate = true;
  } )
  return texture;
}
