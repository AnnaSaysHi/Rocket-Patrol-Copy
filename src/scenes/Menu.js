class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select.wav');
      this.load.audio('sfx_explosion', './assets/explosion.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
      this.add.text(20, 20, "Rocket Patrol Menu");
      this.scene.start("playScene");
    }
  }