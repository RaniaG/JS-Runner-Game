var container=document.getElementsByTagName("body")[0];
var roadTop="300px";

var obsInfo=[
    {
        src:'images/rocks1.png',
        width:300,
        heightRatio:0.277
    },
    {
        src:'images/rocks2.png',
        width:300,
        heightRatio:0.351
    },
    {
        src:'images/rocks3.png',
        width:300,
        heightRatio:0.3687
    },
    {
        src:'images/cactus1.png',
        width:100,
        heightRatio:0.8031
    },
    {
        src:'images/cactus2.png',
        width:100,
        heightRatio:1.054
    },{
        src:'images/pit.png',
        width:300,
        heightRatio:0.7069
    }

]
class obstacle{
    constructor(type){
        this.type=type; //0 -5
        if(type==5)
            this.pit=true;
        else this.pit=false;
        this.width=obsInfo[this.type].width;
        this.height=obsInfo[this.type].heightRatio*this.width;
        this.src=obsInfo[this.type].src;
        this.draw();
        this.animate();
    }
    draw(){
        this.div=document.createElement("div");
       this.div.style.width=this.width+"px";
       this.div.style.height=this.height+"px";
       if(!this.pit)
            this.div.style.top=(parseInt(roadTop)-this.height)+"px";
        else this.div.style.top=roadTop;
       this.div.className='obstacle';
       this.div.style.backgroundImage=`url(${this.src})`;
       this.div.style.border='1px solid black';
        container.appendChild(this.div);
    }
    animate(){
        this.div.style.animationName=' move-horizontal';
        setTimeout(destroy,parseInt(velocity)*1000,this);
    }
}

var obs=new obstacle(0);

// var obs=new obstacle(1);
// obs.drawObstacle();
// var obs=new obstacle(2);
// obs.drawObstacle();
// var obs=new obstacle(3);
// obs.drawObstacle();
// var obs=new obstacle(4);
// obs.drawObstacle();
// var obs=new obstacle(5);
// obs.drawObstacle();

