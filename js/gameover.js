function printScore() {
    const urlParams = new URLSearchParams(window.location.search);
    const goldcoins = urlParams.get('goldcoins');
    const silvercoins = urlParams.get('silvercoins');
    const miles = parseInt(urlParams.get('miles'));
    var text = document.querySelectorAll(".gameover__text");
    var highScore = parseInt(localStorage.getItem("score"));
    if (isNaN(highScore)) {
        localStorage.setItem("score", miles);
    }
    if (miles > highScore) {
        localStorage.setItem("score", miles);
    }
    highScore = localStorage.getItem("score");
    var arr = [goldcoins, silvercoins, miles, highScore];
    text.forEach((el, i) => {
        el.innerHTML += " " + arr[i];
    })
}
printScore();