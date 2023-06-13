class Winner extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    preload(){
        this.load.image('win', './assets/ending.png')
    }
    create(){
        //initialize keyboard input
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //load background and text
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'win').setOrigin(0)
        this.add.text(50, 20, 'The End', menuText)

        this.add.text(90, 200, 'Press R to return to Main Menu', credText)
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene");
        }
    }
}