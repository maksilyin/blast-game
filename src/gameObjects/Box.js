"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGridItem_1 = __importDefault(require("./BaseGridItem"));
class Box extends BaseGridItem_1.default {
    constructor(scene, x, y, id, type) {
        super(scene, x, y);
        this._code = 'box';
        if (!type) {
            this.initType();
        }
        if (id) {
            this._id = id;
        }
        this.setTexture(this.getTexture());
    }
    initType() {
        this._type = Math.floor(Math.random() * (this.config.boxTypes) + 1);
    }
    getTexture() {
        if (!this._type) {
            return '';
        }
        return this.config.boxTexturePrefix + this._type;
    }
    animDestroy() {
        const emitter = this.getEmitter();
        this.visible = false;
        setTimeout(() => {
            this.reInit(this.x, -43);
        }, 200);
        setTimeout(() => {
            emitter.remove();
        }, 600);
    }
    reInit(x, y) {
        this.initType();
        this.setTexture(this.getTexture());
        this.setPosition(x, y);
        this.resetState();
        this.visible = true;
    }
    action() {
        this.animDestroy();
    }
}
exports.default = Box;
//# sourceMappingURL=Box.js.map