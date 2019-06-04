/**
 * The Player Class
 * @calssdesc A movable player using the scenes inputhandler.
 * Based on the Entity class.
 * @author Ben Krueger
 */
class Player extends Entity {
    constructor(scene, skins, parms){
        
        super(scene, skins, parms);
    }

    /**
     * Updates the player.
     * 
     */
    update(){
        this.move(this.scalarMult(this.movespeed, this.normalizeVector(this.getInputVector())));

        this.update_pos();
        this.update_visuals();
    }

    /**
     * Reads the movement inputs from this scenes inputhandler and
     * returns it as a vector.
     */
    getInputVector(){
        let v = [0,0];

        if(this.scene.inputHandler.keydown('up'))   v[1] += -1;
        if(this.scene.inputHandler.keydown('down')) v[1] += 1;
        if(this.scene.inputHandler.keydown('left')) v[0] += -1;
        if(this.scene.inputHandler.keydown('right')) v[0] += 1;

        return v;
    }

    /**
     * Normalizes a vector.
     */
    normalizeVector(v){
        // vector norm
        let norm = Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2));
        if(norm == 0) return [0, 0];

        // return normalized vector
        return [v[0] * (1/norm), v[1] * (1/norm)];
    }

    scalarMult(s, v){
        return [v[0] * s, v[1] * s];
    }
}