class FarmerDodge extends Phaser.Scene {
    constructor(){
        super("dodgeScene");

        this.VEL = 100;


    }

    preload(){
        this.load.path = "./assets/";
        this.load.spritesheet('seita', 'seita.png', {
            frameWidth: 8,
            frameHeight: 16
        });

        this.load.image('setsuko', 'setsuko.png')
        this.load.spritesheet('farmer', 'farmer.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image('tilemapImage', 'tilemap2.png');

        this.load.tilemapTiledJSON('JSONmap', 'map02.json');

    }

    create(){
        this.gotCarrot = false;
        let gotLettuce = false;
        let gotPome = false;
        let gotPotato = false;

        //Create Tilemap layers
        const map = this.add.tilemap('JSONmap');
        const tileset = map.addTilesetImage('tilemap', 'tilemapImage');

        const background = map.createLayer('Background', tileset, 0,0);
        const decorations = map.createLayer('Decorations', tileset, 0,0)
        const trees = map.createLayer('Trees', tileset, 0,0).setDepth(10);
        carrots = map.createLayer('Carrots', tileset, 0,0);
        const lettuce = map.createLayer('Lettuce', tileset, 0,0);
        const pome = map.createLayer('Pome', tileset, 0,0);
        const potato = map.createLayer('Potato', tileset, 0,0);

        //add sprites
        //seita = this.physics.add.sprite(50,450, 'seita', 0);
        seita = this.physics.add.sprite(150,70, 'seita', 0);
        this.setsuko = this.physics.add.sprite(100, 100, 'setsuko',0);
        this.farmer = this.physics.add.sprite(138, 210, 'farmer', 0);
        this.farmer2 = this.physics.add.sprite(445, 210, 'farmer', 0);

        seita.body.onOverlap = true;

        //create running animations
        this.anims.create ({
            key: 'stand2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('seita', {
                start: 0,
                end: 0
            })
        })

        this.anims.create ({
            key: 'run2',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('seita', {
                start: 1,
                end: 0
            })
        })
        
        //Farmer animation display
        this.anims.create({
            key: 'left',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'right',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 2,
                end: 2
            })
        })

        this.farmer.play('left');
        this.farmer2.play('right');
        //turn on collisions with background and other sprites
        seita.body.onCollide = true;
        this.setsuko.body.setCollideWorldBounds(true)

        //set NPC sprites to immovable
        this.setsuko.setImmovable(true)
        this.farmer.setImmovable(true);
        this.farmer2.setImmovable(true);

        //zones farmer 1
        this.zone1 = this.add.rectangle(60, 215, 110, 130, 0xff0000)
        this.zone2 = this.add.rectangle(215, 215, 110, 130, 0xff0000)

        //zones farmer 2
        this.zone3 = this.add.rectangle(350, 215, 150, 130, 0xff0000)
        this.zone4 = this.add.rectangle(550, 215, 170, 130, 0xff0000)

        //Tilemap collision activation
        decorations.setCollisionByProperty({collides: true});
        trees.setCollisionByProperty({collides: true});
        carrots.setCollisionByProperty({collides: true});
        lettuce.setCollisionByProperty({collides: true});
        pome.setCollisionByProperty({collides: true});
        potato.setCollisionByProperty({collides: true});

        //Add detecting zones to physics
        this.physics.add.existing(this.zone1);
        this.physics.add.existing(this.zone2);
        this.physics.add.existing(this.zone3);
        this.physics.add.existing(this.zone4);
        this.carrotText = this.add.text(0, 0, "Press Space to Pick Up Carrots", menuText);
        this.carrotText.visible = false;
        //Collision checks
        this.physics.add.collider(seita, decorations);
        this.physics.add.collider(seita, trees);
        this.physics.add.collider(seita, carrots, (seita, carrots) => {
            if(this.gotCarrot == false){
                this.carrotText.visible = true;
                this.time.delayedCall(2000, () => {
                
                    this.carrotText.visible = false;

                }, null, this); 
            }         
            
        })

        
        this.physics.add.collider(seita, lettuce);
        this.physics.add.collider(seita, pome);
        this.physics.add.collider(seita, potato);
        this.physics.add.collider(seita, this.setsuko)
        this.physics.add.collider(seita, this.farmer)
        this.physics.add.collider(seita, this.farmer2)
       
        //add tooltip for NPC interactions

        this.texty = this.add.text(100, 70, 'Press space', textConfig)
        this.texty.visible = false
        this.reply = this.add.text(100,70, 'I\'m hungry! Can you get me some food?', textConfig);
        this.reply.visible = false;
        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) => {
                
                this.texty.visible = true
                this.time.delayedCall(2000, ()=>{
                    this.texty.visible = false
                })

            });

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) => {
            
            //this.scene.start("gameOverScene");
            console.log("Happening");

        });
    
        //Make camera follow player
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(seita, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map.widthInPixels, map.heightInPixels);


        //allow keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        this.carrotText.x = seita.body.position.x;
        this.carrotText.y = seita.body.position.y - 30;

        if(seita.body.checkWorldBounds()){

            this.scene.start('escapeScene');

        }
        
        //prevent NPC sprites from moving at all
        this.setsuko.setVelocity(0,0);

        //Player movement
        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){
            seita.setFlip(true, false);
            this.direction.x = -1
            //seita.flipX = true;
            seita.play("run2"); 
        }
        if(this.cursors.right.isDown){
            seita.resetFlip();
            this.direction.x = 1;
            seita.play("run2"); 

        }

        if(this.cursors.up.isDown){

            this.direction.y = -1
            seita.play("run2");  

        } 
        if(this.cursors.down.isDown){

            this.direction.y = 1;
            seita.play("run2"); 

        }

        this.direction.normalize();
        seita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        //Farmer animation updating
        if(this.farmer.anims.currentAnim.key === 'left'){     
            
            this.physics.overlap(seita, this.zone1);
            this.turnFarmer(this.farmer, "right");
            
        } 
        
        if(this.farmer.anims.currentAnim.key === 'right'){

            this.physics.overlap(seita, this.zone2)
            this.turnFarmer(this.farmer, "left");

        }

        if(this.farmer2.anims.currentAnim.key === 'left'){
            this.physics.overlap(seita, this.zone3)
            this.turnFarmer(this.farmer2, "right");
        }

        if(this.farmer2.anims.currentAnim.key === 'right'){

            this.physics.overlap(seita, this.zone4)
            this.turnFarmer(this.farmer2, "left");

        }

        

        if(this.distance(seita, this.farmer) < 31 || this.distance(seita, this.farmer2) < 31){
            
            this.scene.start("gameOverScene");

        }

        if(this.distance(seita, carrots) < 102 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            if(!this.gotCarrot){
                carrots.visible = false;
                this.gotCarrot = true;
                this.carrotText.setText("Carrots obtained!")
                this.time.delayedCall(2000, () => {
                
                    this.carrotText.destroy();
    
                }, null, this);
            } 
        }

        if(this.distance(seita, this.setsuko) < 15 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            
            this.texty.visible = false;
            
            this.reply.visible = true;

            this.time.delayedCall(1000, () => {
                
                this.reply.visible = false;

            }, null, this);
        } 

    }

    distance(sprite1, sprite2){
        
        return Math.sqrt(Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2));

    }

    turnFarmer(sprite1, anim){
        
        this.time.delayedCall(3000, () => {
            sprite1.play(anim);
        }, null, this);

    }
    
}