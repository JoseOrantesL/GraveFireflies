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
    scene: [EscapeDodge, FarmerDodge ]
}

const game = new Phaser.Game(config)