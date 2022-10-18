"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = __importDefault(require("./GameManager"));
const Store_1 = __importDefault(require("./Store"));
const BaseBuster_1 = __importDefault(require("../gameObjects/BaseBuster"));
class GameLogic {
    static useMove(result) {
        GameManager_1.default.decrementMove();
        let moves = GameManager_1.default.moves;
        let score = Math.floor(result.length * Store_1.default.config.scoreNum);
        GameLogic.setMove(moves);
        GameLogic.setScore(score);
        GameLogic.setProgress();
    }
    static setScore(score) {
        GameManager_1.default.setScore(score);
        const scorePanel = GameManager_1.default.getGameObject('scorePanel');
        const currentScore = GameManager_1.default.getData('currentScore');
        scorePanel.scoreText.setText(String(currentScore));
    }
    static setMove(moves) {
        const movesPanel = GameManager_1.default.getGameObject('movesPanel');
        movesPanel.moneyText.setText(String(moves));
    }
    static setProgress() {
        const progressBar = GameManager_1.default.getGameObject('progressBar');
        const lvlScore = GameManager_1.default.lvlScore;
        const scoreWin = GameManager_1.default.getConfig('scoreWin');
        const percent = lvlScore * 100 / scoreWin;
        progressBar.setPercent(percent);
    }
    static useMoney(count) {
        let money = count;
        return () => {
            money = GameManager_1.default.getData('money') - count;
            GameManager_1.default.setMoney(money);
            GameLogic.setMoney(money);
        };
    }
    static setMoney(money) {
        const moneyPanel = GameManager_1.default.getGameObject('moneyPanel');
        moneyPanel.setMoney(money);
    }
    static initBuster(busterClassName, busterPanel) {
        const tileGrid = GameManager_1.default.getGameObject('tileGrid');
        const buster = new busterClassName(tileGrid.getGrid(), tileGrid.getParams(), tileGrid.getCallback());
        busterPanel.buster = buster;
        busterPanel.setCallback(GameLogic.useMoney(busterPanel.cost));
        busterPanel.setInteractive();
        busterPanel.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                if (busterPanel.isActive) {
                    busterPanel.isActive = false;
                    GameManager_1.default.setActiveBuster(null);
                    tileGrid.unsetBuster();
                }
                else if (GameManager_1.default.money >= busterPanel.cost) {
                    tileGrid.setBuster(busterPanel.buster);
                    GameManager_1.default.setActiveBuster(busterPanel);
                    busterPanel.isActive = true;
                }
            }
        });
    }
    static initNextLvl() {
        GameManager_1.default.setMoney(GameManager_1.default.money + Store_1.default.config.moneyWin);
        GameManager_1.default.nextLvl();
        GameLogic.setLvl();
        GameLogic.setMoney(GameManager_1.default.money);
        const tileGrid = GameManager_1.default.getGameObject('tileGrid');
        tileGrid.reInitGrid();
        GameLogic.setProgress();
        GameLogic.setMove(GameManager_1.default.moves);
    }
    static setLvl() {
        const scorePanel = GameManager_1.default.getGameObject('scorePanel');
        const lvl = GameManager_1.default.getData('level');
        scorePanel.lvlText.setText(String(lvl));
    }
    static restart() {
        GameManager_1.default.restart();
        const tileGrid = GameManager_1.default.getGameObject('tileGrid');
        tileGrid.reInitGrid();
        GameLogic.setProgress();
        GameLogic.setMove(GameManager_1.default.moves);
    }
    static reInit() {
        const tileGrid = GameManager_1.default.getGameObject('tileGrid');
        tileGrid.reInitGrid();
        GameManager_1.default.useReInit();
    }
    static availableMoves(grid, params) {
        let result = false;
        const width = params.widthItem;
        const height = params.heightItem;
        const gridItems = grid.children.getArray();
        for (let i = 0; i < gridItems.length; i++) {
            const rightX = gridItems[i].posX + width;
            const bottomY = gridItems[i].posY + height;
            const leftX = gridItems[i].posX - width;
            const topY = gridItems[i].posY - height;
            if (gridItems[i] instanceof BaseBuster_1.default) {
                result = true;
                break;
            }
            const groups = gridItems.filter((nextItem) => {
                if (nextItem.itemType !== gridItems[i].itemType || nextItem.id === gridItems[i].id) {
                    return false;
                }
                return ((nextItem.posX == rightX && nextItem.posY == gridItems[i].posY)
                    || (nextItem.posX == leftX && nextItem.posY == gridItems[i].posY)
                    || (nextItem.posX == gridItems[i].posX && nextItem.posY == bottomY)
                    || (nextItem.posX == gridItems[i].posX && nextItem.posY == topY));
            });
            if (groups.length) {
                result = true;
                break;
            }
        }
        return result;
    }
    static waite(grid) {
        const arGridItems = grid.children.getArray();
        return new Promise(resolve => {
            setTimeout(() => {
                const interval = setInterval(() => {
                    let stop = true;
                    arGridItems.forEach(gridItem => {
                        if (gridItem.body && gridItem.body.velocity.y > 0) {
                            stop = false;
                        }
                    });
                    if (stop) {
                        clearInterval(interval);
                        resolve(true);
                    }
                }, 100);
            }, 600);
        });
    }
}
exports.default = GameLogic;
//# sourceMappingURL=GameLogic.js.map