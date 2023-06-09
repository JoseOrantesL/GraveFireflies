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