var container=document.getElementsByTagName("body")[0];
var velocity='10s';
var rotationSpeed='1s';


class coin{
    constructor(y,goldOrSilver){
        this.y=y;
        this.goldColor="#EDBD31";
        this.silverColor="#C5CECE";
        this.goldOrSilver=goldOrSilver; //gold is true, silver is false
        this.draw();
        this.animate();
    }
    draw(){
        this.div=document.createElement("div");
        if(this.goldOrSilver)
        this.div.className="coin coin--gold";
        else
        this.div.className="coin coin--silver";
        
        this.div.style.top=this.y;
        this.div.style.left='100%';
        var frontFace=document.createElement("div");
        frontFace.className="coin__face coin__face--front";
        var backFace=document.createElement("div");
        backFace.className="coin__face coin__face--back";
        var middleFace=document.createElement("div");
        middleFace.className="coin__middle";
        this.div.appendChild(frontFace);
        this.div.appendChild(middleFace);
        this.div.appendChild(backFace);
        container.appendChild(this.div);
        this.drawMiddlePart(middleFace);

    }
    drawMiddlePart(middleFace){
        var div;
        for(var i=0.05;i<10;i+=0.05)
        {
            div=document.createElement("div");
            if(this.goldOrSilver)
                div.style.backgroundColor="#EDBD31";
            else
                div.style.backgroundColor="#C5CECE";
            div.className="coin__face";
            div.style.transform=`translateZ(-${i}px)`
            middleFace.appendChild(div);
        }
    }
    animate(){
        this.div.style.animationName='rotate-coin-3d, move-horizontal';
        setTimeout(destroy,parseInt(velocity)*1000,this);
    }

}
/*------------------------------------------------------------------------------------------------------ */

class heart{
    constructor(y){
        this.y=y;
        this.drawHeart();
        this.animate();
    }
    drawHeart(){
        this.div=document.createElement("heart");
        this.div.style.top=this.y;
        this.div.className="heart";
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName=' move-horizontal';
        setTimeout(destroy,parseInt(velocity)*1000,this);
    }
}


function pauseAnimation(obj){
    obj.style.animationPlayState='paused';
}
function replayAnimation(obj){
    obj.style.animationPlayState='running';
}
function destroy(obj){
    console.log(obj);
    if(obj!=null&&container.contains(obj.div))
       { 
           container.removeChild(obj.div);
            obj=null;
        }
}

var c;
setTimeout(function(){
    c=new coin("100px",true);
    setTimeout(function(){
        destroy(c);
    },3000);
},1000);

setTimeout(function(){
    var c2=new coin("500px",false);
},1000);

setTimeout(function(){
    var h=new heart("200px");
},500);

