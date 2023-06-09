/*
We're missing a credit scene for our game for now.
At the moment, credits are given below

Credit for the art used: 
Tilemap sprites: https://kale-game.itch.io/2d-pixel-art Author: Kale Game
Alarm sfx, 1st scene: https://www.youtube.com/watch?v=GToHq7YAq_g Author: All Sound Effects Music & Films 

*/
let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 360,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [EscapeDodge, FarmerDodge, GameOver]
}

const game = new Phaser.Game(config)
let keyR;
let dimensions = 200;
let textConfig = {
    fontFamily: 'Poppins',
    fontSize: '15px',
    align: 'right',
    
}