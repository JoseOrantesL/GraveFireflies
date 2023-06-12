class LastScene extends Phaser.Scene {
    constructor(){
        super("lastScene");

        this.VEL = 100;
    }
    
    preload(){

        this.load.image('tilemapImage', 'tilemap2.png');

        this.load.tilemapTiledJSON('JSONmap', 'map02.json');

    }

    create(){

        const map = this.add.tilemap('JSONmap');
        const tileset = map.addTilesetImage('tilemap', 'tilemapImage');

        const background = map.createLayer('Background', tileset, 0,0);
        const vertWall = map.createLayer('VWalls', tileset, 0,0);
        const HorWall = map.createLayer('HWalls', tileset, 0,0);
        const trees = map.createLayer('Trees', tileset, 0,0).setDepth(10);

        this.seita = this.physics.add.sprite(150,70, 'seita', 0);


        
        trees.setCollisionByProperty({collides: true});
        vertWall.setCollisionByProperty({collides: true});
        HorWall.setCollisionByProperty({collides: true});

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
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
        seita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
}