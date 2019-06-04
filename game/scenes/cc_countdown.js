/**
 * @classdesc Countdown scene. 
 * Counts down from 3 when before the game starts.
 * @author Ben Krueger
 */
class CCCountdown_Scene extends Phaser.Scene {
    constructor(config){
        super({key:'cccountdown'});
    }

    preload(){

    }

    create(){
        // outer frame
        this.frame = new FramedText(this, [], 91, 29, {x: 0, y: -5, frame_color: '#FFFFFF', ver:'║', hor: '═', corner:'╔╗╝╚'});

        // counter
        this.counterframe = new FramedText(this, [], 9, 5, {x: gameWidth/2, y: gameHeight/2, origin:[0.5, 0.5], 
            frame_color: '#FFFFFF', ver:'║', hor: '═', corner:'╔╗╝╚'});

        this.counter = new Timer(this, '--', 3, {x: gameWidth/2, y:gameHeight/2, origin:[0.5,0.5], colorchangetime:-1, endtime:1});
    }

    update(){
        this.counter.update();

        if(this.counter.ended){
            this.scene.start('collectcoins');
        }
    }
}