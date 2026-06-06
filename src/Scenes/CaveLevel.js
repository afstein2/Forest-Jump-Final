/**
 * CaveLevel.js — Cave platforming level.
 *
 * Extends the Platformer base scene and fills in the template methods
 * with Cave level specific data: which tilemap to load, what objects exist,
 * where water zones are, and VFX emitter positions.
 *
 * When the player reaches the flag, the game transitions to Level 2.
 */

class CaveLevel extends Platformer {
    constructor() {
        super("caveLevelScene");
    }

    
    init () {
        super.init();
        this.showClouds = false;
    }

    setupCamera() {
        super.setupCamera();

        this.cameras.main.filters.internal.addVignette(0.5, 0.5, 0.7, 0.2);
        this.cameras.main.shake(400, 0.01);
    }

    setupMap() {
        this.map = this.add.tilemap("cave-level", 18, 18, 45, 25);

        this.tileset = this.map.addTilesetImage(
            "kenny_tilemap_packed",
            "tilemap_tiles"
        );

        this.tilesetIndustrial = this.map.addTilesetImage(
            "tilemap_industrial_packed",
            "industrial_tiles"
        );

        this.tilesetBlocks = this.map.addTilesetImage(
            "blocks_packed",
            "block_tiles"
        );

        this.cameras.main.setBackgroundColor('#837e7e');

        this.groundLayer = this.map.createLayer(
            "Ground-n-Platforms",
            [this.tileset, this.tilesetIndustrial, this.tilesetBlocks],
            0,
            0
        );

        this.groundLayer.setCollisionByProperty({ collides: true });
        this.groundLayer.setScale(this.SCALE);
    }


    setupObjects() {
        super.setupObjects();
        this.setupWaterZones([
            { x: 2150, barrierY: 1080, zoneY: 1000, width: 380, height: 120 }
        ]);
    }

    // Disable water VFX
    setupVFX() {
        super.setupVFX();
        my.vfx.water = null;
    }

    

    onLevelComplete() {
        my.scoreCarryOver = true;
        this.scene.start("platformerScene2");
    }
}