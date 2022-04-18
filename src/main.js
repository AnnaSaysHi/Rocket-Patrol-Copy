/*
Points breakdown:
5 pts: 'FIRE!' UI text
5 pts: Speed up after 30 seconds
5 pts: Random spaceship direction
5 pts: Controllable rocket post-firing

10 pts: Visible clock

20 pts: New enemy with new graphics

30 pts: Simultaneous 2-player

Total so far: 80 pts
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

//reserve keyboard vars
let keyF, keyR, keyA, keyD, keyLEFT, keyRIGHT, keySPACE;

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;