const gameWidth = 1000;
const gameHeight = 600;

/*window.onload = () => {
    
}*/

let gameConfig = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#111',
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};        

let game = new Phaser.Game(gameConfig);

let inputHandler;
let keyW;
let player;
let coinspawner;

let coincnt_text;
let timer;
let highscore_text;

let coinscnt = 0;

let frame;

function preload(){
    
}

function create(){
    console.log(this);

    inputHandler = new InputHandler(this);

    //player = new Player(this, [{char:'Å', color:'#FFFFFF'}, {char:'--', color:'#FFFFFF'}, {char:'', color:'#FFFFFF'}]);
    player = new Player(this, [{char:'@', color:'#FFFFFF'}], {x:500, y:300, speed:3});

    coinspawner = new Coinspawner(this, 5);

    timer = new Timer(this, '--', 60, {x:gameWidth/2, y:10, origin:'centered'});
    
    coincnt_text = new Hudtext(this, 'Coins: ', {x:10, y:10});

    highscore_text = new Highscore(this, 10, {x:gameWidth - 10, y: 10, origin_x:1});

    frame = new FramedText(this, [], 91, 29, {x: 0, y: -5, frame_color: '#555', ver:'║', hor: '═', corner:'╔╗╝╚'});

    //drawCross(this);
}
    
function update(){
    timer.update();

    coincnt_text.settext(`Coins: ${coinscnt}`);
    
    player.update();
    coinspawner.update();

    highscore_text.update();
}

/**
 * Draws a vertical and horizontal line in the center of the given scene.
 * For Debugging purposes.
 * 
 * @param {Scene} scene The scene the lines get drawn on.
 */
function drawCross(scene){
    let graphics = scene.add.graphics();
    
    graphics.lineStyle(1, 0x00ff00);

    graphics.beginPath();

    graphics.moveTo(gameWidth/2, 0);
    graphics.lineTo(gameWidth/2, gameHeight);

    graphics.moveTo(0, gameHeight/2);
    graphics.lineTo(gameWidth, gameHeight/2);

    graphics.strokePath();

    graphics.closePath();    
}

