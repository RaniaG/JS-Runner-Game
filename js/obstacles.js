
/*******************************************    OBSTACLES CLASSes  ***************************************************************************** */

class Obstacle extends MovingObject{
    constructor(w,h){
        super(roadTop,w,h)
        this.className='obstacle';
    }
    draw(){
        this.div.style.top=(parseInt(this.y)-(this.height))+"px";
        // console.log(this.className);
        this.div.className=this.className; 
    }
}

class Rock extends Obstacle{
    constructor(){
        super(200,0.6177*200);
        this.className+=' obstacle--rock--5';
        // this.draw();
        // this.animate();
    }
    draw(){
        super.draw();
        this.div.style.top=(parseInt(roadTop)-(this.height))+"px";
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName=' move-horizontal';
        super.animate();
    }
}

class Cactus extends Obstacle{
    constructor(){
        super(150,0.8031*150);
        this.className+=' obstacle--cactus--1';
    }
    draw(){
        super.draw();
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName=' move-horizontal';
        super.animate();
    }
}
class Enemy extends Obstacle{
    constructor(){
        super(300,0.73*300);
        this.className+=' obstacle--enemy';
        // this.draw();
        // this.animate();
        this.sound=new Sound(4);        
    }
    draw(){
        super.draw();
        this.sound.play();
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName='move-horizontal, troll-walk';
        // this.div.style.backgroundPositionX='-300px';
        super.animate();
    }
}

