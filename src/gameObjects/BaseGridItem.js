"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = __importDefault(require("../classes/GameManager"));
class BaseGridItem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, '');
        this._id = 0;
        this._config = GameManager_1.default.config;
        this._code = 'grid_item';
        this._particles = this.scene.add.particles('flares').setDepth(2);
    }
    activeItem() {
        this.body.enable = true;
    }
    disable() {
        this.body.enable = false;
    }
    get posX() {
        return Math.round(this.x);
    }
    get posY() {
        return Math.round(this.y);
    }
    get config() {
        return this._config;
    }
    get code() {
        return this._code;
    }
    get id() {
        return this._id;
    }
    get particles() {
        return this._particles;
    }
    get itemType() {
        return this._type;
    }
    getEmitter(config) {
        const pos = this.getCenter();
        if (!config) {
            config = {
                frame: { frames: ['yellow'], cycle: true },
                x: pos.x,
                y: pos.y,
                lifespan: 1000,
                speed: { min: 15, max: 15 },
                scale: { start: 0.1, end: 0.1 },
                gravity: 10,
                quantity: 2,
                blendMode: 'ADD',
                maxVelocityY: 20,
                maxVelocityX: 20
            };
        }
        return this.particles.createEmitter(config);
    }
    set code(value) {
        this._code = value;
    }
    setId(id) {
        this._id = id;
    }
    getType() {
        return this._type;
    }
    resetState() {
        this.state = 0;
    }
    action() { }
}
exports.default = BaseGridItem;
//# sourceMappingURL=BaseGridItem.js.map