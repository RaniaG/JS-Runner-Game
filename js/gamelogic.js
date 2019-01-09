class Gamelogic {
    constructor() {
        this.lives;
        this.goldCoins;
        this.silverCoins;
        this.distance;
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
        document.getElementsByClassName("icon--coin--run")[0].innerHTML = "x" + this.milage;
    }

    endGame() {
        hero.dead();
        this.gameOver = true;
    }
}
hero.updateLives(true);