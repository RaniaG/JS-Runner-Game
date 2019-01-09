class Sound{
    constructor(type)
    {
        var url=null;
        switch(type)
        {
            case 0: //coin collect
                url='./sounds/coin_collect.mp3';
                break;
            case 1: //hero jump
                url='./sounds/hero_jump.wav';
                break;
            case 2: //hero hit
                url='./sounds/hero_hit_1.wav';
                break;
            case 3: //shot
                url='./sounds/shoot.wav';
                break;
            case 4: //troll enter
                url='./sounds/troll_enter.wav';
                break;
            case 5: //troll die
                url='./sounds/troll_die.wav';
                break;
        }
        if (url==null ) return;
        this.audio = new Audio(url);
        // this.audio.type = 'audio/wav';
        console.log(this.audio);
    }
    play(){
        // console.log(this.audio);
        this.audio.play();       
    }
}

var coinCollectSound=new Sound(0);
var heroJumpSound=new Sound(1);
var heroHitSound=new Sound(2);
var shootSound=new Sound(3);
var trollEnterSound=new Sound(4);
var trollDieSound=new Sound(5);

// setTimeout(()=>{
//     coinCollectSound.play();
// },2000);
// setTimeout(()=>{
//     heroJumpSound.play();
// },4000);
// setTimeout(()=>{
//     heroHitSound.play();
// },6000);
// setTimeout(()=>{
//     shootSound.play();
// },8000);
// setTimeout(()=>{
//     trollEnterSound.play();
// },10000);
// setTimeout(()=>{
//     trollDieSound.play();
// },12000);
