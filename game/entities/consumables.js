/**
 * @classdesc A coin that can be picked up by the player.
 * Increases the global coinscnt variable by 1 whne piced up.
 * @author Ben Krueger
 */
class Coin extends Entity {
    constructor(scene, parms={}){
        super(scene, [{char:'©', color: '#dab420'}], parms);

        scene.physics.add.overlap(this.scene.player.collider, this.collider, this.collected);

        this.skins[0].setOrigin(0.5, 0.5);
        this.collider.displayHeight = 14;

        this.got_collected = false;
    }

    update(){
        
        this.update_visuals();
    }

    /**
     * Callback function for collision event with the Player.
     * 
     * Sets its state to collected and destroys the Coin.
     * Increases the collected coins cont (coinscnt) by one.
     * @param {*} player the collider of the Player
     * @param {*} col_coin the collider if the Coin
     */
    collected(player, col_coin){
        col_coin.entity.got_collected = true;
        col_coin.entity.destroy();

        coinscnt++;
    }
}

/**
 * @classdesc A Coinspawner that creates and holds references to coins in its scene.
 * @author Ben Krueger
 */
class Coinspawner {
    constructor(scene, max_coins, max_spawndelay=60, min_spawndelay=100) {
        this.scene = scene;

        this.max_coins = max_coins;
        this.max_spawndelay = max_spawndelay;
        this.min_spawndelay = min_spawndelay;
        this.spawndelay = 0;

        this.coins = new Array();
    }

    spawncoin() {
        let pos = {x: 75 + Math.random() * (gameWidth - 150), y: 75 + Math.random() * (gameHeight - 150)};

        this.coins.push(new Coin(this.scene, pos));
    }

    update() {
        this.coins = this.coins.filter(c => !c.got_collected);

        if(this.coins.length < this.max_coins && this.spawndelay <= 0){
            this.spawncoin();

            this.spawndelay = this.min_spawndelay + Math.random() * (this.max_spawndelay - this.min_spawndelay);
        }

        if(this.coins.length < this.max_coins) this.spawndelay -= 1;
    }
}