import IGameObjectCollection from "../interfaces/IGameObjectCollection";

export default class GameObjectsRegister {
    private static gameObjectCollection: IGameObjectCollection = {};

    public static add(key: string, gameObject: Phaser.GameObjects.GameObject) {
        this.gameObjectCollection[key] = gameObject;
    }

    public static get(key: string): any {
        return this.gameObjectCollection[key] || false;
    }
}