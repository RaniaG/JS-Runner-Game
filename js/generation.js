
class Generation {
    constructor() {
        this.obstacleGenerationTime = [500, 3000];
        this.coinGenerationTime = 150;
        this.obstacleKind = 1;
        this.generatedObjects = [];
        this.heartTimeInterval = 2000 * 10;
        this.heartTime = Date.now();
        this.level=0;
    }
    start() {
        setInterval(() => {
            this.generateCollectable();
        }, this.coinGenerationTime);
        this.generateObstacle(this);
    }
    generateObstacle(g) {
        g.obstacleKind = g.randRange(0, 3);
        var obstacleGenerationTime = g.randRange(g.obstacleGenerationTime[0], g.obstacleGenerationTime[1]);
        // console.log("obstacle kind is"+obstacleKind);
        var obj;
        if (g.obstacleKind == 0) {
            obj = null
        }
        if (g.obstacleKind == 1) {
            obj = new Enemy(roadTop);
        }
        if (g.obstacleKind == 2) {
            obj = new Rock(roadTop);
        }
        if (g.obstacleKind == 3) {
            obj = new Cactus(roadTop);
        }
        if (obj != null) {
            obj.timeOfAppearance = Date.now() + obstacleGenerationTime;
            g.generatedObjects.push(obj.timeOfAppearance);
            setTimeout(function () {
                obj.draw();
                obj.animate();
                g.generateObstacle(g);
            }, obstacleGenerationTime);
        } else {
            setTimeout(function () {
                g.generateObstacle(g);
            }, obstacleGenerationTime);
        }
    }
    randRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateCollectable() {

        var y = Math.floor((Math.random() * 450) + 100);
        if (Date.now() >= this.heartTime + this.heartTimeInterval) {
            this.heartTime = Date.now();
            var c = new Heart(y);
        }
        else {
            var goldOrSilver = Math.round(Math.random()); //gold is true
            var c = new Coin(y, goldOrSilver);
        }
        var i = 0;
        var obsTime = null;
        while (i < this.generatedObjects.length && obsTime == null) {
            if (Math.abs(Date.now() - this.generatedObjects[i]) <= 350)
                obsTime = this.generatedObjects[i];
            else if (Date.now() - this.generatedObjects[0] > 350)
                this.generatedObjects.shift();
            i++;
        }

        var appearanceTime = Date.now() + this.coinGenerationTime;
        if (obsTime != null) {
            c.timeOfAppearance = appearanceTime;
            c.y = 200;
            setTimeout(() => {
                c.draw();
                c.animate();
            }, this.coinGenerationTime);
        } else if (obsTime == null) {
            c.timeOfAppearance = appearanceTime;
            setTimeout(() => {
                c.draw();
                c.animate();
            }, this.coinGenerationTime);
        }
    }
    increaseLevel(){
        if(this.obstacleGenerationTime[1]>500)
           { 
               this.obstacleGenerationTime[1]-=250;
               this.level++;
            }
    }
}


