class Player extends Entity {
    constructor(scene, skins, parms){
        
        super(scene, skins, parms);
    }

    /**
     * Updates the player.
     * Must be called every frame.
     * Moves the player by reading the properties of 'inputhandler' and
     * updating the position accordingly.
     */
    update(){
        this.v_x = 0;
        this.v_y = 0;

        if(inputHandler.keydown('up')){
            this.v_y += -this.speed;
        }
        if(inputHandler.keydown('down')){
            this.v_y += this.speed;
        }
        if(inputHandler.keydown('left')){
            this.v_x += -this.speed;
        }
        if(inputHandler.keydown('right')){
            this.v_x += this.speed;
        }

        this.x += this.v_x;
        this.y += this.v_y;

        if (this.v_x < this.min_v) this.v_x = 0;
        if (this.v_y < this.min_v) this.v_y = 0;

        this.update_visuals();
    }
}