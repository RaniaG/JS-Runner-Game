var enemSrc=[''];
var container=document.getElementsByTagName("body")[0];
class enemies {
    constructor(){
        this.src='images/trolls.png';
        this.width=200;
        this.aspectRatio=0.73;
        this.height=this.aspectRatio*this.width;
        this.draw();
        this.animate();
    }
    draw(){
        this.div=document.createElement("div");
        this.div.className='troll';
        this.div.style.width=this.width+'px';
        this.div.style.height=(this.height)+"px";
        this.div.style.backgroundImage=`url(${this.src})`;
        this.div.style.backgroundPosition= `0 0`;
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName='move-horizontal, troll-walk';
        setTimeout(destroy,parseInt(velocity)*1000,this);
    }
}

var e=new enemies();