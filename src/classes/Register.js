"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScorePanel_1 = __importDefault(require("../gameObjects/ScorePanel"));
const MoneyPanel_1 = __importDefault(require("../gameObjects/MoneyPanel"));
const GameObjectsRegister_1 = __importDefault(require("./GameObjectsRegister"));
const TileGrid_1 = __importDefault(require("../gameObjects/TileGrid"));
const Box_1 = __importDefault(require("../gameObjects/Box"));
const ProgressBar_1 = __importDefault(require("../gameObjects/ProgressBar"));
const MovesPanel_1 = __importDefault(require("../gameObjects/MovesPanel"));
const BusterPanel_1 = __importDefault(require("../gameObjects/BusterPanel"));
const SuperTile_1 = __importDefault(require("../gameObjects/Busters/SuperTile"));
class Register {
    static UIRegister() {
        Phaser.GameObjects.GameObjectFactory.register('scorePanel', function (x, y) {
            const scorePanel = new ScorePanel_1.default(this.scene, x, y);
            this.displayList.add(scorePanel);
            GameObjectsRegister_1.default.add('scorePanel', scorePanel);
            return scorePanel;
        });
        Phaser.GameObjects.GameObjectFactory.register('moneyPanel', function (x, y) {
            const moneyPanel = new MoneyPanel_1.default(this.scene, x, y);
            this.displayList.add(moneyPanel);
            GameObjectsRegister_1.default.add('moneyPanel', moneyPanel);
            return moneyPanel;
        });
        Phaser.GameObjects.GameObjectFactory.register('movesPanel', function (x, y) {
            const movesPanel = new MovesPanel_1.default(this.scene, x, y);
            this.displayList.add(movesPanel);
            GameObjectsRegister_1.default.add('movesPanel', movesPanel);
            return movesPanel;
        });
        Phaser.GameObjects.GameObjectFactory.register('progressBar', function (x, y) {
            const progressBar = new ProgressBar_1.default(this.scene, x, y);
            this.displayList.add(progressBar);
            GameObjectsRegister_1.default.add('progressBar', progressBar);
            return progressBar;
        });
        Phaser.GameObjects.GameObjectFactory.register('busterPanel', function (x, y, cost, icon) {
            const busterPanel = new BusterPanel_1.default(this.scene, x, y, cost, icon);
            this.displayList.add(busterPanel);
            GameObjectsRegister_1.default.add('busterPanel', busterPanel);
            return busterPanel;
        });
    }
    static boxObjectsRegister() {
        Phaser.GameObjects.GameObjectFactory.register('tileGrid', function (x, y, params, callback, checkMiddleware) {
            const tileGrid = new TileGrid_1.default(this.scene, x, y, params, callback, checkMiddleware);
            this.displayList.add(tileGrid);
            GameObjectsRegister_1.default.add('tileGrid', tileGrid);
            return tileGrid;
        });
        Phaser.GameObjects.GameObjectFactory.register('box', function (x, y) {
            const box = new Box_1.default(this.scene, x, y);
            this.displayList.add(box);
            return box;
        });
        Phaser.GameObjects.GameObjectFactory.register('superTile', function (x, y, grid, params, callback, itemReplace) {
            const superTile = new SuperTile_1.default(this.scene, x, y, grid, params, callback, itemReplace);
            this.displayList.add(superTile);
            return superTile;
        });
    }
}
exports.default = Register;
//# sourceMappingURL=Register.js.map