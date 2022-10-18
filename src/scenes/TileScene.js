"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Assests_1 = __importDefault(require("../classes/Assests"));
const Register_1 = __importDefault(require("../classes/Register"));
const GameLogic_1 = __importDefault(require("../classes/GameLogic"));
const GameManager_1 = __importDefault(require("../classes/GameManager"));
const Position_1 = __importDefault(require("../classes/Position"));
const Sizes_1 = __importDefault(require("../classes/Sizes"));
class TileScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'default'
        });
        this.init = () => {
            Register_1.default.boxObjectsRegister();
        };
        this.preload = () => {
            this.load.image('tile-1', Assests_1.default.sprite('tile-blue.png'));
            this.load.image('tile-2', Assests_1.default.sprite('tile-green.png'));
            this.load.image('tile-3', Assests_1.default.sprite('tile-purple.png'));
            this.load.image('tile-4', Assests_1.default.sprite('tile-red.png'));
            this.load.image('tile-5', Assests_1.default.sprite('tile-yellow.png'));
            this.load.image('bomb', Assests_1.default.sprite('bomb.png'));
            this.load.image('super', Assests_1.default.sprite('bomb.png'));
            this.load.image('box-container', Assests_1.default.sprite('square-2.png'));
            this.load.image('white-block', Assests_1.default.sprite('white.png'));
            this.load.image('popupPanel', Assests_1.default.sprite('rectangle.png'));
            this.load.image('btnNext', Assests_1.default.sprite('rounded-rectangle-2.png'));
            // this.load.spritesheet('flares', require('@/assets/dude.png'), { frameWidth: 32, frameHeight: 48 })
            this.load.atlas('flares', Assests_1.default.sprite('flares.png'), Assests_1.default.sprite('flares.json'));
        };
        this.create = () => {
            this.tileGrid = this.add.tileGrid(265, 300, GameManager_1.default.config.tilesGrid, this.move, this.checkMoves);
            const size = Sizes_1.default.getSizeScale(this.tileGrid);
            const pos = Position_1.default.getOriginPosition(this.tileGrid);
            const y = pos.y + size.h;
            this.physics.world.setBounds(this.tileGrid.x, y - this.tileGrid.getSideOffset(), 800, 0, false, false, false, true);
            this.scene.launch('UIScene');
            this.checkAvailableMoves();
        };
        this.move = (result) => __awaiter(this, void 0, void 0, function* () {
            GameLogic_1.default.useMove(result);
            this.tileGrid.setState(1);
            yield GameLogic_1.default.waite(this.tileGrid.getGrid());
            if (this.checkWin()) {
                this.scene.launch('WinScene');
                this.scene.pause('UIScene');
            }
            else if (GameManager_1.default.moves === 0) {
                this.scene.launch('LoseScene');
                this.scene.pause('UIScene');
            }
            else {
                this.tileGrid.setState(0);
            }
            this.checkAvailableMoves();
        });
        this.checkWin = () => {
            return GameManager_1.default.lvlScore >= GameManager_1.default.config.scoreWin;
        };
        this.checkMoves = () => {
            return GameManager_1.default.moves > 0;
        };
        this.checkAvailableMoves = () => {
            if (!GameLogic_1.default.availableMoves(this.tileGrid.getGrid(), this.tileGrid.getParams())) {
                if (GameManager_1.default.reInitCount) {
                    GameLogic_1.default.reInit();
                    this.checkAvailableMoves();
                }
                else {
                    this.scene.launch('LoseScene');
                    this.scene.pause('UIScene');
                }
            }
        };
    }
}
exports.default = TileScene;
//# sourceMappingURL=TileScene.js.map