import Store from "./Store";
import Register from "./Register";
import IGameObjectCollection from "../interfaces/IGameObjectCollection";
import GameObjectsRegister from "./GameObjectsRegister";

import IGameData from "../interfaces/IGameData";
import BusterPanel from "../gameObjects/BusterPanel";

class GameManager {
    private static instance: GameManager;
    private gameData: IGameData;
    private activeBusterPanel: BusterPanel | null;
    private _config: any;
    private _lvlScore: number = 0;
    private _moves: number = 0;
    private _level: number = 1;
    private _reInit: number = 1;

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public saveGameData() {
        Store.setData(this.gameData);
        Store.saveData();
    }

    public get lvlScore(): number {
        return this._lvlScore;
    }

    public get moves(): number {
        return this._moves;
    }

    public get money(): number {
        return this.getData('money');
    }

    public get config(): any {
        return this._config;
    }

    public saveConfig() {
        Store.setConfig(this._config);
    }

    public getGameObject(key: string): Phaser.GameObjects.GameObject {
        return GameObjectsRegister.get(key);
    }

    public setScore(score: number) {
        this.gameData.currentScore += score;
        this._lvlScore += score;
    }

    public decrementMove() {
        this._moves = Math.max(0, this._moves - 1);
    }

    public getData(key: string) {
        return this.gameData[key];
    }

    public getConfig(key: string) {
        return this.config[key];
    }

    public restart() {
        this.lvlInit(this._level);
        Store.load();
        this.gameData = Store.data;
    }

    public lvlInit(level: number) {
        this._lvlScore = 0;
        this._moves = Math.max(0, this.getConfig('moves'));
        this._level = Math.max(1, level);
        this._reInit = this.getConfig('maxReInit');
    }

    public nextLvl() {
        this.lvlInit(++this._level);
        this.gameData.level = this._level;
        this.saveGameData();
    }

    private constructor() {
        Store.load();
        this.gameData = Store.data;
        this._config = Store.config;
        this.lvlInit(this.getData('level'));
    }

    public setMoney(count: number) {
        this.gameData.money = Math.max(0, count);
    }

    public getActiveBuster(): BusterPanel | null {
        return this.activeBusterPanel;
    }

    public setActiveBuster(busterPanel: BusterPanel | null) {
        if (this.activeBusterPanel) {
            this.activeBusterPanel.isActive = false;
        }
        this.activeBusterPanel = busterPanel;
    }

    public get reInitCount(): number {
        return this._reInit;
    }

    public useReInit(): void {
        this._reInit = Math.max(0, this._reInit - 1);
    }
}

export default GameManager.getInstance();