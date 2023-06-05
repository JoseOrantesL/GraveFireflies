class GameOver extends Phaser.Scene {
    constructor(){
        super("gameOverScene");

        this.VEL = 100;
    }
    create(){
        this.add.text(100,100,'Game Over',{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        this.add.text(100, 150, 'Press R to Restart', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("escapeScene")
        }
    }
}