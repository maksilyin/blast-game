import GameManager from "./GameManager";
import ScorePanel from "../gameObjects/ScorePanel";
import ProgressBar from "../gameObjects/ProgressBar";
import Store from "./Store";
import MovesPanel from "../gameObjects/MovesPanel";
import BusterPanel from "../gameObjects/BusterPanel";
import TileGrid from "../gameObjects/TileGrid";
import MoneyPanel from "../gameObjects/MoneyPanel";
import IGridConfig from "../interfaces/IGridConfig";
import IGridItem from "../interfaces/IGridItem";
import BaseBuster from "../gameObjects/BaseBuster";

export default class GameLogic {

    public static useMove(result: []) {
        GameManager.decrementMove();

        let moves = GameManager.moves;
        let score = Math.floor(result.length * Store.config.scoreNum);

        GameLogic.setMove(moves);
        GameLogic.setScore(score);
        GameLogic.setProgress();
    }

    public static setScore(score: number) {
        GameManager.setScore(score);

        const scorePanel = <ScorePanel> GameManager.getGameObject('scorePanel');
        const currentScore: number = GameManager.getData('currentScore');

        scorePanel.scoreText.setText(String(currentScore));
    }

    public static setMove(moves: number) {
        const movesPanel = <MovesPanel>GameManager.getGameObject('movesPanel');
        movesPanel.moneyText.setText(String(moves));
    }

    public static setProgress() {
        const progressBar = <ProgressBar>GameManager.getGameObject('progressBar');
        const lvlScore: number = GameManager.lvlScore;
        const scoreWin: number = GameManager.getConfig('scoreWin');
        const percent: number = lvlScore * 100 / scoreWin;

        progressBar.setPercent(percent);
    }

    public static useMoney(count: number) {
        let money: number = count;

        return () => {
            money = GameManager.getData('money') - count;
            GameManager.setMoney(money);
            GameLogic.setMoney(money);
        }
    }

    public static setMoney(money: number) {
        const moneyPanel = <MoneyPanel>GameManager.getGameObject('moneyPanel');
        moneyPanel.setMoney(money);
    }

    public static initBuster(busterClassName: any, busterPanel: BusterPanel) {
        const tileGrid = <TileGrid> GameManager.getGameObject('tileGrid');
        const buster = new busterClassName(tileGrid.getGrid(), tileGrid.getParams(), tileGrid.getCallback());

        busterPanel.buster = buster;
        busterPanel.setCallback(GameLogic.useMoney(busterPanel.cost));
        busterPanel.setInteractive();

        busterPanel.on('pointerdown',  (pointer: any) => {
            if (pointer.leftButtonDown()) {
                if (busterPanel.isActive) {
                    busterPanel.isActive = false;
                    GameManager.setActiveBuster(null);
                    tileGrid.unsetBuster();
                }
                else if (GameManager.money >= busterPanel.cost) {
                    tileGrid.setBuster(busterPanel.buster);
                    GameManager.setActiveBuster(busterPanel);
                    busterPanel.isActive = true;
                }
            }
        });
    }

    public static initNextLvl() {
        GameManager.setMoney(GameManager.money + Store.config.moneyWin);
        GameManager.nextLvl();
        GameLogic.setLvl();
        GameLogic.setMoney(GameManager.money)

        const tileGrid = <TileGrid>GameManager.getGameObject('tileGrid')
        tileGrid.reInitGrid();
        GameLogic.setProgress();
        GameLogic.setMove(GameManager.moves);
    }

    public static setLvl() {
        const scorePanel = <ScorePanel> GameManager.getGameObject('scorePanel');
        const lvl: number = GameManager.getData('level');
        scorePanel.lvlText.setText(String(lvl));
    }

    public static restart() {
        GameManager.restart();
        const tileGrid = <TileGrid>GameManager.getGameObject('tileGrid')
        tileGrid.reInitGrid();
        GameLogic.setProgress();
        GameLogic.setMove(GameManager.moves);
    }

    public static reInit(): void {
        const tileGrid = <TileGrid>GameManager.getGameObject('tileGrid')
        tileGrid.reInitGrid();
        GameManager.useReInit();
    }

    public static availableMoves(grid: Phaser.Physics.Arcade.Group, params: IGridConfig): boolean {
        let result = false;
        const width = params.widthItem;
        const height = params.heightItem;

        const gridItems = <Array<IGridItem>> grid.children.getArray();

        for (let i = 0; i < gridItems.length; i++) {
            const rightX = gridItems[i].posX + width;
            const bottomY = gridItems[i].posY + height;
            const leftX = gridItems[i].posX - width;
            const topY = gridItems[i].posY - height;

            if (gridItems[i] instanceof BaseBuster) {
                result = true;
                break;
            }

            const groups = gridItems.filter((nextItem: IGridItem) => {
                if (
                    nextItem.itemType !== gridItems[i].itemType || nextItem.id === gridItems[i].id
                ) {
                    return false;
                }

                return (
                    (nextItem.posX == rightX && nextItem.posY == gridItems[i].posY)
                    || (nextItem.posX == leftX && nextItem.posY == gridItems[i].posY)
                    || (nextItem.posX == gridItems[i].posX && nextItem.posY == bottomY)
                    || (nextItem.posX == gridItems[i].posX && nextItem.posY == topY)
                );
            });

            if (groups.length) {
                result = true;
                break;
            }
        }

        return result;
    }

    public static waite(grid: Phaser.Physics.Arcade.Group) {
        const arGridItems: Array<IGridItem> = <Array<IGridItem>>grid.children.getArray();

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
        })
    }
}