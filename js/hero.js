
class gameObject {
    constructor(animateInterval, stripeURLs, stripeOffset, startSliceOffset, stripeEnds) {
        this.animateInterval = animateInterval;
        this.stripeURLs = stripeURLs;
        this.stripeOffset = stripeOffset;
        this.startSliceOffset = startSliceOffset;
        this.stripeEnds = stripeEnds;
    }
}
 //roadTop 260px
class Hero extends gameObject {
    constructor(animateInterval, stripeURLs, stripeOffset, startSliceOffset, stripeEnds, heroCharacter) {
        super(animateInterval, stripeURLs, stripeOffset, startSliceOffset, stripeEnds);
        this.clearRunInterval;
        this.firstRun = true; // acts if the game is running for the first time or after game over
        this.heroCharacter = heroCharacter;
        this.isJumping = false;
        this.top = (parseInt(roadTop) - this.heroCharacter.clientHeight);
        this.heroCharacter.style.top = this.top+"px";
        this.topPosition = this.top;
        this.isShooting = false;
    }
    stopRunning() {
        window.clearInterval(this.clearRunInterval);
    }
    startRunning() //stripeOffset,startSliceOffset,animateInterval,
    {
        // this.heroCharacter ;
        // if(this.firstRun)
        // {
        //     heroCharacter.style.backgroundImage = "url("+this.stripeURLs.idle+")";
        //     //some code to fall from above
        //     var top = 0;
        //     heroCharacter.style.top = top+'px';
        //     do {
        //         window.setInterval(()=>
        //         {
        //             top+=10;
        //     heroCharacter.style.top = top+'px';

        //         },animateInterval);
        //     } while (top<window.innerHeight);
        //     this.firstRun = false;
        //     this.startRunning(2400);
        // }
        // else
        // {
        // debugger;
        // console.log(this.stripeURLs);
        this.clearRunInterval = window.setInterval(() => {
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.run + ")";
            this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
            // console.log(this.startSliceOffset);
            if (this.startSliceOffset < this.stripeEnds.run) {
                this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
            }
            else {
                this.startSliceOffset = this.stripeOffset;
            }
        }, this.animateInterval);
        // }
    }

    startJumping() {
        // debugger;
        if (this.isJumping == false) {
            this.stopRunning();
            this.isJumping = true;
            this.isShooting = true;
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.jump + ")";
            var imageNumber = 0;
            this.startSliceOffset = this.stripeOffset;
            this.clearRunInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
                if (this.startSliceOffset < this.stripeEnds.jump) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                    imageNumber++;
                    if (imageNumber <= 5) {
                        this.topPosition -= 40;
                        this.heroCharacter.style.top = this.topPosition + "px";
                    }
                    else {
                        this.topPosition += 50;
                        this.heroCharacter.style.top = this.topPosition + "px";
                    }
                }
                else {
                    this.startSliceOffset = this.stripeOffset;
                    imageNumber = 0;
                    this.topPosition = this.top;
                    this.heroCharacter.style.top = this.topPosition + "px";
                    this.stopRunning();
                    this.isJumping = false;
                    this.isShooting = false;
                    this.startRunning();
                }
            }, this.animateInterval);
        }
    }

    shoot() {
        if (this.isJumping == false && this.isShooting == false) {
            this.stopRunning();
            this.startSliceOffset = this.stripeOffset;
            this.isShooting = true;
            this.isJumping = true;
            this.clearRunInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.shoot + ")";
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
                if (this.startSliceOffset < this.stripeEnds.shoot) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                }
                else {
                    this.startSliceOffset = this.stripeOffset;
                    this.stopRunning();
                    this.isShooting = false;
                    this.isJumping = false;
                    this.startRunning();
                }
            }, this.animateInterval*1.5);

        }
    }
}
var x = {
    run: 'images/Run-Stripe.png',
    idle: 'images/idle.png',
    jump: 'images/jump.png',
    shoot: 'images/shoot-Stripe.png'
};
console.log(x.run);
var hero = new Hero(70, x, 300, 0, { run: 2400, jump:3000, shoot: 900  }, document.getElementById("hero"))
hero.startRunning();
window.onkeydown = function (event) {
    if (event.keyCode == 32) {
        hero.startJumping();
    }
    else if (event.keyCode == 13) {
        hero.shoot();
    }
}
