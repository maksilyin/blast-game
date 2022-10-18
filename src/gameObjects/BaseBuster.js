"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGridItem_1 = __importDefault(require("./BaseGridItem"));
class BaseBuster extends BaseGridItem_1.default {
    constructor(scene, x, y, grid, params, callback, itemReplace) {
        super(scene, x, y);
        this.grid = grid;
        this.params = params;
        this.callback = callback;
        this.itemReplace = itemReplace;
    }
}
exports.default = BaseBuster;
//# sourceMappingURL=BaseBuster.js.map