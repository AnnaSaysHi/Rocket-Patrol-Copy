// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, plNo, keyLF, keyRG, keyFR) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.keyLft = keyLF;
        this.keyRgh = keyRG;
        this.keyFire = keyFR;
        this.player = plNo; //0 = player 1 (wasd + f), 1 = player 2 (arrows + spacebar)
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.sfxRocket.play();
    }

    update() {
        if(!this.isFiring) {
            if(this.keyLft.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            }else if(this.keyRgh.isDown && this.x <= game.config.width - borderUISize + this.width){
                this.x += this.moveSpeed;
            }
            if(Phaser.Input.Keyboard.JustDown(this.keyFire) && !this.isFiring){
                this.sfxRocket.play();
                this.isFiring = true;
            }
        
        }

        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}