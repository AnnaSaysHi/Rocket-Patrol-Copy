// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.points = pointValue;
        this.direction = 0; //0 = facing left, 1 = facing right
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        if (this.direction){
            this.x += this.moveSpeed;
            if(this.x >= game.config.width){
                this.x = 0 - this.width;
            }
        }else{
            this.x -= this.moveSpeed;

            if(this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        }
    }

    reset() {
        this.direction = Math.floor(2 * Math.random());
        if (this.direction){
            this.x = 0 - this.width;
            this.flipX = true;
        } else {
            this.x = game.config.width;
            this.flipX = false;
        }
    }

}