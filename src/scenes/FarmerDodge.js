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
        this.seita = this.physics.add.sprite(50,450, 'seita', 0);
        this.setsuko = this.physics.add.sprite(100, 100, 'setsuko',0);
        this.farmer = this.physics.add.sprite(320, 210, 'farmer', 0);
        

        //Range
        /*
        let graphics = this.add.graphics({fillStyle: {color: 0xff0000}});

        let triangle = Phaser.Geom.Triangle.BuildEquilateral(dimensions,dimensions, dimensions);

        graphics.fillTriangleShape(triangle);
        */

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

        //turn on collisions with background and other sprites
        this.seita.body.onCollide = true;
        this.setsuko.body.setCollideWorldBounds(true)

        //set NPC sprites to immovable
        this.setsuko.setImmovable(true)


        //Collision checks
        decorations.setCollisionByProperty({collides: true});
        trees.setCollisionByProperty({collides: true});
        crops.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.seita, decorations);
        this.physics.add.collider(this.seita, trees);
        this.physics.add.collider(this.seita, crops);
        this.physics.add.collider(this.seita, this.setsuko)
        //this.physics.add.existing(graphics);

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
            
            this.time.delayedCall(1000, () => {
                this.farmer.play('right');
            }, null, this);

        } 
        
        if(this.farmer.anims.currentAnim.key === 'right'){
            
            this.time.delayedCall(1000, () => {
                this.farmer.play('left');
            }, null, this);

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
    
}