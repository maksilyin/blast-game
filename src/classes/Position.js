"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sizes_1 = __importDefault(require("./Sizes"));
class Position {
    static getCenter(gameObject) {
        const vector = { x: 0, y: 0 };
        if (gameObject) {
            const pos = Position.getOriginPosition(gameObject);
            const size = Sizes_1.default.getSizeScale(gameObject);
            vector.x = pos.x + size.w / 2;
            vector.y = pos.y + size.h / 2;
        }
        return vector;
    }
    static getBottom(gameObject) {
        if (!gameObject) {
            return 0;
        }
        const pos = Position.getOriginPosition(gameObject);
        const size = Sizes_1.default.getSizeScale(gameObject);
        return pos.y + size.h;
    }
    static getOriginPosition(gameObject) {
        const vector = { x: 0, y: 0 };
        if (gameObject) {
            const size = Sizes_1.default.getSizeScale(gameObject);
            vector.x = gameObject.x - gameObject.originX * size.w;
            vector.y = gameObject.y - gameObject.originY * size.h;
        }
        return vector;
    }
}
exports.default = Position;
//# sourceMappingURL=Position.js.map