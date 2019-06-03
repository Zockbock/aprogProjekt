class CollectCoins_Scene extends Phaser.Scene {
    constructor(config){
        super({key: 'collectcoins'});
    }

    preload(){
        coinscnt = 0;
    }

    create(){

        this.inputHandler = new InputHandler(this);

        //player = new Player(this, [{char:'Å', color:'#FFFFFF'}, {char:'--', color:'#FFFFFF'}, {char:'', color:'#FFFFFF'}]);
        this.player = new Player(this, [{char:'@', color:'#FFFFFF'}], {x:500, y:300, speed:3});

        this.coinspawner = new Coinspawner(this, 5);

        this.timer = new Timer(this, '--', 60, {x:gameWidth/2, y:15, origin:'centered'});

        this.coincnt_text = new Hudtext(this, 'Coins: ', {x:15, y:15});

        this.highscore_text = new Highscore(this, highscore, {x:gameWidth - 15, y: 15, origin:[1, 0]});

        this.frame = new FramedText(this, [], 91, 29, {x: 0, y: -5, frame_color: '#FFFFFF', ver:'║', hor: '═', corner:'╔╗╝╚'});
    }

    update(){
        this.timer.update();

        this.coincnt_text.settext(`Coins: ${coinscnt}`);
        
        this.player.update();
        this.coinspawner.update();

        this.highscore_text.update();

        if(this.timer.ended){
            this.endgame();
        }
    }

    endgame(){
        if(this.highscore_text.highscore > highscore) {
            highscore = this.highscore_text.highscore;
        }

        this.scene.start('ccmenu');
    }
}