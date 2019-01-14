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
        this.heroCharacter.style.top = this.top + "px";
        this.topPosition = this.top;
        this.isShooting = false;
        this.shoots = false;
        this.highJump = false;
        this.lives = 3; //
        this.coins = {//
            gold: 0,
            silver: 0
        };
        this.milage = 0;
        this.gameOver = false;
        this.stumbled=false;
        this.fadeInterval;
        // this.currentBoundingBox = this.heroCharacter.getBoundingClientRect();
        // console.log(this.currentBoundingBox.top);
        // this.heroActualTop =isNaN(this.currentBoundingBox.top+20);
        // this.heroActualLeft =(this.currentBoundingBox.left+50);
        // console.log(this.heroActualTop);
        // this.currentTopPos,this.currentBottomPos,this.currentLeftPos,this.currentRightPos;
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
    stumble()
    {
       // this.stopCurrentAnimation();
        // this.isShooting = true;
        // this.isJumping= true;
        if (!this.stumbled)
        {
            this.stumbled=true;
        this.fadeInterval = window.setInterval(() => {
            this.heroCharacter.style.backgroundImage = "url(" + this.stripeURLs.run + ")";
            this.heroCharacter.style.backgroundPosition = (-1 * this.startSliceOffset) + 'px 254px';
            // console.log(this.startSliceOffset);
            if (this.startSliceOffset < this.stripeEnds.run) {
                this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                this.heroCharacter.style.opacity -= 0.125;

            }
            else {
                this.startSliceOffset = this.stripeOffset;
                this.heroCharacter.style.opacity = 1;
                // this.isShooting = false;
                // this.isJumping= false;
                //this.stopCurrentAnimation();
                window.clearInterval(this.fadeInterval);
                this.startRunning();
                this.stumbled = false;
            }
        }, this.animateInterval*0.5);
        }
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
            // console.log(distanceFromGround);

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
                window.location.href = 'gameover.html?goldcoins='+this.coins.gold+"&silvercoins="+this.coins.silver+"&miles="+this.milage;
             
            }
        }, this.animateInterval * 1.25);
    }

    // crash(object)
    // updateGame() ///
    // {
    //     for (let index = 0; index < generatedObjects.length; index++) {
    //         this.crash(generatedObjects[index])
    //         }
    // }
    crash() {
        var crashReturn = false;
        // this.currentTopPos = this.heroCharacter.getBoundingClientRect().top;
        // this.currentBottomPos = this.heroCharacter.getBoundingClientRect().bottom;
        // this.currentLeftPos = this.heroCharacter.getBoundingClientRect().left;
        // this.currentrightPos = this.currentLeftPos + this.heroCharacter.getBoundingClientRect().width;

        // var objCurrentTopPos,objCurrentBottomPos,objCurrentLeftPos,objCurrentRightPos;

        // var objCurrentBoundingBox = objectHit.getBoundingClientRect();

        // objCurrentTopPos = objectHit.getBoundingClientRect().top;
        // objCurrentBottomPos = objCurrentTopPos + objectHit.getBoundingClientRect().height;
        // objCurrentLeftPos = objectHit.getBoundingClientRect().left;
        // objCurrentRightPos = objCurrentLeftPos + objectHit.getBoundingClientRect().width;
        //if collectable
        //if heart
        //if coin
        //if obstacle

        //if to end game
        // if to reduce lives
        // if(this.currentBottomPos > objCurrentTopPos || this.cur < objCurrentTopPos)
        //#region inne Condition of crash boundaries0
        var possibleHitsPoints = [];
        var currentBoundingBox = this.heroCharacter.getBoundingClientRect();
        var heroActualTop = currentBoundingBox.top + 20; //startof the hat 
        var heroActualLeft = (currentBoundingBox.left + 50); // start of the hero left
        // console.log(document.elementsFromPoint(heroActualLeft+75, (heroActualTop+111)));
        // possibleHits.push(document.elementsFromPoint(heroActualLeft + 75, (heroActualTop + 111))[1]);
         possibleHitsPoints.push([heroActualLeft,heroActualTop]);
         possibleHitsPoints.push([heroActualLeft+150,heroActualTop]);
         possibleHitsPoints.push([heroActualLeft,heroActualTop+222]);
         possibleHitsPoints.push([heroActualLeft+150,heroActualTop+222]);
         possibleHitsPoints.push([heroActualLeft+75,heroActualTop+111]);
        // possibleHits.push(document.elementsFromPoint((heroActualLeft+37), heroActualTop)[1]);
        // possibleHits.push(document.elementsFromPoint((heroActualLeft+112), heroActualTop)[1]);


        for (let index = 0; index < possibleHitsPoints.length; index++) {
            var possibleHits = document.elementsFromPoint(possibleHitsPoints[index][0],possibleHitsPoints[index][1])[1];
            console.log(possibleHits);
            if (possibleHits.classList.contains("collectable--heart")) {
                this.updateLives(true);
                // possibleHits.remove();
                    destroyHeart(possibleHits);
            }
            // else if(possibleHits.classList.contains("obstacle--cactus--1") || possibleHits.classList.contains("obstacle--cactus--2")
            // || possibleHits.classList.contains("obstacle--rock--1") || possibleHits.classList.contains("obstacle--rock--5")
            // || possibleHits.classList.contains("obstacle--rock--2") || possibleHits.classList.contains("obstacle--rock--3")
            // || possibleHits.classList.contains("obstacle--rock--4")  )
            // {
            //     this.updateLives(false);

            // }
            else if (possibleHits.classList.contains("obstacle--cactus--1")) {
               // debugger;
                this.updateLives(false);
                // possibleHits.classList.remove("obstacle--cactus--1");
                // possibleHits.classList.add("destroy--cactus");
                destroyCactus(possibleHits);

            }
            else if (possibleHits.classList.contains("obstacle--rock--5")) {
                this.updateLives(false);
                // possibleHits.classList.remove("obstacle--rock--5");
                // possibleHits.classList.add("destroy--rock");
                destroyRock(possibleHits);
               // this.stumble();



            }
            else if (possibleHits.classList.contains("obstacle--enemy")) {
                this.endGame();
            }
            else if (possibleHits.classList.contains("collectable--coin__face")) {
                if (possibleHits.parentElement.classList.contains("collectable--coin--gold")) {
                    this.updateCoins("gold");
                    // possibleHits.remove();
                    destroyCoin(possibleHits);
                }
                else if (possibleHits.parentElement.classList.contains("collectable--coin--silver")) {
                    this.updateCoins("silver");
                    // possibleHits.remove();
                    destroyCoin(possibleHits);
                }
            }

        }

        //  var overlappedHorizontal = (
        //     // (this.currentBoundingBox.right == objCurrentBoundingBox.left + 110 && this.currentBoundingBox.left < objCurrentBoundingBox.left) ||
        //     (this.currentBoundingBox.right >= objCurrentBoundingBox.left + 110 && this.currentBoundingBox.right <= objCurrentBoundingBox.right + 110 && this.currentBoundingBox.left+50 <= objCurrentBoundingBox.left) ||
        //     (this.currentBoundingBox.right > objCurrentBoundingBox.right + 110 && this.currentBoundingBox.left+50 <= objCurrentBoundingBox.right && this.currentBoundingBox.left+50 > objCurrentBoundingBox.left)
        //     );
        // var overlappedVertical = (
        //     this.currentBoundingBox.bottom < objCurrentBoundingBox.bottom && this.currentBoundingBox.bottom >= objCurrentBoundingBox.top ||
        //     this.currentBoundingBox.top > objCurrentBoundingBox.top && this.currentBoundingBox.top <= objCurrentBoundingBox.bottom
        // );

        // if (overlappedHorizontal) {
        //     if (this.isJumping) {
        //         if (overlappedVertical) {
        //             //console.log(heroboundingrect.bottom, crashedboundingrect.top);
        //             crashReturn = true;
        //         }
        //     }
        //     else{
        //     crashReturn = true;
        //     }
        // }
        // return crashReturn;

        //  #endregion
    }
    updateLives(extraLife) //
    {
        //is extraLife true then add one else --
        var lives = document.getElementsByClassName("icon--heart")[0];
        if (extraLife) {
            // var heartsound= new Sound(6);
            // heartsound.play();
            this.lives++;
        }
        else {
            if (this.lives > 0)
            {
            // var hurtsound= new Sound(2);
            // hurtsound.play();
                this.lives--;
            }
            else
                this.endGame();
        }
        lives.innerHTML = "x" + this.lives;
    }
    updateCoins(type) //
    {
        if (type === "gold") {
            this.coins.gold++;
            document.getElementsByClassName("icon--coin--gold")[0].innerHTML = "x" + this.coins.gold;
            this.updateMilage(500);
            console.log("gold " + this.coins.gold);
        }
        else if (type === "silver") {
            this.coins.silver++;
            document.getElementsByClassName("icon--coin--silver")[0].innerHTML = "x" + this.coins.silver;
            this.updateMilage(100);
            console.log("silver " + this.coins.silver);

        }

    }
    updateMilage(milageIncrease) //
    {
        this.milage += milageIncrease;
        document.getElementsByClassName("icon--run")[0].innerHTML = "x" + this.milage;
        console.log("milage " + this.milage);

    }
    endGame() //
    {
        this.dead();
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

// console.log(x.run);
var hero = new Hero(70, x, 300, 0, { run: 2400, jump:3000, shoot: 900, dead: 3000  }, document.getElementById("hero"))

hero.startRunning();

window.onkeydown = function (event) {
    switch (event.keyCode) {
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
// hero.updateLives(true);
setInterval(function () {
    hero.crash();
}, 50)
// document.getElementsByTagName("body")[0].addEventListener("click",hero.clickHighJump);