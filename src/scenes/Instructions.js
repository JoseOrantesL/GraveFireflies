class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }

    preload(){
        this.load.image('bg', './assets/instructions.png')
    }
    create(){
        //initialize keyboard input
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        //load background and text
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'bg').setOrigin(0)
        this.add.text(15, 20, 'First Scene - Use arrow keys to move.',subText)
        this.add.text(25, 40,'Escape the town before its too late', subText)
        this.add.text(15, 70, 'Second Scene - Use arrow keys to move.', subText)
        this.add.text(25, 90, 'Look for Setsuko for further instructions', subText)
        this.add.text(15, 120, 'Third Scene - Use arrow keys to move', subText)
        this.add.text(25, 140, 'Space bar to Interact when needed', subText)



        this.add.text(90, 200, 'Press B to go back to Main Menu', credText)
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyB)){
            this.scene.start("menuScene");
        }
    }
}