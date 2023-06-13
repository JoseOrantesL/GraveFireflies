class GameOver2 extends Phaser.Scene {
    constructor(){
        super("gameOverScene2");

        this.VEL = 100;
    }

    preload(){
        this.load.image('screen', './assets/caught.png')
    }
    create(){
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'screen').setOrigin(0)
        this.add.text(100,50,'Game Over',menuText)
        this.add.text(100, 150, 'Press R to Restart', subText)

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene")
        }
    }
}