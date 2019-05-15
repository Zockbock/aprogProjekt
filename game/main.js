window.onload = () => {
    
}

let gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        //parent: "game",
        scene:{
            preload: preload,
            create: create,
            update: update
        }
    };

let game = Phaser.Game(gameConfig);

function preload(){

}

function create(){

}

function update(){
    
}