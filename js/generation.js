

var sceneCounter = 0;


function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var time = 1000;
var obstacleKind = 1;
var generatedObjects = [];


function generateCollectable() {
    //generate coins and hearts 

}

//function to generate type of obstacle to be generated 
//a random number matches type of object (rock or enemy or cactus)
//verify conditions to ensure no consecutive obstacles are drawn
//at most one rock at scene
// at most one cactus at scene 
//at most 2 enemies per scene
function generateObstacle() {
    time = randRange(1000, 10000);
    obstacleKind = randRange(1, 3);
    generatedObjects.push(obstacleKind);

    if (obstacleKind == 1) {
        var e2 = new Enemy(roadTop);
        e2.draw();
        e2.animate();
    }
    if (obstacleKind == 2) {
        var r = new Rock(roadTop);
        r.draw();
        r.animate();
    }
    if (obstacleKind == 3) {
        var ca = new Cactus(roadTop);
        ca.draw();
        ca.animate();
    }
    generateCollectable();
}


setInterval(generateObstacle, time);
