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
        this.load.spritesheet('bomb', 'bomb.png',{
            frameWidth: 15,
            frameHeight: 8
        });
        this.load.spritesheet('explosion', 'explosion.png',{
            frameWidth: 20,
            frameHeight: 20
        });
        this.load.audio('alarm', 'alarm.mp3');
    }

    create(){
        //create sound fx for this scene
        this.alarm = this.sound.add('alarm', {volume: 0.1, loop: true});
        this.alarm.play();

        //Connecting the tilemap to the JSON file
        const map1 = this.add.tilemap('JSONmap1');
        const tileset1 = map1.addTilesetImage('tilemap2', 'tilemapImage1');

        //Creating the layers for the tilemap
        const background = map1.createLayer('Background', tileset1, 0,0);
        const fence = map1.createLayer('Fence', tileset1, 0,0)
        const houses = map1.createLayer('Houses', tileset1, 0,0)


        //Adding the player character to the scene
        this.seita = this.physics.add.sprite(50, 400, 'player', 0);

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

        this.anims.create ({
            key: 'bomb',
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('bomb', {
                start: 0,
                end: 2
            })
        })
        this.anims.create ({
            key: 'explode',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 4
            })
        })        
        //initialize bomb spawn coords
        this.bombx = 70
        this.bomby = 400

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

        //spawn a bomb randomly after every half second
        this.time.addEvent({delay:500, callback: this.spawnBomb, callbackScope:this, loop:true})
        
        //Create group to add bombs
        this.bombGroup = this.add.group({
            runChildUpdate: true
        })
        this.explosionGroup = this.add.group({
            runChildUpdate: true
        })
        this.fireGroup = this.add.group()
    }

    update(){
        //Check whenever the player collides with the world bounds to start scene #2 
        if(this.seita.body.checkWorldBounds()){
            this.alarm.stop();
            this.scene.start('dodgeScene');
        }

        
        if(Phaser.Input.Keyboard.JustDown(keyE)){
            this.scene.start("dodgeScene");
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

        //check for collision between player and explosion and fire
        this.physics.world.collide(this.seita, this.explosionGroup, this.collided, null, this)
        this.physics.world.collide(this.seita, this.fireGroup, this.collided, null, this)

    }
  

    //spawn bombs randomly around the screen
    spawnBomb(){
        let bomb = new Bomb(this, this.bombx, this.bomby) 
        this.bombGroup.add(bomb)
        bomb.play('bomb')

        this.bombx = Phaser.Math.Between(1,630)
        this.bomby = Phaser.Math.Between(1,450)
    }
    //spawn fire on top of explosion after explosion animation finishes
    spawnFire(x, y){
        let fire = new Fire(this, x, y)
        this.fireGroup.add(fire)
        fire.play('fire1')
    }
    //if player touches explosion or fire switch to game over
    collided(){
        this.alarm.stop()
        this.scene.start('gameOverScene')
    }
}