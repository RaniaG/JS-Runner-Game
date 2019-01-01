var stars = document.querySelector(".bg__starts");
var clouds = document.querySelector(".bg__clouds");
var mountaines = document.querySelector(".bg__mountaines");
var ground = document.querySelector(".bg__ground");


/*----------------------------------------BGclass-------------------------------------------------------*/


class Background {
    constructor(layer, time, bgpos, distance) {
        this.layer = layer;
        this.time = time;
        this.bgpos = bgpos;
        this.distance = distance;
    }
    slideBackground() {
        this.bgpos -= this.distance; 
        this.layer.style.backgroundPosition = this.bgpos + 'px 0';
    }


}
let star = new Background(stars, 7, 1366,2);
setInterval(() => star.slideBackground(), 7);
let cloud = new Background(clouds, 5, 1366,2);
setInterval(() => cloud.slideBackground(), 5,2);
let mountain = new Background(mountaines, 3, 1366,2);
setInterval(() => mountain.slideBackground(), 5,2);
let groundl = new Background(ground, 1, 1366,5);
setInterval(() => groundl.slideBackground(), 5,2);



/*----------------------------------------EndOFBGclass-------------------------------------------------------*/











