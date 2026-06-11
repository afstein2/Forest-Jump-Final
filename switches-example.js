class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 1500;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 2000;
        this.JUMP_VELOCITY = -650;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
    }

    preload() {
        // Load the animated tiles plugin
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 45, 25);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");

        // Create a layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });


        // 
        // COINS
        //

        // Create coins from Objects layer in tilemap
        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });

        // Create animation for coins created from Object layer
        this.anims.create({
            key: 'coinAnim', // Animation key
            frames: this.anims.generateFrameNumbers('tilemap_sheet', 
                {start: 151, end: 152}
            ),
            frameRate: 2,  // Higher is faster
            repeat: -1      // Loop the animation indefinitely
        });

        // Play the same animation for every memeber of the Object coins array
        this.anims.play('coinAnim', this.coins);

        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);

        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.coinGroup = this.add.group(this.coins);


        //
        // Switch-controlled items
        //

        // left-switchable
        this.leftSwitchable = this.groundLayer.filterTiles((tile) => {
            if (tile.properties.switchable == "left") {
                return true;
            } else {
                return false;
            }
        });

        // set to invisible -- switch will control visibility
        for (let tile of this.leftSwitchable) {
            tile.visible = false;
        }

        // right-switchable
        this.rightSwitchable = this.groundLayer.filterTiles((tile) => {
            if (tile.properties.switchable == "right") {
                return true;
            } else {
                return false;
            }
        });

        // set to invisible -- switch will control visibility
        for (let tile of this.rightSwitchable) {
            tile.visible = false;
        }

        this.switchCollisionOngoing = false;

        // Checks to for conditions under which 
        // collision detection won't run
        let collisionProcess = (obj1, obj2) => {
            // One way collisions
            if (obj2.properties.oneway && my.sprite.body.velocity.y < 0) {
                return false;
            } 
            
            // Invisible tiles don't affect the player
            if (!obj2.visible) {
                return false;
            }

            // Handle intersection with the switch
            // Look for moving left to right (-->)
            if (obj2.properties.switch
                && my.sprite.player.body.acceleration.x > 0) {
                        obj2.index = 67; // left leaning switch tile
                        for (let tile of this.leftSwitchable) {
                            tile.visible = true;
                        }
                        for (let tile of this.rightSwitchable) {
                            tile.visible = false;
                        }
                        return false;
                }

            // Handle intersection with the switch
            // Look for moving right to left (<--)
            if (obj2.properties.switch 
                && my.sprite.player.body.acceleration.x < 0) {
                        obj2.index = 65; // right leaning switch tile
                        for (let tile of this.leftSwitchable) {
                            tile.visible = false;
                        }
                        for (let tile of this.rightSwitchable) {
                            tile.visible = true;
                        }
                        return false;
                }

            return true;

        }

        // Handles collisions based on tile property values
        let propertyCollider = (obj1, obj2) => {

            // Handle intersection with dangerous tiles
            if (obj2.properties.danger) {
                // Collided with a danger tile, handle collision
                my.sprite.player.x = 30;
                my.sprite.player.y = 345;
            }

        }

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(30, 345, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        // Parameters are:
        // obj1 or group1 : the sprite or group that is first party to collision
        // obj2 or group2 : the sprite or group that is second party to collision
        // collision handler : a function called upon detected collision
        // process handler : a function that determines if the collision handler is called
        this.physics.add.collider(my.sprite.player, this.groundLayer, 
            propertyCollider, collisionProcess);

        // Handle collision between player and coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            // add particle effect here...
            obj2.destroy(); 
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // Simple camera to follow player
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);
        
        // Initialize the animated tiles plugin
        // This line needs to come *after* any line which creates a tilemap layer.
        // Putting this at the end of create() is a safe place
        this.animatedTiles.init(this.map);

    }

    update() {
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here

        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            // TODO: have the vfx stop playing
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }
    }
}