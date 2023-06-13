class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('opening', './assets/opening.png')
    }
    
    create(){
        //initialize keyboard inputs
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        //set up background and text for menu
        this.bg = this.add.image(gameWidth/2, gameHeight/2, 'opening').setOrigin(0)
        this.titleText = this.add.text(90, 50, 'Grave of the Fireflies', menuText)
        this.titleStart = this.add.text(110, 90, 'Press S to start', subText)
        this.titleCred = this.add.text(110, 120, 'Press C to view Credits', subText)
        this.instructCred = this.add.text(110, 140, 'Press I to view Instructions', subText)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("escapeScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("creditScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyI)){
            this.scene.start("instructionScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyQ)){
            this.scene.start("winScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start("transitionScene");
        }
    }
}