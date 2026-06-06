/**
 * Level2.js — Second (and final) platforming level.
 *
 * Similar to Level1 but loads a different tilemap, has two water zones,
 * different bubble VFX positions, and transitions to the Win scene when
 * the player reaches the flag.
 */

class Level2 extends Platformer {
    constructor() {
        super("platformerScene2");
    }

    setupMap() {
        this.map = this.add.tilemap("platformer-level-2", 18, 18, 45, 25);
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");
        this.cameras.main.setBackgroundColor('#73bde2');

        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        
        console.log(this.map.getObjectLayer("Objects"));
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.groundLayer.setScale(this.SCALE);
    }

    setupObjects() {
        super.setupObjects();
        this.setupWaterZones([
            { x: 1550, barrierY: 1080, zoneY: 1000, width: 380, height: 120 },
            { x: 2150, barrierY: 1080, zoneY: 1000, width: 380, height: 120 }
        ]);

        const caveObj = this.map.getObjectLayer("Objects").objects.find(o => o.name === "enterCave");
        if (caveObj) {
            this.caveZone = this.add.zone(caveObj.x * this.SCALE, caveObj.y * this.SCALE, 18 * this.SCALE, 18 * this.SCALE);
            this.physics.world.enable(this.caveZone);
            this.caveZone.body.setAllowGravity(false);
            this.caveZone.body.setImmovable(true);
            this.caveZone.body.moves = false;
        }
    }

    setupVFX() {
        super.setupVFX();
        const emitter1 = this.createBubbleEmitter(1400, 1700);
        const emitter2 = this.createBubbleEmitter(2000, 2300);


        const createBubbleEmitterIndicator = (xMin, xMax) => {
            return this.add.particles(0, 0, "kenny-particles", {
                frame: "light_01.png",
                x: { min: xMin, max: xMax },
                y: { min: 1050, max: 1000 },
                lifespan: 800,
                speedY: { min: -100, max: -60 },
                speedX: { min: -10, max: 10 },
                scale: { start: 0.08, end: 0 },
                //alpha: { start: 0.8, end: 0 },
                tint: 0xbf00ff, // red
                quantity: 1,
                frequency: 80,
                blendMode: 'ADD',
                emitting: true
            });
        };

        const emitter3 = createBubbleEmitterIndicator(1735, 1740);






        my.vfx.water = [emitter1, emitter2];
        if (this.waterZones.length >= 2) {
            this.zoneEmitterMap.set(this.waterZones[0], emitter1);
            this.zoneEmitterMap.set(this.waterZones[1], emitter2);
            //this.zoneEmitterMap.set(this.waterZones[2], emitter3);
        }
    }

    setupPlayer() {
        super.setupPlayer();
        if (this.caveZone) {
            this.physics.add.overlap(my.sprite.player, this.caveZone, () => {
                console.log("triggered cave entrance");
                this.scene.start("caveLevelScene");
            });
        }
    }


    onLevelComplete() {
        my.scoreCarryOver = true;
        my.score = this.score;
        this.scene.start("platformerScene3");
    }
}