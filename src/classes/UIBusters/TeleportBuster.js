"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUIBuster_1 = __importDefault(require("./BaseUIBuster"));
class TeleportBuster extends BaseUIBuster_1.default {
    constructor(grid, params, callback) {
        super();
        this._needCount = 2;
        this.grid = grid;
        this.params = params;
        this.callback = callback;
    }
    action() {
        const gridItemFirst = this.getFirstSelected();
        const gridItemSecond = this.selected[1];
        const x1 = gridItemFirst.x;
        const y1 = gridItemFirst.y;
        const x2 = gridItemSecond.x;
        const y2 = gridItemSecond.y;
        gridItemFirst.setPosition(x2, y2);
        gridItemSecond.setPosition(x1, y1);
        this.clear();
    }
}
exports.default = TeleportBuster;
//# sourceMappingURL=TeleportBuster.js.map