var metal = "gold";

function getMetalMaterial(){

  // default: white, 1.0 intensity
  var lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0,
  }

  var cspec = getMetal(metal);

  // default: gold
  /*var cspec = {
    red: 1.0,
    green: 0.71,
    blue: 0.29,
    roughness: 0.54
  }*/

  // iron
  /*var cspec = {
    red: 0.56,
    green: 0.57,
    blue: 0.58,
    roughness: 0.54
  }*/

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

  uniforms.pointLightPosition1.value = new THREE.Vector3(lightMesh1.position.x, lightMesh1.position.y, lightMesh1.position.z);
  uniforms.pointLightPosition2.value = new THREE.Vector3(lightMesh2.position.x, lightMesh2.position.y, lightMesh2.position.z);
  uniforms.pointLightPosition3.value = new THREE.Vector3(lightMesh3.position.x, lightMesh3.position.y, lightMesh3.position.z);
  uniforms.pointLightPosition4.value = new THREE.Vector3(lightMesh4.position.x, lightMesh4.position.y, lightMesh4.position.z);

  uniforms.cspec.value = new THREE.Vector3(cspec.red,cspec.green,cspec.blue);
  uniforms.roughness.value = cspec.roughness>0.0?cspec.roughness:0.01;
  uniforms.clight.value = new THREE.Vector3(
      lightParameters.red * lightParameters.intensity,
      lightParameters.green * lightParameters.intensity,
      lightParameters.blue * lightParameters.intensity);

  return new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
}
