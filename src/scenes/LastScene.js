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
        this.load.image('firewood', 'firewood.png')
        this.load.image('doll', 'doll.png')
        this.load.image('fruitCan', 'fruitCan.png')
        this.load.image('coffin', 'coffin.png')
    }

    create(){

        const map3 = this.add.tilemap('JSONmap3');
        const tileset = map3.addTilesetImage('tilemap', 'tilemapImage3');

        const background = map3.createLayer('Background', tileset, 0,0);
        const vertWall = map3.createLayer('VWalls', tileset, 0,0);
        const HorWall = map3.createLayer('HWalls', tileset, 0,0);
        const trees = map3.createLayer('Trees', tileset, 0,0).setDepth(10);

        this.seita = this.physics.add.sprite(150,70, 'seita', 0);
        this.seita.body.onCollide = true;

        this.itemsCollected = 0

        this.doll = this.physics.add.sprite(50, 70, 'doll', 0);
        this.doll.setImmovable(true)
        this.doll.body.setCollideWorldBounds(true)

        this.wood = this.physics.add.sprite(500, 70, 'firewood', 0)
        this.wood.setImmovable(true)
        this.wood.body.setCollideWorldBounds(true)

        this.tinCan = this.physics.add.sprite(600, 450, 'fruitCan',0)
        this.tinCan.setImmovable(true)
        this.tinCan.body.setCollideWorldBounds(true)


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
        this.physics.add.collider(this.seita, this.doll)
        this.physics.add.collider(this.seita, this.wood)


        this.dollText = this.add.text(30, 50, 'Press space to pick up doll', gameText)
        this.dollText.visible = false
        this.dollCollected = this.add.text(30,50, 'Doll Collected!', gameText)
        this.dollCollected.visible = false

        this.woodText = this.add.text(450, 30, 'Press space to pick up firewood', gameText)
        this.woodText.visible = false
        this.woodCollected = this.add.text(450, 50, 'Firewood Collected!', gameText)
        this.woodCollected.visible = false

        this.tinText = this.add.text(500, 450, 'Press space to pick up candy box', gameText)
        this.tinText.visible = false
        this.tinCollected = this.add.text(500, 450, 'Candy box Collected!', gameText)
        this.tinCollected.visible = false

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

        if(this.distance(this.seita, this.doll) < 20){
            this.dollText.visible = true
            this.time.delayedCall(1500, () =>{

                this.dollText.visible = false;

            })
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
                this.itemsCollected += 1
                this.dollText.destroy()
                this.dollCollected.visible = true
                this.doll.destroy()
                this.time.delayedCall(1500, () =>{

                    this.dollCollected.visible = false;
    
                })
            }
        }
        if(this.distance(this.seita, this.wood) < 20){
            this.woodText.visible = true
            this.time.delayedCall(1500, () =>{

                this.woodText.visible = false;

            })
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
                this.itemsCollected += 1
                this.woodText.destroy()
                this.woodCollected.visible = true
                this.wood.destroy()
                this.time.delayedCall(1500, () =>{

                    this.woodCollected.visible = false;
    
                })
            }
        }
        if(this.distance(this.seita, this.tinCan) < 20){
            this.tinText.visible = true
            this.time.delayedCall(1500, () =>{

                this.tinText.visible = false;

            })
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
                this.itemsCollected += 1
                this.tinText.destroy()
                this.tinCollected.visible = true
                this.tinCan.destroy()
                this.time.delayedCall(1500, () =>{

                    this.tinCollected.visible = false;
    
                })
            }
        }
    }

    distance(sprite1, sprite2){
        
        return Math.sqrt(Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2));

    }
}