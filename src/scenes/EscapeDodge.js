class EscapeDodge extends Phaser.Scene {
    constructor(){
        super("escapeScene");

        this.VEL = 100;


    }

    preload(){
        this.load.path = "./assets/";
        this.load.spritesheet('player', 'seita_setsuko.png', {
            frameWidth: 10,
            frameHeight: 14
        });

        this.load.image('tilemapImage1', 'tilemap2.png');
        this.load.spritesheet('fire', 'fire.png', {
            frameHeight: 20,
            frameWidth: 20
        });

        this.load.tilemapTiledJSON('JSONmap1', 'map01.json');

    }

    create(){
        //Connecting the tilemap to the JSON file
        const map1 = this.add.tilemap('JSONmap1');
        const tileset1 = map1.addTilesetImage('tilemap2', 'tilemapImage1');

        //Creating the layers for the tilemap
        const background = map1.createLayer('Background', tileset1, 0,0);
        const fence = map1.createLayer('Fence', tileset1, 0,0)
        const houses = map1.createLayer('Houses', tileset1, 0,0)


        //Adding the player character to the scene
        this.seita = this.physics.add.sprite(50, 400, 'player', 0);

        //Fire setup
        this.fire = this.physics.add.sprite(150, 100, 'fire', 0);
        
        //Animation setup
        this.anims.create ({
            key: 'stand',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 0
            })
        })

        this.anims.create ({
            key: 'run',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 0
            })
        })

        this.anims.create ({
            key: 'fire1',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fire', {
                start: 0,
                end: 1
            })
        })

        this.fire.play('fire1');
        
        

        //Collision checks
        this.seita.body.onCollide = true;
        this.seita.body.OnWorldBounds = true;
        fence.setCollisionByProperty({collides: true});
        houses.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.seita, fence);
        this.physics.add.collider(this.seita, houses);
        this.physics.add.collider(this.seita, this.check);

        //Setup camera to follow the player
        this.cameras.main.setBounds(0,0, map1.widthInPixels, map1.heightInPixels);
        this.cameras.main.startFollow(this.seita, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map1.widthInPixels, map1.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        
        //Check whenever the player collides with the world bounds to start scene #2 
        if(this.seita.body.checkWorldBounds()){
            this.scene.start('dodgeScene');
        }

        //Movement setup and adaptation
        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){
            this.seita.play("run"); 
            this.seita.setFlip(true, false);
            this.direction.x = -1
            this.seita.flipX = true;
            

        } 
        
        if(this.cursors.right.isDown){

            this.seita.play("run");
            this.seita.resetFlip();
            this.direction.x = 1;
        
        } 
        
        if(this.cursors.up.isDown){

            this.direction.y = -1
            this.seita.play("run");  

        }
        if(this.cursors.down.isDown){

            this.direction.y = 1;
            this.seita.play("run"); 

        }

        this.direction.normalize();
        this.seita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
  
}