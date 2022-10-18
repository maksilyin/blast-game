"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUIBuster_1 = __importDefault(require("./BaseUIBuster"));
class BombBuster extends BaseUIBuster_1.default {
    constructor(grid, params, callback) {
        var _a, _b;
        super();
        this._radius = 2;
        this.grid = grid;
        this.params = params;
        this.callback = callback;
        if ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.bonuses) === null || _b === void 0 ? void 0 : _b.bombBuster) {
            this.init();
        }
    }
    get radius() {
        return this._radius;
    }
    init() {
        const params = this.params.bonuses.bombBuster;
        if (params.radius) {
            this._radius = params.radius;
        }
    }
    action() {
        const gridItem = this.getFirstSelected();
        const arDestroy = this.getDestroy({ x: gridItem.posX, y: gridItem.posY });
        arDestroy.forEach((destroyItem) => {
            if (destroyItem.state < 2) {
                destroyItem.state = 2;
                destroyItem.action();
            }
        });
        this.clear();
        this.callback(arDestroy);
    }
    setRadius(radius) {
        this._radius = Math.max(0, radius);
    }
    getDestroy(center) {
        const width = this.params.widthItem;
        const height = this.params.heightItem;
        const rightX = center.x + width * this.radius;
        const bottomY = center.y + height * this.radius;
        const leftX = center.x - width * this.radius;
        const topY = center.y - height * this.radius;
        const arBoxes = this.grid.children.getArray();
        const arDestroy = arBoxes.filter((gridItem) => {
            if (gridItem.state > 0 ||
                ((gridItem.posY === topY && gridItem.posX === leftX)
                    || (gridItem.posY === bottomY && gridItem.posX === leftX)
                    || (gridItem.posY === topY && gridItem.posX === rightX)
                    || (gridItem.posY === bottomY && gridItem.posX === rightX))) {
                return false;
            }
            return (gridItem.posX <= rightX && gridItem.posX >= leftX
                && gridItem.posY >= topY && gridItem.posY <= bottomY);
        });
        arDestroy.forEach(destroyItem => {
            destroyItem.state = 1;
        });
        return arDestroy;
    }
}
exports.default = BombBuster;
//# sourceMappingURL=BombBuster.js.map