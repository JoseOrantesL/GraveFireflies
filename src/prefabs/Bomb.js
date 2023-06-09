class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'bomb'); 

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setImmovable(true)
    }

    update(){
        this.on('animationcomplete', this.delete)
    }
    delete(){
        console.log("bomb destroyed")
        this.destroy()
    }
}