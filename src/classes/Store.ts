import defaultConfig from "../config";
import IGameData from "../interfaces/IGameData";

export default class Store {
    private static gameData: IGameData = {
        level: 1,
        currentScore: 0,
        money: 100
    }

    private static gameConfig: any = {...defaultConfig};

    public static load() {
        let data: any = localStorage.getItem('store');

        if (data) {
            data = JSON.parse(data);
            this.setData(data.gameData);
            this.setConfig(data.gameConfig);

            return;
        }
        Store.init();
    }

    public static get data(): IGameData {
        return Store.gameData;
    }

    public static get config(): any {
        return Store.gameConfig;
    }

    public static setData(data: IGameData) {
        Store.gameData = { ...Store.gameData, ...data };
    }

    public static setConfig(newConfig: object = {}) {
        Store.gameConfig = {...Store.gameConfig, ...newConfig};
    }

    public static saveData() {
        const data = {
            gameData: Store.gameData,
            config: Store.gameConfig,
        };
        localStorage.setItem('store', JSON.stringify(data));
    }

    public static init() {
        Store.setData(Store.gameConfig.defaultGameData)
    }
}