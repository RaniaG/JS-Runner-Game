var layer1 = document.querySelector(".bg__layer1");
var layer2 = document.querySelector(".bg__layer2");
var layer3 = document.querySelector(".bg__layer3");
// var layer4 = document.querySelector(".bg__layer4");
var layer5 = document.querySelector(".bg__layer5");


function BackGround(layer, sec, bgpos) {
    function slide() {
        bgpos -= 2;
        layer.style.backgroundPosition = bgpos + 'px 0';
    }
    setInterval(slide, sec);
}


function run() {
    BackGround(layer1, 7, 1366);
    BackGround(layer2, 5, 1366);
    BackGround(layer3, 3, 1366);
    // move(layer4, 1, 1366);
    BackGround(layer5, 1, 1366);
}
run();






/*----------------------------------------class-------------------------------------------------------*/


// class Background {
//     constructor(layer, sec, bgpos) {
//         this.layer = layer;
//         this.sec = sec;
//         this.bgpos = bgpos;
//     }
//     slideBackground() {
//         this.bgpos -= 2;

//         this.layer.style.BackgroundPosition = this.bgpos + 'px 0';
//     }


// }



// let l1 = new Background(layer1, 7, 1366);
// setInterval(() => l1.slideBackground, 7);


// class Background {
//     constructor(layer, sec, bgpos) {
//         this.layer = layer;
//         this.sec = sec;
//         this.bgpos = bgpos;
//     }
//     move() {
//         var self = this;
//         self.start = function () {
//             self.interval = setInterval(function () { self.slideBackground(); }, 7);
//         };
//         self.slideBackground = function () {
//             this.bgpos -= 2;
//             this.layer.style.BackgroundPosition = 1366 + 'px 0';
//         }
//     }
// }

// l1.start();
//  l1.self.slideBackground();
// setInterval(() => l1.slideBackground, 7);
// setInterval(function() {l1.slideBackground; }, 7);












