class Coin extends Entity {
    constructor(scene, parms={}){
        super(scene, [{char:'©', color: '#dab420'}], parms);

        scene.physics.add.overlap(player.collider, this.collider, this.collected);
    }

    update(){
        
        this.update_visuals();
    }

    collected(player, col_coin){
        col_coin.entity.destroy();
        coin = null;
    }
}