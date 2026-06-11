/**
 * Level3.js
 */

class Level3 extends Platformer {
    constructor() {
        super("platformerScene3");
    }

    setupMap() {
        this.map = this.add.tilemap("platformer-level-3", 18, 18, 45, 25); 
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
            { x: 1860, barrierY: 1080, zoneY: 1000, width: 320, height: 120 }
            //{ x: 2150, barrierY: 1080, zoneY: 1000, width: 380, height: 120 }
        ]);
    }

    setupVFX() {
            super.setupVFX();
            const emitter1 = this.createBubbleEmitter(1700, 2000);

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


            my.vfx.water = [emitter1];
            if (this.waterZones.length >= 1) {
                this.zoneEmitterMap.set(this.waterZones[0], emitter1);
                //this.zoneEmitterMap.set(this.waterZones[2], emitter3);
            }
        }


    onLevelComplete() {
        my.scoreCarryOver = true;
        my.score = this.score;
        this.scene.start("platformerScene4");
    }
}