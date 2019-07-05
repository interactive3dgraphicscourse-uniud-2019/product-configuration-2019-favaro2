function getMetal(metal){
  if (metal == "gold"){
    return {red: 1.0, green: 0.71, blue: 0.29, roughness: 0.54};
  } else if (metal == "alluminium"){
    return {red: 0.91, green: 0.92, blue: 0.92, roughness: 0.74};
  }
}

function getTexture(texture){
  if (texture == "mahogany"){
    return "Mahogany";
  } else if (texture == "walnut"){
    return "Wood29";
  } else if (texture == "pine"){
    return "Wood_011";
  } else if (texture == "bamboo"){
    return "bamboo";
  } else if (texture == "plastic"){
    return "Plastic";
  }
}
