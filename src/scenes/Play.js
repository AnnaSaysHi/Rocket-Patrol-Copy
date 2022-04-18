class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }
  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('ufo', './assets/ufo.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfieldH', './assets/starfieldtop.png');
    this.load.image('starfieldM', './assets/starfieldmiddle.png');
    this.load.image('starfieldL', './assets/starfieldbottom.png');
    this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
  }
  create() {
    // place tile sprite
    this.starfield1 = this.add.tileSprite(0, 0, 640, 160, 'starfieldH').setOrigin(0, 0);
    this.starfield2 = this.add.tileSprite(0, 160, 640, 160, 'starfieldM').setOrigin(0, 0);
    this.starfield3 = this.add.tileSprite(0, 320, 640, 160, 'starfieldL').setOrigin(0, 0);
    // green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

    // white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
    // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    // add rocket (p1 and p2)
    this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding, 'rocket', 0, 0, keyA, keyD, keyF).setOrigin(0.5, 0);
    this.p2Rocket = new Rocket(this, 2 * game.config.width/3, game.config.height - borderUISize - borderPadding, 'rocket', 0, 1, keyLEFT, keyRIGHT, keySPACE).setOrigin(0.5, 0);

    // add spaceships (x3) and UFO
    this.ship01 = new Spaceship(this, game.config.width - borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width - borderUISize*6, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width - borderUISize*9, borderUISize*7 + borderPadding*6, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0,0);
    this.ufo = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4, 'ufo', 0, 50, game.settings.spaceshipSpeed * 2).setOrigin(0,0);

    // animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
      frameRate: 30
    });

    this.p1Score = 0;
    this.p2Score = 0;
    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
      fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - 100, borderUISize + borderPadding * 2, this.p2Score, scoreConfig);
    this.scoreCTR = this.add.text((game.config.width - scoreConfig.fixedWidth)/2, borderUISize + borderPadding*2, "", scoreConfig);
    this.p1time = 60;
    this.timeLeft = 60;
    this.gameOver = false;


    //scoreConfig.fixedWidth = 0;
    this.startTime = Date.now();

  }

  update() {

    //FIRE! text
    if(Phaser.Input.Keyboard.JustDown(this.p1Rocket.keyFire) && !this.p1Rocket.isFiring){
      this.scoreLeft.text = "FIRE!";
      this.clock = this.time.delayedCall(1000, () => {
        this.scoreLeft.text = this.p1Score;
      }, null, this);
      this.p1Rocket.isFiring = true;
      this.p1Rocket.sfxRocket.play();
    }
    if(Phaser.Input.Keyboard.JustDown(this.p2Rocket.keyFire) && !this.p2Rocket.isFiring){
      this.scoreRight.text = "FIRE!";
      this.clock = this.time.delayedCall(1000, () => {
        this.scoreRight.text = this.p2Score;
      }, null, this);
      this.p2Rocket.isFiring = true;
      this.p2Rocket.sfxRocket.play();
    }

    if(this.timeleft <= 0){
      this.timeleft = 0;
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
        fixedWidth: 0
      }

      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }
    this.starfield1.tilePositionX -= 1;
    this.starfield2.tilePositionX -= 2;
    this.starfield3.tilePositionX -= 4;
    if(!this.gameOver){
      this.p1Rocket.update();
      this.p2Rocket.update();
      this.ship01.update();
      this.ship02.update();
      this.ship03.update();
      this.ufo.update();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    //clock functionality
    this.timeleft = Math.floor((this.p1time*1000 - (Date.now() - this.startTime))/1000);
    if (Date.now() - this.startTime > 30000){
      this.ship01.moveSpeed = game.settings.spaceshipSpeed + 2;
      this.ship02.moveSpeed = game.settings.spaceshipSpeed + 2;
      this.ship03.moveSpeed = game.settings.spaceshipSpeed + 2;
    }
    //clock text
    if(this.timeleft < 0){
      this.timeleft = 0;
    }
    if(this.timeleft % 60 < 10){
      this.scoreCTR.text = (Math.floor(this.timeleft/60) + ':0' + (this.timeleft % 60));
    }
    else{
      this.scoreCTR.text = (Math.floor(this.timeleft/60) + ':' + (this.timeleft % 60));
    }

    // check collisions

    if(this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03, 0);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02, 0);
      }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01, 0);
    }
    if(this.checkCollision(this.p2Rocket, this.ship03)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship03, 1);
    }
    if (this.checkCollision(this.p2Rocket, this.ship02)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship02, 1);
      }
    if (this.checkCollision(this.p2Rocket, this.ship01)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship01, 1);
    }
    if(this.checkCollision(this.p1Rocket, this.ufo)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ufo, 0);
    }
    if(this.checkCollision(this.p2Rocket, this.ufo)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ufo, 1);
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
      return true;
    } else {
      return false;
    }
  }
  shipExplode(ship, player) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });
    if(player){
      this.p2Score += ship.points;
      this.scoreRight.text = this.p2Score;
    }else{
      this.p1Score += ship.points;
      this.scoreLeft.text = this.p1Score;  
    } 
    this.sound.play('sfx_explosion');   
  }
}