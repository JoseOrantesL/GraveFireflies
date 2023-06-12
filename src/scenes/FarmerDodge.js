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
        this.gotLettuce = false;
        this.gotPome = false;
        this.gotPotato = false;
        this.triggered = false;

        //Create Tilemap layers
        const map = this.add.tilemap('JSONmap');
        const tileset = map.addTilesetImage('tilemap', 'tilemapImage');

        const background = map.createLayer('Background', tileset, 0,0);
        const decorations = map.createLayer('Decorations', tileset, 0,0)
        const trees = map.createLayer('Trees', tileset, 0,0).setDepth(10);
        carrots = map.createLayer('Carrots', tileset, 0,0);
        this.lettuce = map.createLayer('Lettuce', tileset, 0,0);
        this.pome = map.createLayer('Pome', tileset, 0,0);
        this.potato = map.createLayer('Potato', tileset, 0,0);

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
        this.lettuce.setCollisionByProperty({collides: true});
        this.pome.setCollisionByProperty({collides: true});
        this.potato.setCollisionByProperty({collides: true});

        //add tooltip for NPC interactions

        this.texty = this.add.text(100, 70, 'I\'m hungry! Can you get me some food?', textConfig)
        this.texty.visible = false

        this.reply = this.add.text(100,70, 'Can you get me some more?', textConfig);
        this.reply.visible = false;

        this.finished = this.add.text(100,70, 'Done', textConfig);
        this.finished.visible = false;

        this.carrotText = this.add.text(0, 0, "Press Space to Pick Up Carrots", menuText);
        this.carrotText.visible = false;

        this.lettuceText = this.add.text(0, 0, "Press Space to Pick Up lettuce", menuText);
        this.lettuceText.visible = false;

        this.potatoText = this.add.text(0, 0, "Press Space to Pick Up Potatoes", menuText);
        this.potatoText.visible = false;

        this.pomeText = this.add.text(0, 0, "Press Space to Pick Up Pomes", menuText);
        this.pomeText.visible = false;

        //Add detecting zones to physics
        this.physics.add.existing(this.zone1);
        this.physics.add.existing(this.zone2);
        this.physics.add.existing(this.zone3);
        this.physics.add.existing(this.zone4);

        //Collision checks

        this.physics.add.collider(seita, decorations);
        this.physics.add.collider(seita, trees);

            //Carrot collision
        this.physics.add.collider(seita, carrots, () => {

            if(this.gotCarrot == false){
                this.carrotText.visible = true;
                this.time.delayedCall(2000, () => {
                
                    this.carrotText.visible = false;

                }, null, this); 
            }         
            
        })

            //lettuce collision
        this.physics.add.collider(seita, this.lettuce, () =>{

            if(!this.gotLettuce){
                this.lettuceText.visible = true;
                this.time.delayedCall(1500, () => {
                
                    this.lettuceText.visible = false;

                }, null, this);
            }

        });
        this.physics.add.collider(seita, this.pome, () =>{
            if(!this.gotPome){
                this.pomeText.visible = true;
                this.time.delayedCall(1500, () => {
                
                    this.pomeText.visible = false;

                }, null, this);
            }
        });
        this.physics.add.collider(seita, this.potato, ()=> {

            if(!this.gotPotato){
                this.potatoText.visible = true;
                this.time.delayedCall(1500, () => {
                
                    this.potatoText.visible = false;

                }, null, this);
            }
        });
        
        this.physics.add.collider(seita, this.setsuko, () =>{

            if(!this.gotCarrot && !this.gotLettuce && !this.gotPome && !this.gotPotato){ //1st trigger
                this.triggered = true;
                this.texty.visible = true;
                this.time.delayedCall(2000, ()=>{
                    this.texty.visible = false;
                })

            } else if(this.gotCarrot && this.gotLettuce && this.gotPome && this.gotPotato) { //All food delivered
  
                this.finished.visible = true;
                this.time.delayedCall(2000, ()=>{
                    this.reply.visible = false
                })

            }    
 
        })
        this.physics.add.collider(seita, this.farmer)
        this.physics.add.collider(seita, this.farmer2)

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) => {
            
            this.scene.start("gameOverScene");
            

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
        this.carrotText.y = seita.body.position.y + 30;

        this.potatoText.x = seita.body.position.x - 120;
        this.potatoText.y = seita.body.position.y + 30;

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

        //Lose condition

        if(this.distance(seita, this.farmer) < 31 || this.distance(seita, this.farmer2) < 31){
            
            this.scene.start("gameOverScene");

        }

        //carrot handling

        if(this.triggered && this.distance(seita, carrots) > 53 && this.distance(seita, carrots) < 100  && Phaser.Input.Keyboard.JustDown(this.cursors.space)){

            this.triggered = false;
            this.cropsToggle(carrots, this.gotCarrot, this.carrotText, "Carrots");
            this.gotCarrot = true;

        }
        
        //potato handling

        if(this.triggered && this.distance(seita, this.potato) > 412 && this.distance(seita, this.potato) < 480 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.triggered = false;
            this.cropsToggle(this.potato, this.gotPotato, this.potatoText, "Potatoes");
            
        }

        //lettuce handling
        if(this.triggered && this.distance(seita, this.lettuce) > 170 && this.distance(seita, this.lettuce) < 222 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.triggered = false;
            this.cropsToggle(this.lettuce, this.gotLettuce, this.lettuceText, "Lettuce");
            
        }
        
        //pome handling

        if(this.triggered && this.distance(seita, this.pome) > 294 && this.distance(seita, this.pome) < 351 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.triggered = false;
            this.cropsToggle(this.pome, this.gotPome, this.pomeText, "Pome");
            
        }

        //delivery handling

        if(!this.triggered && this.distance(seita, this.setsuko) < 15 && Phaser.Input.Keyboard.JustDown(this.cursors.space) ){
            
            this.triggered = true;
            this.reply.setText("Thanks! Can you get me some more?");
            this.reply.visible = true;
            this.time.delayedCall(1500, () =>{

                this.reply.visible = false;

            })

        } 

    }

    distance(sprite1, sprite2){
        
        return Math.sqrt(Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2));

    }

    turnFarmer(sprite1, anim){
        
        this.time.delayedCall(4500, () => {
            sprite1.play(anim);
        }, null, this);

    }
    
    cropsToggle(crop, gotCrop, cropText, cropString){

        cropText.visible = true;

        if(!gotCrop){

            crop.visible = false;
            gotCrop = true;
            cropText.setText(cropString + " obtained!")
            this.time.delayedCall(2000, () => {
                
                cropText.destroy();

            }, null, this);

        }
    }

}