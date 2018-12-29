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
    constructor(x,type){
        this.x=x;
        this.type=type; //0 -5
        if(type==5)
            this.pit=true;
        else this.pit=false;
        this.width=obsInfo[this.type].width;
        this.height=obsInfo[this.type].heightRatio*this.width;
        this.src=obsInfo[this.type].src;
    }
    drawObstacle(){
        this.obsObj=document.createElement("div");
       this.obsObj.style.width=this.width+"px";
       this.obsObj.style.height=this.height+"px";
       this.obsObj.style.left=this.x;
       if(!this.pit)
            this.obsObj.style.top=(parseInt(roadTop)-this.height)+"px";
        else this.obsObj.style.top=roadTop;
       this.obsObj.className='obstacle';
       this.obsObj.style.backgroundImage=`url(${this.src})`;
       this.obsObj.style.border='1px solid black';
        container.appendChild(this.obsObj);
    }

}

var obs=new obstacle('0px',0);
obs.drawObstacle();
var obs=new obstacle('300px',1);
obs.drawObstacle();
var obs=new obstacle('600px',2);
obs.drawObstacle();
var obs=new obstacle('900px',3);
obs.drawObstacle();
var obs=new obstacle('1000px',4);
obs.drawObstacle();
var obs=new obstacle('1100px',5);
obs.drawObstacle();

