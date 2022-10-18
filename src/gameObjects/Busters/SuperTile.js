"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseBuster_1 = __importDefault(require("../BaseBuster"));
class SuperTile extends BaseBuster_1.default {
    constructor(scene, x, y, grid, params, callback, itemReplace) {
        super(scene, x, y, grid, params, callback, itemReplace);
        this.horizontal = true;
        this._code = 'super';
        this.grid = grid;
        this.params = params;
        this.callback = callback;
        this.setTexture(this.code);
    }
    changeDirection(current) {
        this.horizontal = !current;
    }
    action() {
        const arDestroy = this.getDestroy();
        this.animDestroy();
        this.state = 2;
        arDestroy.forEach((destroyItem) => {
            if (destroyItem.state < 2) {
                destroyItem.state = 2;
                if (destroyItem instanceof SuperTile) {
                    destroyItem.changeDirection(this.horizontal);
                }
                destroyItem.action();
            }
        });
        this.callback(arDestroy);
    }
    animDestroy() {
        const emitter = this.getEmitter();
        this.visible = false;
        setTimeout(() => {
            if (this.itemReplace) {
                this.itemReplace.setPosition(this.x, this.itemReplace.y);
                this.itemReplace.activeItem();
            }
            this.destroy(true);
        }, 200);
        setTimeout(() => {
            emitter.remove();
        }, 600);
    }
    getDestroy() {
        const posX = this.posX;
        const posY = this.posY;
        const arBoxes = this.grid.children.getArray();
        const arDestroy = arBoxes.filter((gridItem) => {
            if (gridItem.state > 0) {
                return false;
            }
            if (this.horizontal) {
                return gridItem.posY === posY;
            }
            else {
                return gridItem.posX === posX;
            }
        });
        arDestroy.forEach(destroyItem => {
            destroyItem.state = 1;
        });
        return arDestroy;
    }
}
exports.default = SuperTile;
//# sourceMappingURL=SuperTile.js.map