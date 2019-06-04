/**
 * Entity Class.
 * @classdesc The parent for every moving Object in the game.
 * @author Ben Krueger
 */

class Entity {
    /**
     * Constructor of class Entity.
     * @constructor
     * @param  {Scene} scene The scene this entity exists in. 
     * @param  {Object[]} skins The Visual component of the entity in reversed render order. e.g.: [{char:'...', color:'#...'}, ...]
     * @param  {Object} parms={} Additional parameters.
     */
    constructor(scene, skins, parms={}){
        // add fields
        this.scene = scene;

        this.x = (parms.x !== undefined) ? parms.x : 0;
        this.y = (parms.y !== undefined) ? parms.y : 0;
        
        this.velocity = [0, 0];
        
        this.movespeed = (parms.movespeed !== undefined) ? parms.movespeed : 1;
        
        // collider setup
        let col_width = (parms.col_width !== undefined) ? parms.col_width : 10;
        let col_height = (parms.col_height !== undefined) ? parms.col_height : 20;

        let colliderbase;
        if(parms.showcollider === true){
            colliderbase = scene.add.rectangle(this.x, this.y, col_width, col_height).setStrokeStyle(1, 0x00FF00);
        } else {
            colliderbase = scene.add.zone(this.x, this.y, col_width, col_height);
        }
        colliderbase.setOrigin(0.5, 0.5);
        colliderbase.entity = this;

        this.collider = scene.physics.add.existing(colliderbase);
        this.collider.body.setCollideWorldBounds(true);

        // skins/visuals
        this.skins = new Array();

        // create text objects for skin layers
        for(let s of skins){
            let skin = scene.add.text(0, 0, s.char, {fontFamily: "Consolas", fontSize: 20, color:s.color});
            this.skins.push(skin);
        }

        // center the origin of the text objects and sync position
        for(let s of this.skins){
            s.setOrigin(0, 0);
            s.x = this.x;
            s.y = this.y;
        }
    }

    /**
     * Updates the entity.
     * Overwriten in subclasses for behaviour updates.
     * Updates the position and the visuals components of the entity by default.
     */
    update() {
        this.update_pos();
        this.update_visuals();
    }
    
    /**
     * Updates the position of the entity 
     * by setting its postion to the position of its collider.
     * Sets velocity to [0, 0].
     */
    update_pos() {
        this.collider.body.setVelocityX(this.velocity[0]);
        this.collider.body.setVelocityY(this.velocity[1]);

        this.x = this.collider.body.x;
        this.y = this.collider.body.y;

        this.velocity = [0, 0];
    }

    /**
     * Add a velocity vector to the velocity.
     * @param {Number[]} v additional velocity
     */
    move(v) {
        this.velocity[0] += v[0];
        this.velocity[1] += v[1];
    }

    /**
     * Updates the position of the visual components 
     * Used when position changes.
     */
    update_visuals() {
        this.skins.forEach((v) => {
            v.x = this.x;
            v.y = this.y;
        });
    }

    /**
     * Called when Entity should be removed from the Scene.
     * Reference must be cleared individually.
     * @param {Function} callback callback function
     */
    destroy(callback=()=>{}) {
        for(let s of this.skins){
            s.destroy();
        }
        this.collider.destroy();

        callback();
    }
}