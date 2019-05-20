const gameWidth = 1000;
const gameHeight = 600;

window.onload = () => {
    
}

let gameConfig = {
    type: Phaser.WEBGL,
    width: gameWidth,
    height: gameHeight,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
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
let coin;

function preload(){
    
}
    
function create(){

    inputHandler = new InputHandler(this);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    //player = new Player(this, [{char:'Å', color:'#FFFFFF'}, {char:'--', color:'#FFFFFF'}, {char:'', color:'#FFFFFF'}]);
    player = new Player(this, [{char:'@', color:'#FFFFFF'}], {x:500, y:300, speed:3});

    coin = new Coin(this, {x:400, y:280});

    // collison
    //this.physics.add.collider(player.collider, testEntity.collider, () => {console.log("collision!")});

    drawCross(this);
}
    
function update(){
    player.update();
}


function drawCross(context){
    let graphics = context.add.graphics();
    
    graphics.lineStyle(1, 0x00ff00);

    graphics.beginPath();

    graphics.moveTo(gameWidth/2, 0);
    graphics.lineTo(gameWidth/2, gameHeight);

    graphics.moveTo(0, gameHeight/2);
    graphics.lineTo(gameWidth, gameHeight/2);

    graphics.strokePath();

    graphics.closePath();    
}

