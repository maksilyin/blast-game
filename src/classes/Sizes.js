"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sizes {
    static setSize(gameObject, width, height) {
        gameObject.displayWidth = width;
        gameObject.displayHeight = height;
    }
    static getScale(gameObject, width, height) {
        const size = {
            x: 0,
            y: 0,
        };
        size.x = width / gameObject.width;
        size.y = height / gameObject.height;
        return size;
    }
    static getSizeScale(gameObject) {
        const size = { w: 0, h: 0 };
        if (gameObject) {
            size.w = gameObject.width * gameObject.scaleX;
            size.h = gameObject.height * gameObject.scaleY;
        }
        return size;
    }
}
exports.default = Sizes;
//# sourceMappingURL=Sizes.js.map