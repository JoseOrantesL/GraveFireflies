class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'bomb'); 

        this.parentScene = scene



        this.parentScene.add.existing(this)
        this.parentScene.Physics.add.existing(this)
        this.setImmovable(true)

        this.bombSpawn = true
    }

    update(){

    }
}