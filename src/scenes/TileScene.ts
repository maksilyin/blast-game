import Assets from '../classes/Assests';
import Register from '../classes/Register';
import GameLogic from "../classes/GameLogic";
import GameManager from "../classes/GameManager";
import Position from "../classes/Position";
import Sizes from "../classes/Sizes";
import TileGrid from "../gameObjects/TileGrid";

class TileScene extends Phaser.Scene {
    tileGrid: TileGrid

    constructor() {
        super({
            key: 'default'
        });
    }

    init = () => {
        Register.boxObjectsRegister();
    }
    preload = (): void => {
        this.load.image('tile-1', Assets.sprite('tile-blue.png'));
        this.load.image('tile-2', Assets.sprite('tile-green.png'));
        this.load.image('tile-3', Assets.sprite('tile-purple.png'));
        this.load.image('tile-4', Assets.sprite('tile-red.png'));
        this.load.image('tile-5', Assets.sprite('tile-yellow.png'));
        this.load.image('bomb', Assets.sprite('bomb.png'));
        this.load.image('super', Assets.sprite('bomb.png'));
        this.load.image('box-container', Assets.sprite('square-2.png'));
        this.load.image('white-block', Assets.sprite('white.png'));
        this.load.image('popupPanel', Assets.sprite('rectangle.png'));
        this.load.image('btnNext', Assets.sprite('rounded-rectangle-2.png'));
       // this.load.spritesheet('flares', require('@/assets/dude.png'), { frameWidth: 32, frameHeight: 48 })
        this.load.atlas('flares', Assets.sprite('flares.png'), Assets.sprite('flares.json'));
    }
    create = () => {
        this.tileGrid = this.add.tileGrid(265, 300, GameManager.config.tilesGrid, this.move, this.checkMoves);
        const size = Sizes.getSizeScale(this.tileGrid);
        const pos = Position.getOriginPosition(this.tileGrid);
        const y = pos.y + size.h;
        this.physics.world.setBounds(this.tileGrid.x, y - this.tileGrid.getSideOffset(), 800, 0, false, false, false, true)

        this.scene.launch('UIScene');

        this.checkAvailableMoves();
    }

    move = async (result: []) => {
        GameLogic.useMove(result);
        this.tileGrid.setState(1);

        await GameLogic.waite(this.tileGrid.getGrid());

        if (this.checkWin()) {
            this.scene.launch('WinScene');
            this.scene.pause('UIScene');
        }
        else if (GameManager.moves === 0) {
            this.scene.launch('LoseScene');
            this.scene.pause('UIScene');
        }
        else {
            this.tileGrid.setState(0);
        }

        this.checkAvailableMoves();
    }

    checkWin = (): boolean => {
        return GameManager.lvlScore >= GameManager.config.scoreWin;
    }

    checkMoves = (): boolean => {
        return GameManager.moves > 0;
    }

    checkAvailableMoves = () => {
        if (!GameLogic.availableMoves(this.tileGrid.getGrid(), this.tileGrid.getParams())) {
            if (GameManager.reInitCount) {
                GameLogic.reInit();
                this.checkAvailableMoves();
            }
            else {
                this.scene.launch('LoseScene');
                this.scene.pause('UIScene');
            }
        }
    }
}

export default TileScene;