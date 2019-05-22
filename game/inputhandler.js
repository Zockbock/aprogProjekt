class InputHandler {
    constructor(context){

        this.keyUp = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyLeft = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.keyAUp = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyADown = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyALeft = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyARight = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    
    keydown(input){
        switch(input[0]){
            case 'u':
                return this.keyUp.isDown || this.keyAUp.isDown;
                
            case 'd':
                return this.keyDown.isDown || this.keyADown.isDown;

            case 'l':
                return this.keyLeft.isDown || this.keyALeft.isDown;

            case 'r':
                return this.keyRight.isDown || this.keyARight.isDown;
        }

        return false;
    }

    testfunc(){
        console.log("wow!");
    }
}