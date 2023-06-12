class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload(){
        this.load.image('background', './assets/credits.png')
    }
    create(){
        //initialize keyboard input
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        //load background and text
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'background').setOrigin(0)
        this.add.text(15, 20, 'Movie: Grave of the Fireflies, Isao Takahata, Studio Ghibli, 1989', credText)
        this.add.text(15, 50, 'Tilemap sprites: https://kale-game.itch.io/2d-pixel-art Author: Kale Game', credText)
        this.add.text(15, 90, 'Alarm sfx, 1st scene: https://www.youtube.com/watch?v=GToHq7YAq_g', credText)
        this.add.text(15,110, 'Author: All Sound Effects Music & Films', credText)

        this.add.text(90, 200, 'Press B to go back to Main Menu', credText)
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyB)){
            this.scene.start("menuScene");
        }
    }
}