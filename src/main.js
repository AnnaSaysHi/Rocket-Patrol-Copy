/*
Modified Rocket Patrol, v2.0 by Anna says hi
4/17/2022

Points breakdown:
5 pts: 'FIRE!' UI text
5 pts: Speed up after 30 seconds
5 pts: Random spaceship direction
5 pts: Controllable rocket post-firing

10 pts: Visible clock
10 pts: Parallax background

20 pts: New enemy with new graphics

30 pts: Simultaneous 2-player

Total so far: 90 pts
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