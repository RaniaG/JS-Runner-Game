var container=document.getElementsByTagName("body")[0];
class coin{
    constructor(x,y,goldOrSilver){
        this.x=x;
        this.y=y;
        this.goldColor="#EDBD31";
        this.silverColor="#C5CECE";
        this.goldOrSilver=goldOrSilver; //gold is true, silver is false
        
    }
    drawCoin(){
        this.coin=document.createElement("div");
        if(this.goldOrSilver)
        this.coin.className="coin coin--gold";
        else
        this.coin.className="coin coin--silver";
        
        this.coin.style.top=this.y;
        this.coin.style.left=this.x;
        var frontFace=document.createElement("div");
        frontFace.className="coin__face coin__face--front";
        var backFace=document.createElement("div");
        backFace.className="coin__face coin__face--back";
        var middleFace=document.createElement("div");
        middleFace.className="coin__middle";
        this.coin.appendChild(frontFace);
        this.coin.appendChild(middleFace);
        this.coin.appendChild(backFace);
        container.appendChild(this.coin);
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
    playAnimation(){
        this.coin.style.animation=" rotate-coin-3d 5s linear infinite";
    }
}
/*------------------------------------------------------------------------------------------------------ */

class heart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    drawHeart(){
        this.heart=document.createElement("heart");
        this.heart.style.top=this.y;
        this.heart.style.left=this.x;
        this.heart.className="heart";
        container.appendChild(this.heart);
    }
}

var c=new coin("100px","100px",true);
c.drawCoin();
c.playAnimation();


var c2=new coin("200px","100px",false);
c2.drawCoin();
c2.playAnimation();

var h=new heart("500px","500px");
h.drawHeart();