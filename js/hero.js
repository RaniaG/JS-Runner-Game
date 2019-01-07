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
        this.clearAnimateInterval;
        this.firstRun = true; // acts if the game is running for the first time or after game over
        this.heroCharacter = heroCharacter;
        this.isJumping = false;
        // clientHeight is an element height including padding but not bordering 
        this.top = (parseInt(roadTop) - this.heroCharacter.clientHeight); // to place hero above road
        this.heroCharacter.style.top = this.top+"px";
        this.topPosition = this.top;
        this.isShooting = false;
        this.shoots = false;
        this.highJump = false;
        this.lives = 3;
        this.coins ={
            gold: 0,
            silver: 0
        };
        this.milage = 0;
        this.gameOver = false;
        this.currentTopPos,this.currentBottomPos,this.currentLeftPos,this.currentRightPos;
    }
    stopCurrentAnimation() {
        window.clearInterval(this.clearAnimateInterval);
    }
    startRunning() //stripeOffset,startSliceOffset,animateInterval,
    {
        {
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
        }
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
        // }
    }

    startJumping() {
        // debugger;
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
            this.shoots=true;
            this.isJumping = true;
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
                }
            }, this.animateInterval*0.5);

        }
    }

    clickHighJump()
    {
        if (this.isJumping && !this.highJump && this.topPosition < this.top)
        {
            this.stopCurrentAnimation();
            this.isJumping = true;
            this.highJump = true;
            this.isShooting = true;
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.jump + ")";
            var imageNumber = 0;
            var distanceFromGround=this.top-this.topPosition;
            console.log(distanceFromGround);

            this.startSliceOffset = this.stripeOffset;
            this.clearAnimateInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
                if (this.startSliceOffset < this.stripeEnds.jump) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                    imageNumber++;
                    if (imageNumber <= 5) {
                        this.topPosition -= 40;
                        distanceFromGround+=40;
                        this.heroCharacter.style.top = this.topPosition + "px";
                    }
                    else {
                        this.topPosition += (distanceFromGround/4);
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

    dead(){
        this.stopCurrentAnimation();
            this.startSliceOffset = this.stripeOffset;
            this.isShooting = true;
            this.isJumping = true;
            this.highJump = true;
            this.clearAnimateInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.deadSprite + ")";
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
                this.heroCharacter.style.top = this.top+"px";
                if (this.startSliceOffset < this.stripeEnds.dead - this.stripeOffset) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                }
                else {
                    this.stopCurrentAnimation(); 
                }
            }, this.animateInterval *1.25);
    }

    // crash(object)
    updateGame()
    {
        for (let index = 0; index < generatedObjects.length; index++) {
            this.crash(generatedObjects[index])
            }
    }
    crash(objectHit)
    {
        this.currentTopPos = this.heroCharacter.getBoundingClientRect().top;
        this.currentBottomPos = this.currentTopPos + this.heroCharacter.getBoundingClientRect().height;
        this.currentLeftPos = this.heroCharacter.getBoundingClientRect().left;
        this.currentrightPos = this.currentLeftPos + this.heroCharacter.getBoundingClientRect().width;

        var objCurrentTopPos,objCurrentBottomPos,objCurrentLeftPos,objCurrentRightPos;

        objCurrentTopPos = objectHit.getBoundingClientRect().top;
        objCurrentBottomPos = objCurrentTopPos + objectHit.getBoundingClientRect().height;
        objCurrentLeftPos = objectHit.getBoundingClientRect().left;
        objCurrentRightPos = objCurrentLeftPos + objectHit.getBoundingClientRect().width;
        //if collectable
            //if heart
            //if coin
        //if obstacle
            //if to end game
            // if to reduce lives
            // if(this.currentBottomPos > objCurrentTopPos || this.cur < objCurrentTopPos)
             //#region inne Condition of crash boundaries
        if(object.classList.contains("collectable--heart"))
        {
            updateLives(true);
        }
        else if(objectHit.classList.contains("obstacle--cactus--1") || objectHit.classList.contains("obstacle--cactus--2")
        || objectHit.classList.contains("obstacle--rock--1") || objectHit.classList.contains("obstacle--rock--5") )
        {
            updateLives(false);
            stopCurrentAnimation();
            this.startSliceOffset = this.stripeOffset;
            this.clearAnimateInterval = window.setInterval(() => {
                this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.dead + ")";
                this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
            },this.animateInterval);
            startRunning();
        }
        else if(objectHit.classList.contains("obstacles--enemy")){
            endGame();
        }
        else if(objectHit.classList.contains("collectable--coin--gold")){
            updateCoins("gold")
        }
        else if(objectHit.classList.contains("collectable--coin--silver")){
            updateCoins("silver")
        }
            //  #endregion
    }
    updateLives(extraLife)
    {
        //is extraLife true then add one else --
        var lives = document.getElementsByClassName("icon--heart")[0];
        if(extraLife)
        {
            this.lives ++;      
        }
        else
        {
            this.lives--;
        }
        lives.nextElementSibling.innerHTML = "x"+this.lives;
    }
    updateCoins(type)
    {
        if(type === "gold"){
            this.coins.gold ++;
            document.getElementsByClassName("icon--coin--gold")[0].innerHTML = "x"+this.coins.gold ;
            updateMilage(500);
        }
        else if(type === "silver"){
            this.coins.silver ++;
            document.getElementsByClassName("icon--coin--silver")[0].innerHTML = "x"+this.coins.silver ;
            updateMilage(100);
        }

    }
    updateMilage(milageIncrease)
    {
        this.milage += milageIncrease;
        document.getElementsByClassName("icon--coin--run")[0].innerHTML = "x"+this.milage ;
    }
    endGame()
    {
        hero.dead();
        this.gameOver = true; 
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
console.log(x.run);
var hero = new Hero(70, x, 300, 0, { run: 2400, jump:3000, shoot: 900, dead: 3000  }, document.getElementById("hero"))
hero.startRunning();

window.onkeydown = function (event) {
    switch(event.keyCode)
    {
        case 32: // space
        hero.startJumping();
        break;
        case 13: // enter
        hero.shoot();
        break;
        case 38: // up arrow
        hero.clickHighJump();
        break;
        default:
        // left 37 in case fast forward
        // esc 27 in case pause
        break;
    }
}
hero.updateLives(true);
// document.getElementsByTagName("body")[0].addEventListener("click",hero.clickHighJump);