class CCMenu_Scene extends Phaser.Scene {
    constructor(config){
        super({key: 'ccmenu'});
    }

    preload(){

    }

    create(){
        if(coinscnt == highscore){
            sendPostRequest('/highscore', {highscore:highscore});
        }

        this.inputhandler = new InputHandler(this);

        this.frame = new FramedText(this, [], 91, 29, {x: 0, y: -5, frame_color: '#FFFFFF', ver:'║', hor: '═', corner:'╔╗╝╚'});

        let text = ['', '', `Score: ${coinscnt}`, '', `Highscore: ${highscore}`, '', 'Play again? (Enter)'];
        this.framedText = new FramedText(this, text, 32, 15, 
            {x: gameWidth/2, y: gameHeight/2, origin:[0.5, 0.5], frame_color: '#FFFFFF', ver:'║', hor: '═', corner:'╔╗╝╚', margin: 5});
    }

    update(){
        if(this.inputhandler.keydown('enter')){
            this.scene.start('collectcoins');
        }
    }
}