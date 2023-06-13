/*
Collaborators:

Lucas Lee
Jose Orantes

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
            debug: false
        }
    },
    zoom: 2,
    scene: [Menu, EscapeDodge, FarmerDodge, LastScene, GameOver, GameOver2, Credits, Instructions,Winner, Transition]
}

let menuText = {
    fontFamily: 'Georgia',
    fontSize: '20px',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top:5,
        bottom: 5
    },
    fixedWidth: 0
}

let subText = {
    fontFamily: 'Georgia',
    fontSize: '14px',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top:5,
        bottom: 5
    },
    fixedWidth: 0
}
let credText = {
    fontFamily: 'Georgia',
    fontSize: '10px',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top:5,
        bottom: 5
    },
    fixedWidth: 0
}

let gameText = {
    fontFamily: 'Calibri',
    fontSize: '10px',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top:5,
        bottom: 5
    },
    fixedWidth: 0
}

const game = new Phaser.Game(config)
let keyR, keyS, keyC, keyB, keyE, keyI,keyQ, keyW;

let dimensions = 200;
let seita, carrots, pome, potato, setsuko, died2;
let gameWidth = game.width
let gameHeight = game.height
let textConfig = {
    fontFamily: 'Poppins',
    fontSize: '15px',
    align: 'right',
}
