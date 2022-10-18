"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameObjectsRegister {
    static add(key, gameObject) {
        this.gameObjectCollection[key] = gameObject;
    }
    static get(key) {
        return this.gameObjectCollection[key] || false;
    }
}
exports.default = GameObjectsRegister;
GameObjectsRegister.gameObjectCollection = {};
//# sourceMappingURL=GameObjectsRegister.js.map