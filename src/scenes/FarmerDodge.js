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

        //Create Tilemap layers
        const map = this.add.tilemap('JSONmap');
        const tileset = map.addTilesetImage('tilemap', 'tilemapImage');

        const background = map.createLayer('Background', tileset, 0,0);
        const decorations = map.createLayer('Decorations', tileset, 0,0)
        const trees = map.createLayer('Trees', tileset, 0,0).setDepth(10);
        const crops = map.createLayer('Crops', tileset, 0,0);

        //add sprites
        //this.seita = this.physics.add.sprite(50,450, 'seita', 0);
        this.seita = this.physics.add.sprite(500,300, 'seita', 0);
        this.setsuko = this.physics.add.sprite(100, 100, 'setsuko',0);
        this.farmer = this.physics.add.sprite(138, 210, 'farmer', 0);
        this.farmer2 = this.physics.add.sprite(445, 210, 'farmer', 0);

        this.seita.body.onOverlap = true;

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
        this.seita.body.onCollide = true;
        this.setsuko.body.setCollideWorldBounds(true)

        //set NPC sprites to immovable
        this.setsuko.setImmovable(true)
        this.farmer.setImmovable(true);
        this.farmer2.setImmovable(true);

        //zones farmer 1
        this.zone1 = this.add.rectangle(60, 215, 110, 130, 0xff0000)
        this.zone2 = this.add.rectangle(215, 215, 110, 130, 0xff0000)

        //zones farmer 2
        this.zone3 = this.add.rectangle(350, 215, 110, 130, 0xff0000)
        this.zone4 = this.add.rectangle(550, 215, 110, 130, 0xff0000)

        //Collision checks
        decorations.setCollisionByProperty({collides: true});
        trees.setCollisionByProperty({collides: true});
        crops.setCollisionByProperty({collides: true});
        this.physics.add.existing(this.zone1);
        this.physics.add.existing(this.zone2);
        this.physics.add.existing(this.zone3);
        this.physics.add.existing(this.zone4);

        this.physics.add.collider(this.seita, decorations);
        this.physics.add.collider(this.seita, trees);
        this.physics.add.collider(this.seita, crops);
        this.physics.add.collider(this.seita, this.setsuko)
        this.physics.add.collider(this.seita, this.farmer)
        this.physics.add.collider(this.seita, this.farmer2)
        
        /*this.physics.add.overlap(this.seita, this.zone1);
        this.physics.add.overlap(this.seita, this.zone2);
        */
       
        //add tooltip for NPC interactions
        this.texty = this.add.text(100, 70, 'Press space', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
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

        });
    
        //Make camera follow player
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.seita, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map.widthInPixels, map.heightInPixels);


        //allow keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        if(this.seita.body.checkWorldBounds()){

            this.scene.start('escapeScene');

        }

        //prevent NPC sprites from moving at all
        this.setsuko.setVelocity(0,0);

        //Player movement
        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){
            this.seita.setFlip(true, false);
            this.direction.x = -1
            //this.seita.flipX = true;
            this.seita.play("run2"); 
        }
        if(this.cursors.right.isDown){
            this.seita.resetFlip();
            this.direction.x = 1;
            this.seita.play("run2"); 

        }

        if(this.cursors.up.isDown){

            this.direction.y = -1
            this.seita.play("run2");  

        } 
        if(this.cursors.down.isDown){

            this.direction.y = 1;
            this.seita.play("run2"); 

        }

        this.direction.normalize();
        this.seita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        //Farmer animation updating
        if(this.farmer.anims.currentAnim.key === 'left'){     
            
            this.physics.overlap(this.seita, this.zone1);
            this.turnFarmer(this.farmer, "right");
            
        } 
        
        if(this.farmer.anims.currentAnim.key === 'right'){

            this.physics.overlap(this.seita, this.zone2)
            this.turnFarmer(this.farmer, "left");

        }

        if(this.farmer2.anims.currentAnim.key === 'left'){
            this.physics.overlap(this.seita, this.zone3)
            this.turnFarmer(this.farmer2, "right");
        }

        if(this.farmer2.anims.currentAnim.key === 'right'){

            this.physics.overlap(this.seita, this.zone4)
            this.turnFarmer(this.farmer2, "left");

        }

        

        if(this.distance(this.seita, this.farmer) < 31 || this.distance(this.seita, this.farmer2) < 31){
            
            this.scene.start("gameOverScene");

        }

        if(this.distance(this.seita, this.setsuko) < 15 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            
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