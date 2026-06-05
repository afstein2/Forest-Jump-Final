/**
 * Allie Stein
 * 
 * Platformer implementation - Final
 * 
 * Forest Jump
 * 
 */

/**
 * main.js — Phaser game configuration and boot.
 *
 * Creates the Phaser.Game instance with all scene classes and the
 * rendering / scaling settings described in the design document.
 */

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },

    backgroundColor: '#73bde2', // Set Background
    physics: {
        default: 'arcade',
        arcade: {
            debug: true, // <------------------------------------ CHANGE TO FALSE WHEN DONE!!!
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    width: 1920, // (Default: 1920, 944), (1420, 944), (1280, 944)
    height: 944,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [StartScreen, Load, Platformer, Level1, Level2, Level3, WinScene, PauseMenu, Settings, Controls]
}

const game = new Phaser.Game(config);

// globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const W = game.config.width;
const H = game.config.height;

var cursors;
var my = {
    sprite: {},
    text: {},
    vfx: {},
    settings: { fps: false }, 
    savedScore: 0 
};