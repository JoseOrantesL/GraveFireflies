class LastScene extends Phaser.Scene {
    constructor(){
        super("lastScene");

        this.VEL = 100;
    }
    
    preload(){
        this.load.path = "./assets/";
        this.load.image('tilemapImage3', 'tilemap2.png');
        this.load.spritesheet('seita', 'seita.png', {
            frameWidth: 8,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON('JSONmap3', 'map03.json');
        this.load.image('firewood', 'firewood.png')
        this.load.image('doll', 'doll.png')
        this.load.image('fruitCan', 'fruitCan.png')
        this.load.image('coffin', 'coffin.png')
        this.load.spritesheet('fire3', 'fire.png', {
            frameHeight: 20,
            frameWidth: 20
        });
        this.load.audio('pick', 'pickup.mp3');
        this.load.audio("sad", "sad.mp3");
    }

    create(){
        //add sound fx to scene 3
        this.sfx = this.sound.add('pick', {volume: 0.05});
        this.music = this.sound.add('sad', {volume: 0.1, loop: true});
        this.music.play();

        //Create tilemap
        const map3 = this.add.tilemap('JSONmap3');
        const tileset = map3.addTilesetImage('tilemap', 'tilemapImage3');

        const background = map3.createLayer('Background', tileset, 0,0);
        const vertWall = map3.createLayer('VWalls', tileset, 0,0);
        const HorWall = map3.createLayer('HWalls', tileset, 0,0);
        const trees = map3.createLayer('Trees', tileset, 0,0).setDepth(10);

        //create player sprite and make it collidable
        this.seita = this.physics.add.sprite(60,420, 'seita', 0);
        this.seita.body.onCollide = true;

        //keep track of current items collected
        this.itemsCollected = 0

        //spawn doll item to collect
        this.doll = this.physics.add.sprite(50, 70, 'doll', 0);
        this.doll.setImmovable(true)
        this.doll.body.setCollideWorldBounds(true)

        //spawn firewood to collect
        this.wood = this.physics.add.sprite(500, 70, 'firewood', 0)
        this.wood.setImmovable(true)
        this.wood.body.setCollideWorldBounds(true)

        //spawn tin can to collect
        this.tinCan = this.physics.add.sprite(600, 450, 'fruitCan',0)
        this.tinCan.setImmovable(true)
        this.tinCan.body.setCollideWorldBounds(true)

        //spawn fire for ending animation
        this.fire3 = this.physics.add.sprite(355, 290, 'fire3', 0);
        this.fire3.setImmovable(true)
        this.fire3.body.setCollideWorldBounds(true)
        this.fire3.visible = false

        //spawn interactable coffin in the middle
        this.coffin = this.physics.add.sprite(355, 290, 'coffin', 0);
        this.coffin.setImmovable(true);

        //create animation
        this.anims.create ({
            key: 'stand3',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('seita', {
                start: 0,
                end: 0
            })
        })

        this.anims.create ({
            key: 'run3',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('seita', {
                start: 1,
                end: 0
            })
        })
        this.anims.create ({
            key: 'fire4',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fire3', {
                start: 0,
                end: 1
            })
        })
        
        //create instructional text for player 
        this.coffinText = this.add.text(305, 260, "I\'m not done collecting yet", gameText);
        this.coffinText.visible = false;

        this.dollText = this.add.text(30, 50, 'Press space to pick up doll', gameText)
        this.dollText.visible = false

        this.dollCollected = this.add.text(30,50, 'Doll Collected!', gameText)
        this.dollCollected.visible = false

        this.woodText = this.add.text(450, 30, 'Press space to pick up firewood', gameText)
        this.woodText.visible = false

        this.woodCollected = this.add.text(450, 50, 'Firewood Collected!', gameText)
        this.woodCollected.visible = false

        this.tinText = this.add.text(500, 450, 'Press space to pick up candy box', gameText)
        this.tinText.visible = false

        this.tinCollected = this.add.text(500, 450, 'Candy box Collected!', gameText)
        this.tinCollected.visible = false

        //collision checks
        trees.setCollisionByProperty({collides: true});
        vertWall.setCollisionByProperty({collides: true});
        HorWall.setCollisionByProperty({collides: true});

        this.physics.add.collider(this.seita, vertWall);
        this.physics.add.collider(this.seita, HorWall);
        this.physics.add.collider(this.seita, trees);
        this.physics.add.collider(this.seita, this.doll)
        this.physics.add.collider(this.seita, this.wood)

        this.physics.add.collider(this.seita, this.coffin, ()=>{
            
            if(this.itemsCollected != 3){
                this.coffinText.visible = true;
                this.time.delayedCall(2000, () =>{
                    this.coffinText.visible = false;
                })
            } else if(this.itemsCollected == 3){

                this.coffinText.setText("Press Space");
                this.coffinText.visible = true;
                this.time.delayedCall(2000, () =>{
                    this.coffinText.visible = false;
                })
            } 
        })

        //Make camera follow player
        this.cameras.main.setBounds(0,0, map3.widthInPixels, map3.heightInPixels);
        this.cameras.main.startFollow(this.seita, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map3.widthInPixels, map3.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        //Player movement
        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){
            this.seita.setFlip(true, false);
            this.direction.x = -1
            this.seita.flipX = true;
            this.seita.play("run3"); 
        }
        if(this.cursors.right.isDown){
            this.seita.resetFlip();
            this.direction.x = 1;
            this.seita.play("run3"); 

        }

        if(this.cursors.up.isDown){

            this.direction.y = -1
            this.seita.play("run3");  

        } 
        if(this.cursors.down.isDown){

            this.direction.y = 1;
            this.seita.play("run3"); 

        }

        this.direction.normalize();
        this.seita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
        
        //distance and interaction checks for the collectable items
        if(this.distance(this.seita, this.doll) < 20){
            this.dollText.visible = true
            this.time.delayedCall(1500, () =>{

                this.dollText.visible = false;

            })
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
                this.itemsCollected += 1
                this.dollText.destroy()
                this.sfx.play();
                this.dollCollected.visible = true
                this.doll.destroy()
                this.time.delayedCall(1500, () =>{

                    this.dollCollected.visible = false;
    
                })
            }
        }
        if(this.distance(this.seita, this.wood) < 20){
            this.woodText.visible = true
            this.time.delayedCall(1500, () =>{

                this.woodText.visible = false;

            })
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
                this.itemsCollected += 1
                this.woodText.destroy()
                this.sfx.play();
                this.woodCollected.visible = true
                this.wood.destroy()
                this.time.delayedCall(1500, () =>{

                    this.woodCollected.visible = false;
    
                })
            }
        }
        if(this.distance(this.seita, this.tinCan) < 20){
            this.tinText.visible = true
            this.time.delayedCall(1500, () =>{

                this.tinText.visible = false;

            })
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
                this.itemsCollected += 1
                this.tinText.destroy()
                this.sfx.play();
                this.tinCollected.visible = true
                this.tinCan.destroy()
                this.time.delayedCall(1500, () =>{

                    this.tinCollected.visible = false;
    
                })
            }
        }
        //collision check with coffin and play ending animation to go to end game scene
        if(this.itemsCollected == 3 && this.distance(this.seita, this.coffin) > 13 && this.distance(this.seita, this.coffin) < 17 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.fire3.visible = true
            this.fire3.play('fire4')
            this.music.stop();
            this.time.delayedCall(3000, () =>{
                this.scene.start("winScene");
            })
        }

    }

    //distance formula for sprite interactions
    distance(sprite1, sprite2){
        
        return Math.sqrt(Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2));

    }
}