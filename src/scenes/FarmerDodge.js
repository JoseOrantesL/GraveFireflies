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
        this.load.audio("farm", "farm.mp3");
    }

    create(){
        this.farm = this.sound.add("farm", {volume: 0.05, loop: true});
        this.farm.play();
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
        this.walls = map.createLayer('wall', tileset, 0,0);
        carrots = map.createLayer('Carrots', tileset, 0,0);
        this.lettuce = map.createLayer('Lettuce', tileset, 0,0);
        this.pome = map.createLayer('Pome', tileset, 0,0);
        this.potato = map.createLayer('Potato', tileset, 0,0);

        //add sprites
        seita = this.physics.add.sprite(50,450, 'seita', 0);
        //seita = this.physics.add.sprite(540,450, 'seita', 0);
        this.setsuko = this.physics.add.sprite(530, 440, 'setsuko',0);
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
        this.zone1 = this.add.rectangle(60, 215, 110, 90, 0xff0000)
        this.zone1.visible = false;
        this.zone2 = this.add.rectangle(215, 215, 110, 90, 0xff0000)
        this.zone2.visible = false;
        //zones farmer 2
        this.zone3 = this.add.rectangle(350, 215, 150, 90, 0xff0000)
        this.zone3.visible = false;
        this.zone4 = this.add.rectangle(550, 215, 170, 90, 0xff0000)
        this.zone4.visible = false;

        //Tilemap collision activation
        decorations.setCollisionByProperty({collides: true});
        trees.setCollisionByProperty({collides: true});
        this.walls.setCollisionByProperty({collides: true});
        carrots.setCollisionByProperty({collides: true});
        this.lettuce.setCollisionByProperty({collides: true});
        this.pome.setCollisionByProperty({collides: true});
        this.potato.setCollisionByProperty({collides: true});

        //add tooltip for NPC interactions

        this.texty = this.add.text(450, 410, 'I\'m hungry! Can you get me some food?', gameText)
        this.texty.visible = false

        this.check = this.add.text(150, 0, 'I can only carry one at a time', gameText);
        this.check.visible = false;

        this.reply = this.add.text(450,420, 'Can you get me some more?', gameText);
        this.reply.visible = false;

        this.finished = this.add.text(450,420, 'Proceed to next area', gameText);
        this.finished.visible = false;

        this.carrotText = this.add.text(20, 0, "Press Space to Pick Up Carrots", gameText);
        this.carrotText.visible = false;

        this.lettuceText = this.add.text(150, 0, "Press Space to Pick Up lettuce", gameText);
        this.lettuceText.visible = false;

        this.potatoText = this.add.text(370, 0, "Press Space to Pick Up Potatoes", gameText);
        this.potatoText.visible = false;

        this.pomeText = this.add.text(250, 0, "Press Space to Pick Up Tomatoes", gameText);
        this.pomeText.visible = false;

        //Add detecting zones to physics
        this.physics.add.existing(this.zone1);
        this.physics.add.existing(this.zone2);
        this.physics.add.existing(this.zone3);
        this.physics.add.existing(this.zone4);

        //Collision checks

        this.physics.add.collider(seita, decorations);
        this.physics.add.collider(seita, trees);
        this.physics.add.collider(seita, this.walls);
            //Carrot collision
        this.physics.add.collider(seita, carrots, () => {
            if(!this.triggered && !this.gotCarrot){
                
                this.check.visible = true;
                this.time.delayedCall(2000, () => {
                
                    this.check.visible = false;

                }, null, this); 

            } else if(!this.gotCarrot){
                this.carrotText.visible = true;
                this.time.delayedCall(2000, () => {
                
                    this.carrotText.visible = false;

                }, null, this); 
            }         
            
        })

            //lettuce collision
        this.physics.add.collider(seita, this.lettuce, () =>{

            if(!this.triggered && !this.gotLettuce){

                this.check.visible = true;
                this.time.delayedCall(2000, () => {
                
                    this.check.visible = false;

                }, null, this); 

            } else if(!this.gotLettuce){
                this.lettuceText.visible = true;
                this.time.delayedCall(1500, () => {
                
                    this.lettuceText.visible = false;

                }, null, this);
            }

        });
        
        this.physics.add.collider(seita, this.pome, () =>{
                if(!this.triggered && !this.gotPome){

                    this.check.visible = true;
                    this.time.delayedCall(2000, () => {
                    
                        this.check.visible = false;

                    }, null, this); 

                } else if(!this.gotPome){
                    this.pomeText.visible = true;
                    this.time.delayedCall(1500, () => {
                
                        this.pomeText.visible = false;

                    }, null, this);
            }
        });

        this.physics.add.collider(seita, this.potato, ()=> {
            if(!this.triggered && !this.gotPotato){

                this.check.visible = true;
                this.time.delayedCall(2000, () => {
                
                    this.check.visible = false;

                }, null, this); 

            } else if(!this.gotPotato){
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

            }  
        })
        this.physics.add.collider(seita, this.farmer)
        this.physics.add.collider(seita, this.farmer2)

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) => {
            this.farm.stop();
            this.scene.start("gameOverScene2");
            

        });
    
        //Make camera follow player
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(seita, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map.widthInPixels, map.heightInPixels);


        //allow keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        this.check.x = seita.body.x -50;
        this.check.y = seita.body.y + 10;

        if(seita.body.checkWorldBounds()){

            this.farm.stop();
            this.scene.start('transitionScene');

        }
        
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
            this.farm.stop();
            this.scene.start("gameOverScene2");

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
            this.gotPotato = true;
        }

        //lettuce handling
        if(this.triggered && this.distance(seita, this.lettuce) > 170 && this.distance(seita, this.lettuce) < 222 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.triggered = false;
            this.cropsToggle(this.lettuce, this.gotLettuce, this.lettuceText, "Lettuce");
            this.gotLettuce = true;
        }
        
        //pome handling

        if(this.triggered && this.distance(seita, this.pome) > 294 && this.distance(seita, this.pome) < 351 && Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.triggered = false;
            this.cropsToggle(this.pome, this.gotPome, this.pomeText, "Tomatoes");
            this.gotPome = true;
        }

        //delivery handling

        if((this.gotCarrot && this.gotLettuce && this.gotPome && this.gotPotato) && this.distance(seita, this.setsuko) < 15 && Phaser.Input.Keyboard.JustDown(this.cursors.space)) { //All food delivered
            console.log("entered here")
            this.finished.visible = true;
            this.time.delayedCall(2000, ()=>{
                this.reply.visible = false
            })
            this.setsuko.destroy();
            this.walls.visible = false;
            this.walls.setCollisionByProperty({collides: true}, false);

        }  else if(!this.triggered && this.distance(seita, this.setsuko) < 15 && Phaser.Input.Keyboard.JustDown(this.cursors.space) ){
            
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