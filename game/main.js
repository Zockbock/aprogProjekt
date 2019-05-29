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
    scene:[
        CCMenu_Scene,
        CollectCoins_Scene
    ]
};        

let game = new Phaser.Game(gameConfig);

let coinscnt = 0;
let highscore = 0;

sendPostRequest('/highscore', {}, 'json', res => highscore = res.highscore);

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

