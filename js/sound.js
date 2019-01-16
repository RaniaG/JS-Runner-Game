class Sound{
    constructor(type)
    {
        var url=null;
        this.volume=1.0;
        switch(type)
        {
            case 0: //coin collect
                url='./sounds/coin_collect.mp3';
                break;
            case 1: //hero jump
                url='./sounds/hero_jump.wav';
                break;
            case 2: //hero hit
                url='./sounds/hero_hit_1.mp3';
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
            case 6: //heart
                url='./sounds/heart.wav';
                break;
            case 7: //background music
                url='./sounds/background_music_2.mp3';
                this.volume=0.5;
                break;
        }
        if (url==null ) return;
        this.audio = new Audio(url);
        this.audio.volume=this.volume;
    }
    play(){
        this.audio.play();       
    }
}

// var coinCollectSound=new Sound(0);
// var heroJumpSound=new Sound(1);
// var heroHitSound=new Sound(2);
// var shootSound=new Sound(3);
// var trollEnterSound=new Sound(4);
// var trollDieSound=new Sound(5);
