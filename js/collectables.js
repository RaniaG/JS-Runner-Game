

class MovingObject{
    constructor(y,w,h){
        this.y=y;
        this.div=document.createElement("div");
        this.width=w;
        this.height=h;
        this.timeOut=2; //second
        this.timeOfAppearance;
        this.container=document.querySelector(".bg");
    }
    animate(){
        setTimeout((obj)=>{
            obj.destroy();
        },parseInt(this.timeOut)*1000,this);
        // console.log("animation");
    } 
    draw(){
        // console.log("draw");
    }  
    destroy(){
        if(this!=null&&this.container.contains(this.div))
       { 
           this.container.removeChild(this.div);
            // this=null;
        }
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
        this.container.appendChild(this.div);
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
        this.container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName=' move-horizontal';
        super.animate();
    }
}