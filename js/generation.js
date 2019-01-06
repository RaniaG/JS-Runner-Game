

var sceneCounter=0;

var generatedObjects=[];


function generateCollectable(){
    //generate coins and hearts
}


function generateObstacle(){
    //function to generate type of obstacle to be generated 
    //a random number matches type of object (rock or enemy or cactus)
    //verify conditions to ensure no consecutive obstacles are drawn
    //at most one rock at scene
    // at most one cactus at scene 
    //at most 2 enemies per scene

    generateCollectable();
}

setInterval(generateObstacle,350);
