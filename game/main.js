const gameWidth = 1000;
const gameHeight = 600;

window.onload = () => {
    let gameConfig = {
        type: Phaser.AUTO,
        width: gameWidth,
        height: gameHeight,
        parent: 'game',
        scene:{
            preload: preload,
            create: create,
            update: update
        }
    };

    let game = new Phaser.Game(gameConfig);
}
    
let text;

function preload(){
    
}
    
function create(){
    
    //console.log($('canvas').height());
    console.log();
            
    text = this.add.text(gameWidth/2, gameHeight/2, '@', {fontFamily: "Consolas, Arial", fontSize: 20, color: "#FFFFFF"});

    text.setOrigin(0.5, 0.5);

    // draw lines
    let graphics = this.add.graphics();
    
    graphics.lineStyle(1, 0x00ff00);

    graphics.beginPath();

    graphics.moveTo(gameWidth/2, 0);
    graphics.lineTo(gameWidth/2, gameHeight);

    graphics.moveTo(0, gameHeight/2);
    graphics.lineTo(gameWidth, gameHeight/2);

    graphics.strokePath();

    graphics.closePath();      
}
    
function update(){
            
}

