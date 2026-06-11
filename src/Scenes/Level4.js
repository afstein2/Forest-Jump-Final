/**
 * Level4.js 
 */

class Level4 extends Platformer {
    constructor() {
        super("platformerScene4");
    }


    init () {
        super.init();
        this.showClouds = false;
        this.showClouds2 = true;
        this.canHighJump = true;
    }

    create() {
        super.create();

        this.showClouds = false;

        const controlsText = this.add.text(
            game.config.width / 4.8, game.config.height / 1.3,
            'SHIFT+JUMP = High Jump', {
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
        

        if (this.showClouds2) {
            this.clouds = this.add.tileSprite(
                0,
                -this.scale.height * 0.6,
                this.scale.width * 1.2,
                this.scale.height * 3.7,
                'clouds'
            )
            .setOrigin(0, 0)
            .setDepth(-1)
            //.setScrollFactor(1)
            .setScale(1);

            this.clouds.tileScaleX = 0.4;
            this.clouds.tileScaleY = 0.4;
        }


    }

    setupMap() {
        this.map = this.add.tilemap("platformer-level-4", 18, 18, 45, 25); 
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");
        this.cameras.main.setBackgroundColor('#73bde2');

        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        
        console.log(this.map.getObjectLayer("Objects"));
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.groundLayer.setScale(this.SCALE);
    }

    onLevelComplete() {
        my.scoreCarryOver = true;
        my.score = this.score;
        this.scene.start("winScene");
    }

    update() {

        super.update();

        /*╭─────────────────────────────────────────────────────╮
        * │ UI/Cloud Updates                                    │
        * ╰─────────────────────────────────────────────────────╯ */
        if (this.showClouds2) {
            this.clouds.tilePositionX = this.cameras.main.scrollX * 0.1;
        }

        if (my.settings.fps && this.fpsText) {
            this.fpsText.setText(`FPS: ${Math.floor(this.game.loop.actualFps)}`);
        }

        if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
            this.scene.pause();
            this.scene.launch('pauseScene');
        }
    }
}