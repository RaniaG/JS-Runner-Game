container = document.querySelector(".notathing");


hero.animateInterval=50;


var e2 = new Enemy(roadTop);
e2.draw();
e2.animate();




// var interval = window.setInterval(() => {
//     // debugger;
//     var heroboundingrect = hero.heroCharacter.getBoundingClientRect();
//     var enemyboundingrect = e2.div.getBoundingClientRect();
//     console.log(heroboundingrect.right, enemyboundingrect.left)
//     console.log(heroboundingrect.top, enemyboundingrect.bottom)
//     console.log(heroboundingrect.bottom, enemyboundingrect.top)
//     console.log("------------------------");

//     var checkOverlap ;
//     var reason;
//     // = !(heroboundingrect.right < enemyboundingrect.left + 110 ||
//     //     heroboundingrect.left > enemyboundingrect.right ||
//     //     (heroboundingrect.bottom < enemyboundingrect.top && heroboundingrect.bottom > enemyboundingrect.bottom));

//     if(hero.isJumping){
//         checkOverlap = !((heroboundingrect.right < enemyboundingrect.left + 110 || heroboundingrect.left > enemyboundingrect.right+60 ) ||
//             (heroboundingrect.top > enemyboundingrect.top &&
//             heroboundingrect.bottom > enemyboundingrect.bottom )
//             )
//             reason = "died while jumping";

//     }
//     else{
//         checkOverlap = !(heroboundingrect.right < enemyboundingrect.left + 110)
//         reason = "not JUmping";
//     }

//     if (checkOverlap) {
//         console.log("overlapped " + reason);
//         destroy(e2);
//         hero.dead();
//         hero.lives = 0;
//         window.clearInterval(interval);

//     }
// }, 50);

interval = window.setInterval(() => {
    // debugger;
    var heroboundingrect = hero.heroCharacter.getBoundingClientRect();
    var enemyboundingrect = e2.div.getBoundingClientRect();
    var overlapped = false;
    var reason;
    
    if ((heroboundingrect.right > enemyboundingrect.left + 110)&& heroboundingrect.left+50 < enemyboundingrect.left ) {
        if (hero.isJumping) {
            if ((heroboundingrect.bottom > enemyboundingrect.bottom && heroboundingrect.bottom <= enemyboundingrect.top)) {
                console.log(heroboundingrect.bottom, enemyboundingrect.top);
                overlapped = true;
                reason = "jumping"
            }
            else {
                overlapped = false;
            }
        }
        else {
            overlapped = true;
            reason = "not jumping"
        }
    }

    if (overlapped) {
        console.log("overlapped " + reason);
        destroy(e2);
        hero.dead();
        hero.lives = 0;
        window.clearInterval(interval);

    }
}, 50);





// Explain: if one or more expressions in the parenthese are true, there's no overlapping. If all are false, there must be an overlapping.