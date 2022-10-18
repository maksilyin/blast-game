"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
class Store {
    static load() {
        let data = localStorage.getItem('store');
        if (data) {
            data = JSON.parse(data);
            this.setData(data.gameData);
            this.setConfig(data.gameConfig);
            return;
        }
        Store.init();
    }
    static get data() {
        return Store.gameData;
    }
    static get config() {
        return Store.gameConfig;
    }
    static setData(data) {
        Store.gameData = Object.assign(Object.assign({}, Store.gameData), data);
    }
    static setConfig(newConfig = {}) {
        Store.gameConfig = Object.assign(Object.assign({}, Store.gameConfig), newConfig);
    }
    static saveData() {
        const data = {
            gameData: Store.gameData,
            config: Store.gameConfig,
        };
        localStorage.setItem('store', JSON.stringify(data));
    }
    static init() {
        Store.setData(Store.gameConfig.defaultGameData);
    }
}
exports.default = Store;
Store.gameData = {
    level: 1,
    currentScore: 0,
    money: 100
};
Store.gameConfig = Object.assign({}, config_1.default);
//# sourceMappingURL=Store.js.map