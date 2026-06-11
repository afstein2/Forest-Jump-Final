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
        this.canHighJump = true;
        this.canDashAbility = true;
    }

    setupCamera() {
        super.setupCamera();

        this.cameras.main.filters.internal.addVignette(0.5, 0.5, 0.7, 0.3);
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

        const caveExitObj = this.map.getObjectLayer("Objects").objects.find(o => o.name === "caveExit");
        if (caveExitObj) {
            this.caveExitZone = this.add.zone(caveExitObj.x * this.SCALE, caveExitObj.y * this.SCALE, 18 * this.SCALE, 18 * this.SCALE);
            this.physics.world.enable(this.caveExitZone);
            this.caveExitZone.body.setAllowGravity(false);
            this.caveExitZone.body.setImmovable(true);
            this.caveExitZone.body.moves = false;
        }
    }

    // Disable water VFX
    setupVFX() {
        super.setupVFX();
        my.vfx.water = null;
    }


    setupPlayer() {
        super.setupPlayer();

        if (this.caveExitZone) {
            this.physics.add.overlap(my.sprite.player, this.caveExitZone, () => {
                console.log("triggered cave exit");
                my.spawnAtCaveExit = true;
                this.scene.start("platformerScene2");
            });
        }

        const controlsText = this.add.text(
            game.config.width / 4.8, game.config.height / 1.3,
            'SHIFT+JUMP = High Jump | L = Dash', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setScrollFactor(0).setDepth(200).setScale(1);

        this.tweens.add({
            targets: controlsText,
            alpha: 0,
            delay: 3000,
            duration: 1000,
            onComplete: () => controlsText.destroy()
        });
    }

    

    onLevelComplete() {
        my.scoreCarryOver = true;
        this.scene.start("platformerScene2");
    }
}