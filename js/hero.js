var roadTop='550px';
class Hero {
    constructor(animateInterval, stripeURLs, stripeOffset, startSliceOffset, stripeEnds, heroCharacter) {
        this.animateInterval = animateInterval;
        this.stripeURLs = stripeURLs;
        this.stripeOffset = stripeOffset;
        this.startSliceOffset = startSliceOffset;
        this.stripeEnds = stripeEnds;
        this.clearAnimateInterval;
        this.firstRun = true; // acts if the game is running for the first time or after game over
        this.heroCharacter = heroCharacter;
        this.isJumping = false;
        // clientHeight is an element height including padding but not bordering 
        this.top = (parseInt(roadTop) - this.heroCharacter.clientHeight); // to place hero above road
        this.heroCharacter.style.top = this.top + "px";
        this.topPosition = this.top;
        this.isShooting = false;
        this.shoots = false;
        this.highJump = false;
        this.stumbled=false;
        this.fadeInterval;
    }
    stopCurrentAnimation() {
        window.clearInterval(this.clearAnimateInterval);
    }
    startRunning() //stripeOffset,startSliceOffset,animateInterval,
    {

        this.clearAnimateInterval = window.setInterval(() => {
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
        
    }
    stumble()
    {

        if (!this.stumbled)
        {
            this.stumbled=true;
        this.fadeInterval = window.setInterval(() => {
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.run + ")";
            this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
            if (this.startSliceOffset < this.stripeEnds.run) {
                this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                this.heroCharacter.style.opacity -= 0.125;

            }
            else {
                this.startSliceOffset = this.stripeOffset;
                this.heroCharacter.style.opacity = 1;
                window.clearInterval(this.fadeInterval);
                this.startRunning();
                this.stumbled = false;
            }
        }, this.animateInterval*0.5);
        }
}
    startJumping() {
        if (this.isJumping == false) {
            this.stopCurrentAnimation();
            this.isJumping = true;
            this.isShooting = true;
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.jump + ")";
            var imageNumber = 0;
            this.startSliceOffset = this.stripeOffset;
            this.clearAnimateInterval = window.setInterval(() => {
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
                    this.stopCurrentAnimation();
                    this.isJumping = false;
                    this.isShooting = false;
                    this.startRunning();
                }
            }, this.animateInterval);
        }
    }

    shoot() {
        if (this.isJumping == false && this.isShooting == false) {
            this.stopCurrentAnimation();
            this.startSliceOffset = this.stripeOffset;
            this.isShooting = true;
            this.shoots = true;
            this.isJumping = true;
            var shootSound = new Sound(3);
            shootSound.play();  
            this.clearAnimateInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.shoot + ")";
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
                if (this.startSliceOffset < this.stripeEnds.shoot) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                }
                else {
                    this.startSliceOffset = this.stripeOffset;
                    this.stopCurrentAnimation();
                    this.isShooting = false;
                    this.shoots = false;
                    this.isJumping = false;
                    this.startRunning();
                    /**************************************************************** */
                    destroyEnemy();
                }
            }, this.animateInterval*0.1);

        }
    }

    clickHighJump() {
        if (this.isJumping && !this.highJump && this.topPosition < this.top) {
            this.stopCurrentAnimation();
            this.isJumping = true;
            this.highJump = true;
            this.isShooting = true;
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.jump + ")";
            var imageNumber = 0;

            var distanceFromGround=this.top-this.topPosition;

            this.startSliceOffset = this.stripeOffset;
            this.clearAnimateInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
                if (this.startSliceOffset < this.stripeEnds.jump) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                    imageNumber++;
                    if (imageNumber <= 5) {
                        this.topPosition -= 40;
                        distanceFromGround += 40;
                        this.heroCharacter.style.top = this.topPosition + "px";
                    }
                    else {
                        this.topPosition += (distanceFromGround / 4);
                        this.heroCharacter.style.top = this.topPosition + "px";
                    }
                }
                else {
                    this.startSliceOffset = this.stripeOffset;
                    imageNumber = 0;
                    this.topPosition = this.top;
                    this.heroCharacter.style.top = this.topPosition + "px";
                    this.stopCurrentAnimation();
                    this.highJump = false;
                    this.isJumping = false;
                    this.isShooting = false;
                    this.startRunning();
                }
            }, this.animateInterval);
        }
    }

    dead() {
        this.stopCurrentAnimation();
        this.startSliceOffset = this.stripeOffset;
        this.isShooting = true;
        this.isJumping = true;
        this.highJump = true;
        this.clearAnimateInterval = window.setInterval(() => {
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.deadSprite + ")";
            this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
            this.heroCharacter.style.top = this.top + "px";
            if (this.startSliceOffset < this.stripeEnds.dead - this.stripeOffset) {
                this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
            }
            else {
                this.stopCurrentAnimation();
                
            }
        }, this.animateInterval * 1.25);
    }
    
}
var x = {
    run: 'images/Run-Stripe.png',
    idle: 'images/idle.png',
    jump: 'images/jump.png',
    shoot: 'images/Shoot-Stripe.png',
    deadSprite: 'images/dead.png',
    dead: 'images/dead2.png'
};
