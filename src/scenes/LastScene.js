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

    }

    create(){

        const map3 = this.add.tilemap('JSONmap3');
        const tileset = map3.addTilesetImage('tilemap', 'tilemapImage3');

        const background = map3.createLayer('Background', tileset, 0,0);
        const vertWall = map3.createLayer('VWalls', tileset, 0,0);
        const HorWall = map3.createLayer('HWalls', tileset, 0,0);
        const trees = map3.createLayer('Trees', tileset, 0,0).setDepth(10);

        this.seita = this.physics.add.sprite(150,70, 'seita', 0);

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
        
        //collision checks
        trees.setCollisionByProperty({collides: true});
        vertWall.setCollisionByProperty({collides: true});
        HorWall.setCollisionByProperty({collides: true});

        this.physics.add.collider(this.seita, vertWall);
        this.physics.add.collider(this.seita, HorWall);
        this.physics.add.collider(this.seita, trees);


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
    }
}