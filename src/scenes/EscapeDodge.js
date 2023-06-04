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

        const map1 = this.add.tilemap('JSONmap1');
        const tileset1 = map1.addTilesetImage('tilemap2', 'tilemapImage1');

        const background = map1.createLayer('Background', tileset1, 0,0);
        const fence = map1.createLayer('Fence', tileset1, 0,0)
        const houses = map1.createLayer('Houses', tileset1, 0,0)

        this.seita = this.physics.add.sprite(50, 400, 'player', 0);
        
       // this.check = this.add.rectangle(520, 0, 100, 5, 0xFFFFFF).setOrigin(0,0);


        //this.physics.add.existing(this.check);

        //this.check.body.collideWorldBounds = true;

        //this.check.body.onCollide = true;
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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 2
            })
        })

        this.fire = this.physics.add.sprite(150, 100, 'fire', 0);

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

        this.seita.body.onCollide = true;
        this.seita.body.OnWorldBounds = true;
        //this.seita.body.setCollideWorldBounds(true);
        

        //Collision checks
        
        fence.setCollisionByProperty({collides: true});
        houses.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.seita, fence);
        this.physics.add.collider(this.seita, houses);
        this.physics.add.collider(this.seita, this.check);
        
        
        this.physics.collide(this.seita, this.check, () => {
            console.log('Hit world')
        }, null, this)

        this.cameras.main.setBounds(0,0, map1.widthInPixels, map1.heightInPixels);
        this.cameras.main.startFollow(this.seita, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map1.widthInPixels, map1.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        
        if(this.seita.body.checkWorldBounds()){
            this.scene.start('dodgeScene');
        }
        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){
            this.seita.setFlip(true, false);
            this.direction.x = -1
            this.seita.flipX = true;
            this.seita.play("run"); 

        } else if(this.cursors.right.isDown){
            this.seita.resetFlip();
            this.direction.x = 1;
            this.seita.play("run"); 

        }

        if(this.cursors.up.isDown){

            this.direction.y = -1
            this.seita.play("run");  

        } else if(this.cursors.down.isDown){

            this.direction.y = 1;
            this.seita.play("run"); 

        } else {
            this.seita.play("stand");
        }

        this.direction.normalize();
        this.seita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
  
}