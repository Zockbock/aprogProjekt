/**
 * Entity Class.
 * @classdesc The parent for every moving Object in the game.
 */

class Entity {
    /**
     * @constructor
     * @param  {Scene} scene
     * @param  {Array} skins
     * @param  {Object} parms={}
     */
    constructor(scene, skins, parms={}) {
        this.scene = scene;

        this.x = (parms.x !== undefined) ? parms.x : 10;
        this.y = (parms.y !== undefined) ? parms.y : 10;
        
        this.speed = (parms.speed !== undefined) ? parms.speed : 1;
        this.v_x = 0;
        this.v_y = 0;

        let col_width = (parms.col_width !== undefined) ? parms.col_width : 10;
        let col_height = (parms.col_height !== undefined) ? parms.col_height : 20;
        
        // collider
        this.rect = scene.add.zone(this.x, this.y, col_width, col_height);//.setStrokeStyle(1, 0xff0000);
        this.rect.entity = this;
        
        this.collider = scene.physics.add.existing(this.rect);
        
        
        // skins
        this.skins = new Array();

        // create text objects for skin layers
        for(let s of skins){
            let skin = scene.add.text(0, 0, s.char, {fontFamily: "Consolas", fontSize: 20, color:s.color});
            this.skins.push(skin);
        }

        for(let s of this.skins){
            //s.setOrigin(0.5, 1);
            s.setOrigin(0.5, 0.5);
            s.x = this.x;
            s.y = this.y;
        }
        
        //console.log('New Eintity: ', this);
    }

    setpos(n_x, n_y) {
        this.x = n_x;
        this.y = n_y;
    }

    update() {
        this.update_visuals();
    }
    
    update_visuals() {
        // update char/visual position
        this.skins.forEach((v) => {
            v.x = this.x;
            v.y = this.y;
        });

        this.rect.x = this.x;
        this.rect.y = this.y;
    }

    destroy(callback=()=>{}) {
        for(let s of this.skins){
            s.destroy();
        }
        this.collider.destroy();
        this.rect.destroy();

        callback();
    }
}