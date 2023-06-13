class GameOver2 extends Phaser.Scene {
    constructor(){
        super("gameOverScene2");

        this.VEL = 100;
    }

    preload(){
        this.load.image('caught', './assets/caught.png')
    }
    create(){
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'caught').setOrigin(0)
        this.add.text(25,50,'Game Over',menuText)
        this.add.text(25, 100, 'You were spotted by the farmer', subText)
        this.add.text(25,125, 'try to run behind his back next time', subText)
        this.add.text(25, 200, 'Press R to Restart', subText)

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene")
        }
    }
}