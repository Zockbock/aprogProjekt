class InputHandler {
    constructor(context){

        this.keyUp = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyLeft = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        console.log(this);
    }
    
    keydown(input){
        switch(input[0]){
            case 'u':
                return this.keyUp.isDown;
                
            case 'd':
                return this.keyDown.isDown;

            case 'l':
                return this.keyLeft.isDown;

            case 'r':
                return this.keyRight.isDown;
        }

        return false;
    }

    testfunc(){
        console.log("wow!");
    }
}