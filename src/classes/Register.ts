import ScorePanel from "../gameObjects/ScorePanel";
import MoneyPanel from "../gameObjects/MoneyPanel";
import GameObjectsRegister from "./GameObjectsRegister";
import TileGrid from "../gameObjects/TileGrid";
import Box from "../gameObjects/Box";
import ProgressBar from "../gameObjects/ProgressBar";
import MovesPanel from "../gameObjects/MovesPanel";
import IGridConfig from "../interfaces/IGridConfig";
import BusterPanel from "../gameObjects/BusterPanel";
import SuperTile from "../gameObjects/Busters/SuperTile";
import IGridItem from "../interfaces/IGridItem";

export default class Register {
    public static UIRegister(): void {
        Phaser.GameObjects.GameObjectFactory.register('scorePanel',
            function (
                this: any,
                x: number,
                y: number,
            ) {
                const scorePanel = new ScorePanel (this.scene, x, y);
                this.displayList.add(scorePanel);

                GameObjectsRegister.add('scorePanel', scorePanel);

                return scorePanel;
            });
        Phaser.GameObjects.GameObjectFactory.register('moneyPanel',
            function (
                this: any,
                x: number,
                y: number,
            ) {
                const moneyPanel = new MoneyPanel (this.scene, x, y);
                this.displayList.add(moneyPanel);

                GameObjectsRegister.add('moneyPanel', moneyPanel);

                return moneyPanel;
            });

        Phaser.GameObjects.GameObjectFactory.register('movesPanel',
            function (
                this: any,
                x: number,
                y: number,
            ) {
                const movesPanel = new MovesPanel (this.scene, x, y);
                this.displayList.add(movesPanel);

                GameObjectsRegister.add('movesPanel', movesPanel);

                return movesPanel;
            });

        Phaser.GameObjects.GameObjectFactory.register('progressBar',
            function (
                this: any,
                x: number,
                y: number,
            ) {
                const progressBar = new ProgressBar (this.scene, x, y);
                this.displayList.add(progressBar);

                GameObjectsRegister.add('progressBar', progressBar);

                return progressBar;
            });

        Phaser.GameObjects.GameObjectFactory.register('busterPanel',
            function (
                this: any,
                x: number,
                y: number,
                cost: number,
                icon: string,
            ) {
                const busterPanel = new BusterPanel (this.scene, x, y, cost, icon);
                this.displayList.add(busterPanel);

                GameObjectsRegister.add('busterPanel', busterPanel);

                return busterPanel;
            });
    }

    public static boxObjectsRegister(): void {
        Phaser.GameObjects.GameObjectFactory.register('tileGrid',
            function (
                this: any,
                x: number,
                y: number,
                params: IGridConfig,
                callback: Function,
                checkMiddleware: Function,
            ) {
                const tileGrid = new TileGrid(this.scene, x, y, params, callback, checkMiddleware);

                this.displayList.add(tileGrid);

                GameObjectsRegister.add('tileGrid', tileGrid);

                return tileGrid;
            });

        Phaser.GameObjects.GameObjectFactory.register('box',
            function (
                this: any,
                x: number,
                y: number,
            ) {
                const box = new Box(this.scene, x, y);

                this.displayList.add(box);

                return box;
            });

        Phaser.GameObjects.GameObjectFactory.register('superTile',
            function (
                this: any,
                x: number,
                y: number,
                grid: Phaser.Physics.Arcade.Group,
                params: IGridConfig,
                callback: Function,
                itemReplace: IGridItem
            ) {
                const superTile = new SuperTile(this.scene, x, y, grid, params, callback, itemReplace);

                this.displayList.add(superTile);

                return superTile;
            });
    }
}