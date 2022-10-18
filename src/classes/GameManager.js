"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = __importDefault(require("./Store"));
const GameObjectsRegister_1 = __importDefault(require("./GameObjectsRegister"));
class GameManager {
    constructor() {
        this._lvlScore = 0;
        this._moves = 0;
        this._level = 1;
        this._reInit = 1;
        Store_1.default.load();
        this.gameData = Store_1.default.data;
        this._config = Store_1.default.config;
        this.lvlInit(this.getData('level'));
    }
    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    saveGameData() {
        Store_1.default.setData(this.gameData);
        Store_1.default.saveData();
    }
    get lvlScore() {
        return this._lvlScore;
    }
    get moves() {
        return this._moves;
    }
    get money() {
        return this.getData('money');
    }
    get config() {
        return this._config;
    }
    saveConfig() {
        Store_1.default.setConfig(this._config);
    }
    getGameObject(key) {
        return GameObjectsRegister_1.default.get(key);
    }
    setScore(score) {
        this.gameData.currentScore += score;
        this._lvlScore += score;
    }
    decrementMove() {
        this._moves = Math.max(0, this._moves - 1);
    }
    getData(key) {
        return this.gameData[key];
    }
    getConfig(key) {
        return this.config[key];
    }
    restart() {
        this.lvlInit(this._level);
        Store_1.default.load();
        this.gameData = Store_1.default.data;
    }
    lvlInit(level) {
        this._lvlScore = 0;
        this._moves = Math.max(0, this.getConfig('moves'));
        this._level = Math.max(1, level);
        this._reInit = this.getConfig('maxReInit');
    }
    nextLvl() {
        this.lvlInit(++this._level);
        this.gameData.level = this._level;
        this.saveGameData();
    }
    setMoney(count) {
        this.gameData.money = Math.max(0, count);
    }
    getActiveBuster() {
        return this.activeBusterPanel;
    }
    setActiveBuster(busterPanel) {
        if (this.activeBusterPanel) {
            this.activeBusterPanel.isActive = false;
        }
        this.activeBusterPanel = busterPanel;
    }
    get reInitCount() {
        return this._reInit;
    }
    useReInit() {
        this._reInit = Math.max(0, this._reInit - 1);
    }
}
exports.default = GameManager.getInstance();
//# sourceMappingURL=GameManager.js.map