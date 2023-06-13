class Transition extends Phaser.Scene {
    constructor() {
        super("transitionScene");
    }

    preload(){
        this.load.image('bg', './assets/transition.png')
    }
    create(){
        //initialize keyboard input
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //load background and text
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'bg').setOrigin(0)
        this.add.text(20, 20, 'No matter how much food you managed to give Setsuko,', credText)
        this.add.text(20, 40, 'she was unable to survive', credText)
        
        this.add.text(40, 100, 'Press R to continue', credText)
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("lastScene");
        }
    }
}