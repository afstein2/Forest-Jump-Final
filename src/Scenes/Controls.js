// class Controls extends Phaser.Scene {
//     constructor() {
//         super("controlsScene");
//     }

//     create() {

//         this.cameras.main.setBackgroundColor('#73bde2');

//         // Title
//         this.add.text(centerX, centerY - 250, 'CONTROLS', {
//             fontSize: '64px',
//             fill: '#ffffff',
//             fontStyle: 'bold'
//         }).setOrigin(0.5);

//         // Panel
//         const panelWidth = 650;
//         const panelHeight = 420;

//         const panel = this.add.graphics();

//         panel.fillStyle(0x000000, 0.5);

//         panel.fillRoundedRect(
//             centerX - panelWidth / 2,
//             centerY - panelHeight / 2,
//             panelWidth,
//             panelHeight,
//             24
//         );

//         // Controls text
//         const controlsText = [

//             'A / LEFT ARROW  -  Move Left',
//             'D / RIGHT ARROW -  Move Right',
//             'SPACE / UP      -  Jump',
//             'P                -  Pause',
//             'R                -  Restart Level'

//         ];

//         controlsText.forEach((text, index) => {

//             this.add.text(
//                 centerX - 300,
//                 centerY - 160 + index * 60,
//                 text,
//                 {
//                     fontSize: '28px',
//                     fill: '#ffffff'
//                 }
//             )

//         });

//         // Back button
//         this.createButton(
//             centerX,
//             centerY + 280,
//             'Back',
//             () => {
//                 this.scene.start('startScene');
//             }
//         );
//     }

//     createButton(x, y, label, callback) {

//         const width = 250;
//         const height = 60;
//         const radius = 20;

//         const btn = this.add.graphics();

//         const drawBtn = (color, alpha) => {

//             btn.clear();

//             btn.fillStyle(color, alpha);

//             btn.fillRoundedRect(
//                 x - width / 2,
//                 y - height / 2,
//                 width,
//                 height,
//                 radius
//             );
//         };

//         drawBtn(0x000000, 0.5);

//         const hitArea = this.add.rectangle(
//             x,
//             y,
//             width,
//             height,
//             0xffffff,
//             0
//         )
//         .setInteractive()
//         .setOrigin(0.5);

//         const text = this.add.text(x, y, label, {
//             fontSize: '28px',
//             fill: '#ffffff'
//         }).setOrigin(0.5);

//         hitArea.on('pointerover', () => {

//             drawBtn(0xffffff, 0.3);

//             text.setStyle({
//                 fontSize: '30px'
//             });

//         });

//         hitArea.on('pointerout', () => {

//             drawBtn(0x000000, 0.5);

//             text.setStyle({
//                 fontSize: '28px'
//             });

//         });

//         hitArea.on('pointerdown', callback);
//     }
// }


/**
 * Controls.js — Displays the keyboard controls for the game.
 *
 * Shows all key bindings in a centred panel with a Back button
 * that returns to the Start Screen.
 */
class Controls extends Phaser.Scene {
    constructor() {
        super('controlsScene');
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Title
        this.add.text(w / 2, h / 5, 'Controls', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
        }).setOrigin(0.5);


        // Panel
        const panelWidth = 650;
        const panelHeight = 420;

        const panel = this.add.graphics();

        panel.fillStyle(0x000000, 0.5);

        panel.fillRoundedRect(
            centerX - panelWidth / 2,
            centerY - panelHeight / 2,
            panelWidth,
            panelHeight,
            24
        );

        // Key binding list
        const bindings = [
            ['A / ←', 'Move left'],
            ['D / →', 'Move right'],
            ['Space / ↑ / W', 'Jump'],
            ['P', 'Pause'],
            ['R', 'Restart level'],
            ['O', 'Debug physics'],
            ['F', 'Fullscreen (pause menu)'],
        ];

        const startY = h / 3 + 20;
        bindings.forEach((binding, i) => {
            const y = startY + i * 50;
            // Key name (left column)
            this.add.text(w / 2 - 200, y, binding[0], {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffff88',
            }).setOrigin(0.5);
            // Description (right column)
            this.add.text(w / 2 + 100, y, binding[1], {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
            }).setOrigin(0.5);
        });

        // Back button → return to title
        ButtonUI.create(this, w / 2, h - 120, 'Back', () => {
            this.scene.start('startScene');
        });
    }
}