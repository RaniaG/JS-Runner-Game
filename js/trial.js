container = document.querySelector(".notathing");


// hero.animateInterval=30;


var e2 = new Enemy(roadTop);
e2.draw();
e2.animate();

interval = window.setInterval(() => {
    // debugger;
    var heroboundingrect = hero.heroCharacter.getBoundingClientRect();
    var enemyboundingrect = e2.div.getBoundingClientRect();
    var overlappedHorizontal = (
        (heroboundingrect.right == enemyboundingrect.left + 110 && heroboundingrect.left < enemyboundingrect.left) ||
        (heroboundingrect.right >= enemyboundingrect.left + 110 && heroboundingrect.right <= enemyboundingrect.right + 110 && heroboundingrect.left+50 <= enemyboundingrect.left) ||
        (heroboundingrect.right > enemyboundingrect.right + 110 && heroboundingrect.left+50 <= enemyboundingrect.right && heroboundingrect.left+50 > enemyboundingrect.left)
        );
    var overlappedVertical = (
        heroboundingrect.bottom < enemyboundingrect.bottom &&
        heroboundingrect.bottom >= enemyboundingrect.top
    );
    var reason;
    var overlapped;
    
    if (overlappedHorizontal) {
        if (hero.isJumping) {
            if (overlappedVertical) {
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
    else if(hero.shoots){
        destroy(e2);
    }

    if (overlapped) {
        console.log("overlapped " + reason);
        destroy(e2);
        hero.dead();
        hero.lives = 0;
        window.clearInterval(interval);

    }
}, 50);


