function getMetal(metal){
  if (metal == "gold"){
    return {red: 1.0, green: 0.71, blue: 0.29, roughness: 0.54};
  } else if (metal == "iron"){
    return {red: 0.56, green: 0.57, blue: 0.58, roughness: 0.54};
  }
}

function getTexture(texture){
  if (texture == "mahogany"){
    return "Mahogany";
  } else if (texture == "wood29"){
    return "Wood29";
  }
}
