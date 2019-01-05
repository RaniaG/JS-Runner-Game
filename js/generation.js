var generatedObjects=[];
function generateScene(){
    //function to generate an entire scene containing obstacles and collectables
    generateCollectables();
    generateObstacles();
    //loop on the generatedObjects and call draw(),animate() for each object in set timeout of its timeOfAppearance variable
}

function clearToAddObject(obj){
    //function to check if the object is clear to be added in its position or if it will intersect another object
    //loop the array of generatedObjects and check if the bounding box of the current object intersects with
    //any of the bounding boxes of any of the generatedObjects
}

function generateObjCoord(obj){
    //1-generate random number t
    //2-generate random number y (top)
    //3-check if no other generated objects is in the same area of the coin -> clearToAddObject(object)
    //4-if false then regenrate new time and new y
    //5-if true then add coin to objects array
}
function generateCoins(){
    //generate number of coins to appear n
    //then loop n iterations
    //each itermation:1- create new coin object with dummy y and timeOfAppearance variables
    //2-call generateObjCoord(obj) to generate the coordinate of created object
    //check conditions apply
}

function generateCollectables(){
    generateCoins();  // no intersection with 
    generateHearts(); // at most one heart at scene and one heart every 10 scenes 
}
function generateObstacles(){
    generateRocks(); //at most one rock at scene
    generateCactus(); // at most one cactus at scene 
    generateTroll(); //at most 2 per scene
}

generateScene()
setInterval(generateScene(),sceneTime);