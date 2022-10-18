export default {
    scale: 0.23,
    boxTexturePrefix: 'tile-',
    boxTypes: 5,
    minBoxAction: 2,
    scoreWin: 1000,
    moves: 15,
    font: 'Marvin',
    scoreNum: 10,
    moneyWin: 50,
    maxReInit: 1,
    tilesGrid: {
        sizeX: 10,
        sizeY: 10,
        widthItem: 43,
        heightItem: 43,
        offsetX: 0,
        offsetY: 0,
        sideOffset: 12,
        containerSizeAuto: true,
        busters: {
            superTile: {
                radius: 2,
                code: 'super',
                countToActive: 4,
            },
            bombBuster: {
                radius: 2,
            }
        }
    },
    defaultGameData: {
        level: 1,
        currentScore: 0,
        money: 100,
    }
}