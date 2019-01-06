var container=document.querySelector(".bg");
var roadTop='550px';

function destroy(obj){
    console.log(obj);
    if(obj!=null&&container.contains(obj.div))
       { 
           container.removeChild(obj.div);
            obj=null;
    }
}

function pauseAnimation(obj){
    obj.style.animationPlayState='paused';
}
function replayAnimation(obj){
    obj.style.animationPlayState='running';
}

/*******************************************    PARENT CLASS  ***************************************************************************** */
class MovingObject{
    constructor(y,w,h){
        this.y=y;
        this.div=document.createElement("div");
        this.width=w;
        this.height=h;
        this.timeOut=3.415; //second
        this.timeOfAppearance;
    }
    animate(){
        setTimeout(destroy,parseInt(this.timeOut)*1000,this);
        console.log("animation");
    } 
    draw(){
        console.log("draw");
    }  
}

/*******************************************    OBSTACLES CLASSes  ***************************************************************************** */

class Obstacle extends MovingObject{
    constructor(y,w,h){
        super(y,w,h)
        this.className='obstacle';
    }
    draw(){
        this.div.style.top=(parseInt(roadTop)-(this.height))+"px";
        console.log(this.className);
        this.div.className=this.className; 
    }
}

class Rock extends Obstacle{
    constructor(y){
        super(y,200,0.6177*200);
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
    constructor(y){
        super(y,150,0.8031*150);
        this.className+=' obstacle--cactus--1';
        // this.draw();
        // this.animate();
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
    constructor(y){
        super(y,300,0.73*300);
        this.className+=' obstacle--enemy';
        // this.draw();
        // this.animate();
    }
    draw(){
        super.draw();
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName='move-horizontal, troll-walk';
        // this.div.style.backgroundPositionX='-300px';
        super.animate();
    }
}


/*******************************************    COLLECTABLES CLASSes  ***************************************************************************** */

class Collectable extends MovingObject{
    constructor(y){
        super(y,100,100)
        this.className='collectable';
    }
}


class Coin extends Collectable{
    constructor(y,goldOrSilver){
        super(y);
        this.goldColor="#EDBD31";
        this.silverColor="#C5CECE";
        this.goldOrSilver=goldOrSilver; //gold is true, silver is false
        // this.draw();
        // this.animate();
    }
    draw(){
        if(this.goldOrSilver)
        this.div.className+=" collectable--coin collectable--coin--gold";
        else
        this.div.className+=" collectable--coin collectable--coin--silver";
        this.div.style.top=(parseInt(this.y)-this.height)+"px";
        this.div.style.left='100%';
        var frontFace=document.createElement("div");
        frontFace.className="collectable--coin__face collectable--coin__face--front";
        var backFace=document.createElement("div");
        backFace.className="collectable--coin__face collectable--coin__face--back";
        var middleFace=document.createElement("div");
        middleFace.className="collectable--coin__middle";
        this.div.appendChild(frontFace);
        this.div.appendChild(middleFace);
        this.div.appendChild(backFace);
        container.appendChild(this.div);
        // this.drawMiddlePart(middleFace);

    }
    drawMiddlePart(middleFace){
        var div;
        for(var i=0.05;i<10;i+=0.05)
        {
            div=document.createElement("div");
            if(this.goldOrSilver)
                div.style.backgroundColor=this.goldColor;
            else
                div.style.backgroundColor=this.silverColor;
            div.className="collectable--coin__face";
            div.style.transform=`translateZ(-${i}px)`
            middleFace.appendChild(div);
        }
    }
    animate(){
        this.div.style.animationName='rotate-coin-3d, move-horizontal';
        super.animate();
    }

}


class Heart extends Collectable{
    constructor(y){
        super(y);
        // this.draw();
        // this.animate();
    }
    draw(){
        this.div.style.top=(parseInt(this.y)-(this.height))+"px";
        this.div.className+="collectable--heart";
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName=' move-horizontal';
        super.animate();
    }
}
var e=new Enemy(roadTop);
// var e2=new Enemy(roadTop);

var ca=new Cactus(roadTop);
// var r=new Rock(roadTop);
// var r2=new Rock(roadTop);

var c=new Coin(roadTop,true);
var c2=new Coin(roadTop,false);
var h=new Heart(roadTop);

// setTimeout(function(){
//     r.draw();
//     r.animate();
// },1000);
// setTimeout(function(){
//     r2.draw();
//     r2.animate();
// },1700);

// setTimeout(function(){
//     e2.draw();
//     e2.animate();
// },6000);

// setTimeout(function(){
//     c.draw();
//     c.animate();
// },4000);
// setTimeout(function(){
//     c2.draw();
//     c2.animate();
// },5000);
// setTimeout(function(){
//     h.draw();
//     h.animate();
// },7000);
