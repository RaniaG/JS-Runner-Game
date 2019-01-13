class Gamelogic {
    constructor() {
        this.lives = 3;
        this.coins = {
            gold: 0,
            silver: 0
        };
        this.milage;
        this.gameOver = false;
        this.generation = new Generation();
        this.backMusic=new Sound(7);
    }

    startGame(){
        this.backMusic.play();
        setInterval(()=>{
            this.backMusic.play();
        },121000);
        this.generation.start();
    }
    updateLives(extraLife) {
        //is extraLife true then add one else --
        var lives = document.getElementsByClassName("icon--heart")[0];
        if (extraLife) {
            this.lives++;
        }
        else {
            this.lives--;
        }

        if (this.lives == 0) {
            endgame();
        }

        lives.nextElementSibling.innerHTML = "x" + this.lives;
    }

    updateCoins(type) {
        if (type === "gold") {
            this.coins.gold++;
            document.getElementsByClassName("icon--coin--gold")[0].innerHTML = "x" + this.coins.gold;
            updateMilage(500);
        }
        else if (type === "silver") {
            this.coins.silver++;
            document.getElementsByClassName("icon--coin--silver")[0].innerHTML = "x" + this.coins.silver;
            updateMilage(100);
        }

    }
    updateMilage(milageIncrease) {
        this.milage += milageIncrease;
        document.getElementsByClassName("icon--run")[0].innerHTML = "x" + this.milage;
    }

    endGame() {
        hero.dead();
        this.gameOver = true;
    }

    updateGame() {
        var possibleHits;
        document.elementsFromPoint(250);
        //to be continue ....
        var index = 0;
        var crash = false;
        do {
            crash = hero.crash(possibleHits[index]);
            if (crash) {
                /// to be in game class 
                if (possibleHits[index].classList.contains("collectable--heart")) {
                    updateLives(true);
                }
                else if (possibleHits[index].classList.contains("obstacle--cactus--1") || possibleHits[index].classList.contains("obstacle--cactus--2")
                    || possibleHits[index].classList.contains("obstacle--rock--1") || possibleHits[index].classList.contains("obstacle--rock--5")
                    || possibleHits[index].classList.contains("obstacle--rock--2") || possibleHits[index].classList.contains("obstacle--rock--3")
                    || possibleHits[index].classList.contains("obstacle--rock--4")) {
                    updateLives(false);
                }
                else if (possibleHits[index].classList.contains("obstacles--enemy")) {
                    endGame();
                }
                else if (possibleHits[index].classList.contains("collectable--coin--gold")) {
                    updateCoins("gold")
                }
                else if (possibleHits[index].classList.contains("collectable--coin--silver")) {
                    updateCoins("silver")
                }
            }
        } while (!crash);

    }
}
var game=new Gamelogic();
game.startGame();
hero.updateLives(true);