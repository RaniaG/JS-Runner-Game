














class Generation{
    constructor(){
        this.obstacleGenerationTime = 1000;
        this.coinGenerationTime = 150;
        this.obstacleKind = 1;
        this.generatedObjects = [];
        this.heartTimeInterval=2000*450;
        this.heartTime=Date.now();
    }
    start(){
        setInterval(()=>{
            this.generateObstacle();
        }, this.obstacleGenerationTime);
        setInterval(()=>{
            this.generateCollectable();
        },this.coinGenerationTime);
    }
    generateObstacle() {
        this.obstacleKind = this.randRange(0, 3);
        // console.log("obstacle kind is"+obstacleKind);
        var obj;
        if (this.obstacleKind == 0) {
            obj = null
        }
        if (this.obstacleKind == 1) {
            obj = new Enemy(roadTop);
        }
        if (this.obstacleKind == 2) {
            obj = new Rock(roadTop);
        }
        if (this.obstacleKind == 3) {
            obj = new Cactus(roadTop);
        }
        if(obj!=null)
        {obj.timeOfAppearance=Date.now()+this.obstacleGenerationTime;
        this.generatedObjects.push(obj.timeOfAppearance);
        setTimeout(function(){
            obj.draw();
            obj.animate();
        },this.obstacleGenerationTime);}
    }
    randRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateCollectable(){
        //generate coins and hearts
        //from 100 to 550 px;
        var y=Math.floor((Math.random() * 450) + 100);
        if(Date.now()>=this.heartTime+this.heartTimeInterval)
        {
            this.heartTime=Date.now();
            var c=new Heart(y);
            console.log("draw heart");
        }
        else{
            var goldOrSilver=Math.round(Math.random()); //gold is true
            var c=new Coin(y,goldOrSilver);
        }    
        var i=0;
        var obsTime=null;
        while(i<this.generatedObjects.length&&obsTime==null)
        {
            if(Math.abs(Date.now()-this.generatedObjects[i])<=350)
                obsTime=this.generatedObjects[i];
            i++;
        }
            
        var appearanceTime=Date.now()+this.coinGenerationTime;
        // console.log(`time of appearance of obj ${obj.timeOfAppearance}, coin appearance time ${appearanceTime} `);
        if(obsTime!=null)
        {
            // console.log(`time of appearance of obj ${obj.timeOfAppearance}, coin appearance time ${appearanceTime} `);
            c.timeOfAppearance=appearanceTime;
            c.y=200;
            setTimeout(()=>{
                c.draw();
                c.animate();
            },this.coinGenerationTime);
        }else if (obsTime ==null){
            console.log("coin draw");
            c.timeOfAppearance=appearanceTime;
            setTimeout(()=>{
                c.draw();
                c.animate();
            },this.coinGenerationTime);
        }
    
    
    }
}

var g=new Generation();
g.start();