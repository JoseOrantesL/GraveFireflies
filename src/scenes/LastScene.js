class LastScene extends Phaser.Scene {
    constructor(){
        super("lastScene");

        this.VEL = 100;
    }
    
    preload(){
        this.load.path = "./assets/";
        this.load.image('tilemapImage3', 'tilemap2.png');

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
        //sseita.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
}