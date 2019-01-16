class Gamelogic {
    constructor() {
        this.lives = 5;
        this.coins = {
            gold: 0,
            silver: 0
        };
        this.milage = 0;
        this.gameOver = false;
        this.generation = new Generation();
        this.backMusic = new Sound(7);
        this.hero = new Hero(70, x, 300, 0, { run: 2400, jump: 3000, shoot: 900, dead: 3000 }, document.getElementById("hero"));
    }

    startGame() {
        this.backMusic.play();
        setInterval(() => {
            this.backMusic.play();
        }, 121000);
        this.generation.start();
        this.hero.startRunning();
        this.inputHandler();
        setInterval(function (game) {
            game.crash();
            game.updateMilage(10);
        }, 10, this)
        setInterval
    }
    inputHandler() {
        var self = this;
        window.onkeydown = function (event) {
            switch (event.keyCode) {
                case 32: // space
                    self.hero.startJumping();
                    break;
                case 13: // enter
                    //this.hitEnemy();
                    self.hero.shoot();
                    break;
                case 38: // up arrow
                    self.hero.clickHighJump();
                    break;
                default:
                    // left 37 in case fast forward
                    // esc 27 in case pause
                    break;
            }
        }
    }
    crash() {
        var possibleHitsPoints = [];
        var currentBoundingBox = this.hero.heroCharacter.getBoundingClientRect();
        var heroActualTop = currentBoundingBox.top + 20; //startof the hat 
        var heroActualLeft = (currentBoundingBox.left + 50); // start of the hero left

        possibleHitsPoints.push([heroActualLeft, heroActualTop]);
        possibleHitsPoints.push([heroActualLeft + 150, heroActualTop]);
        possibleHitsPoints.push([heroActualLeft, heroActualTop + 222]);
        possibleHitsPoints.push([heroActualLeft + 75, heroActualTop + 222]);
        possibleHitsPoints.push([heroActualLeft + 75, heroActualTop + 111]);
        possibleHitsPoints.push([heroActualLeft + 30, heroActualTop + 55]);
        possibleHitsPoints.push([heroActualLeft + 90, heroActualTop + 167]);
        for (let index = 0; index < possibleHitsPoints.length; index++) {
            var possibleHits = document.elementsFromPoint(possibleHitsPoints[index][0], possibleHitsPoints[index][1])[1];
            if (possibleHits.classList.contains("collectable--heart")) {
                this.updateLives(true);
                this.hitHeart(possibleHits);
            }
            else if (possibleHits.classList.contains("obstacle--cactus--1")) {
                this.updateLives(false);
                this.hitCactus(possibleHits);
            }
            else if (possibleHits.classList.contains("obstacle--rock--5")) {
                this.updateLives(false);
                this.hitRock(possibleHits);
            }
            else if (possibleHits.classList.contains("obstacle--enemy")) {
                this.endGame();
            }
            else if (possibleHits.classList.contains("collectable--coin__face")) {
                if (possibleHits.parentElement.classList.contains("collectable--coin--gold")) {
                    this.updateCoins("gold");
                    this.hitCoin(possibleHits);
                }
                else if (possibleHits.parentElement.classList.contains("collectable--coin--silver")) {
                    this.updateCoins("silver");
                    this.hitCoin(possibleHits);
                }
            }


        }
    }

    updateLives(extraLife) {
        //is extraLife true then add one else --
        var lives = document.getElementById("lives");
        if (extraLife) {
            this.lives++;
        }
        else {
            if (this.lives > 1) {
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
            document.getElementById("coin--gold").innerHTML = "x" + this.coins.gold;
            this.updateMilage(500);
            // console.log("gold " + this.coins.gold);
        }
        else if (type === "silver") {
            this.coins.silver++;
            document.getElementById("coin--silver").innerHTML = "x" + this.coins.silver;
            this.updateMilage(100);
            // console.log("silver " + this.coins.silver);

        }

    }
    updateMilage(milageIncrease) //
    {
        this.milage += milageIncrease;
        document.getElementById("icon--run").innerHTML = "x" + this.milage;
        // console.log("milage " + this.milage);

    }

    endGame() //
    {
        this.hero.dead();
        window.location.href = 'gameover.html?goldcoins=' + this.coins.gold + "&silvercoins=" + this.coins.silver + "&miles=" + this.milage;
        this.gameOver = true;

    }
    hitRock(x) {
        var heroHitSound = new Sound(2);
        heroHitSound.play();
        var left = window.getComputedStyle(x).getPropertyValue("left");
        x.className = "destroy destroy--rock";
        x.style.animationName = "rock-destroy";
        x.style.left = left;


    }
    hitCactus(x) {
        var heroHitSound = new Sound(2);
        heroHitSound.play();
        var left = window.getComputedStyle(x).getPropertyValue("left");
        x.className = "destroy destroy--cactus";
        x.style.animationName = "cactus-destroy";
        x.style.left = left;

    }
    hitEnemy() {
        var enemy = document.querySelector(".obstacle--enemy");
        if (enemy && enemy.offsetLeft < 1200) {
            enemy.remove();
            var trollDieSound = new Sound(5);
            trollDieSound.play();
        }
    }
    hitCoin(x) {
        var coinSound = new Sound(0);
        coinSound.play();
        // console.log(x.parentElement);
        x.parentElement.remove();
    }
    hitHeart(x) {
        var heartSound = new Sound(6);
        heartSound.play();
        x.remove();
    }
}
var game = new Gamelogic();
game.startGame();