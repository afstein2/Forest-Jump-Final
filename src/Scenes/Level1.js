/**
 * Level1.js — First platforming level.
 *
 * Extends the Platformer base scene and fills in the template methods
 * with Level 1 specific data: which tilemap to load, what objects exist,
 * where water zones are, and VFX emitter positions.
 *
 * When the player reaches the flag, the game transitions to Level 2.
 */

class Level1 extends Platformer {
    constructor() {
        super("platformerScene");
    }

    setupMap() {
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 45, 25);
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");
        this.cameras.main.setBackgroundColor('#73bde2');

        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.groundLayer.setScale(this.SCALE);

        const spawnObj = this.map.getObjectLayer("Objects").objects.find(o => o.name === "spawn");
        if (spawnObj) {
            this.playerStart = { x: spawnObj.x * this.SCALE, y: spawnObj.y * this.SCALE };
        } else {
            this.playerStart = { x: game.config.width / 4, y: 930 };
        }

    }


    setupObjects() {
        super.setupObjects();
        this.setupWaterZones([
            { x: 2150, barrierY: 1080, zoneY: 1000, width: 380, height: 120 }
        ]);
    }

    setupVFX() {
        super.setupVFX();
        my.vfx.water.destroy();
        my.vfx.water = this.createBubbleEmitter(2000, 2300);
        if (this.waterZones.length === 1) {
            this.zoneEmitterMap.set(this.waterZones[0], my.vfx.water);
        }
    }

    

    onLevelComplete() {
        my.scoreCarryOver = true;
        this.scene.start("platformerScene2");
    }
}