
class gameObject
{
    constructor(animateInterval,stripeURLs,stripeOffset,startSliceOffset,stripeEnds)
    {
        this.animateInterval = animateInterval;
        this.stripeURLs = stripeURLs;
        this.stripeOffset = stripeOffset;
        this.startSliceOffset = startSliceOffset;
        this.stripeEnds = stripeEnds;
    }
}

class Hero extends gameObject
{
    constructor(animateInterval,stripeURLs,stripeOffset,startSliceOffset,stripeEnds,heroCharacter)
    {
        super(animateInterval,stripeURLs,stripeOffset,startSliceOffset,stripeEnds);
        this.clearRunInterval;
        this.firstRun = true; // acts if the game is running for the first time or after game over
        this.heroCharacter = heroCharacter;
        
    }
    stopRunning()
    {
        window.clearInterval(this.clearRunInterval);
    }
    startRunning() //stripeOffset,startSliceOffset,animateInterval,
    {
        // this.heroCharacter ;
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
            this.clearRunInterval = window.setInterval(()=>{
                this.heroCharacter.style.backgroundImage = "url("+this.stripeURLs.run+")";
                this.heroCharacter.style.backgroundPosition = (-1*this.startSliceOffset)+'px 0px';
                // console.log(this.startSliceOffset);
                if (this.startSliceOffset < this.stripeEnds.run) {
                    this.startSliceOffset = this.startSliceOffset + this.stripeOffset;
                  }
                else {
                    this.startSliceOffset = this.stripeOffset;
                  }
            },this.animateInterval);
        // }
    }
}
var x = {
    run:'images/Run-Stripe.png',
    idle: 'images/idle.png'
        };
console.log(x.run);
var hero = new Hero(70,x,300,0,{run:2400}, document.getElementById("hero"))
hero.startRunning();
