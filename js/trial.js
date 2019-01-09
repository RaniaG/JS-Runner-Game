container = document.querySelector(".notathing");


// hero.animateInterval=30;


var e2 = new Enemy(roadTop);
e2.draw();
e2.animate();

interval = window.setInterval(() => {
    // debugger;
    var heroboundingrect = hero.heroCharacter.getBoundingClientRect();
    var crashedboundingrect = e2.div.getBoundingClientRect();
    var overlappedHorizontal = (
        // (heroboundingrect.right == crashedboundingrect.left + 110 && heroboundingrect.left < crashedboundingrect.left) ||
        (heroboundingrect.right >= crashedboundingrect.left + 110 && heroboundingrect.right <= crashedboundingrect.right + 110 && heroboundingrect.left+50 <= crashedboundingrect.left) ||
        (heroboundingrect.right > crashedboundingrect.right + 110 && heroboundingrect.left+50 <= crashedboundingrect.right && heroboundingrect.left+50 > crashedboundingrect.left)
        );
    var overlappedVertical = (
        heroboundingrect.bottom < crashedboundingrect.bottom && heroboundingrect.bottom >= crashedboundingrect.top ||
        heroboundingrect.top > crashedboundingrect.top && heroboundingrect.top <= crashedboundingrect.bottom
    );
    var reason;
    var overlapped;
    
    if (overlappedHorizontal) {
        if (hero.isJumping) {
            if (overlappedVertical) {
                console.log(heroboundingrect.bottom, crashedboundingrect.top);
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


