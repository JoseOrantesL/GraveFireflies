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
        this.seita = this.physics.add.sprite(32,32, 'seita', 0);
        this.setsuko = this.physics.add.sprite(100, 100, 'setsuko',0)

        
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
        
        //turn on collisions with background and other sprites
        this.seita.body.onCollide = true;
        this.seita.body.setCollideWorldBounds(true);
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


        //add tooltip for NPC interactions
        this.texty = this.add.text(100, 70, 'Press e', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        this.texty.visible = false
        
        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) =>
            {
                console.log("inside log");
                this.texty.visible = true

                this.time.delayedCall(1000, ()=>{
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
    }
    
    
}