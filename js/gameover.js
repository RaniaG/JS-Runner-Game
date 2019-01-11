const urlParams = new URLSearchParams(window.location.search);
const myParam0 = urlParams.get('goldcoins');
const myParam1 = urlParams.get('silvercoins');
const myParam2 = urlParams.get('miles');
var text = document.querySelectorAll(".gameover__text");


var arr = [myParam0, myParam1, myParam2];


text.forEach((el, i) => {
    el.innerHTML += " " + arr[i];
})