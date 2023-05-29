class FarmerDodge extends Phaser.Scene {
    constructor(){
        super("dodgeScene");

        this.VEL = 100;


    }

    preload(){
        this.load.path = "./assets/";
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image('tilemapImage', 'tilemap2.png');
        

        this.load.tilemapTiledJSON('JSONmap', 'map02.json');

    }

    create(){

        const map = this.add.tilemap('JSONmap');
        const tileset = map.addTilesetImage('tilemap', 'tilemapImage');

        const background = map.createLayer('Background', tileset, 0,0);
        const decorations = map.createLayer('Decorations', tileset, 0,0).setDepth(10);
        const trees = map.createLayer('Trees', tileset, 0,0).setDepth(10);
        const crops = map.createLayer('Crops', tileset, 0,0);

        this.slime = this.physics.add.sprite(32,32, 'slime', 0);

        this.anims.create ({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 1
            })
        })

        this.slime.play('jiggle');

        this.slime.body.setCollideWorldBounds(true);
        //Collision checks
        decorations.setCollisionByProperty({collides: true});
        trees.setCollisionByProperty({collides: true});
        crops.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.slime, decorations);
        this.physics.add.collider(this.slime, trees);
        this.physics.add.collider(this.slime, crops);

        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.slime, true, 0.25,0.25)

        this.physics.world.bounds.setTo(0,0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        
        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown){

            this.direction.x = -1 

        } else if(this.cursors.right.isDown){

            this.direction.x = 1;

        }

        if(this.cursors.up.isDown){

            this.direction.y = -1 

        } else if(this.cursors.down.isDown){

            this.direction.y = 1;

        }

        this.direction.normalize();
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}