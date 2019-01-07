var container=document.querySelector(".bg");
var roadTop='550px';


function destroy(obj){
    // console.log(obj);
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
/**************************************** MOVING OBJECT CLASS ********************************************************************* */
class MovingObject{
    constructor(y,w,h){
        this.y=y;
        this.div=document.createElement("div");
        this.width=w;
        this.height=h;
        this.timeOut=2; //second
        this.timeOfAppearance;
    }
    animate(){
        setTimeout(destroy,parseInt(this.timeOut)*1000,this);
        // console.log("animation");
    } 
    draw(){
        // console.log("draw");
    }  
}
/*********************************************************************************************************************************** */


