"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container = Phaser.GameObjects.Container;
var Image = Phaser.GameObjects.Image;
var Text = Phaser.GameObjects.Text;
const Store_1 = __importDefault(require("../classes/Store"));
class BusterPanel extends Container {
    constructor(scene, x, y, cost, icon) {
        super(scene, x, y);
        this._cost = 0;
        this._active = false;
        this.sizeActive = 0.02;
        this.setScale(0.31);
        this._cost = cost;
        this.bonusPanel = new Image(scene, 0, 0, 'bonus-panel');
        this.moneyField = new Image(scene, 0, 90, 'purple-field');
        this.moneyIcon = new Image(scene, 85, 90, 'money');
        this.moneyIcon.displayWidth = 70;
        this.moneyIcon.displayHeight = 70;
        this.icon = new Image(scene, 0, -70, icon);
        this.countText = new Text(scene, -30, 85, String(this.cost), { fontFamily: Store_1.default.config.font, fontSize: '8em' })
            .setOrigin(0.5, 0.5);
        this.add([
            this.bonusPanel,
            this.icon,
            this.moneyField,
            this.moneyIcon,
            this.countText,
        ]);
        this.sizeDefault = this.scale;
        this.setSize(this.bonusPanel.width, this.bonusPanel.height);
    }
    setDefaultSize() {
        this.setScale(this.sizeDefault - 0.01);
    }
    get cost() {
        return this._cost;
    }
    get buster() {
        return this._buster;
    }
    set buster(buster) {
        this._buster = buster;
        this._buster.setBusterPanel(this);
    }
    set isActive(value) {
        if (value) {
            console.log(this.sizeDefault + this.sizeActive);
            this.setScale(this.sizeDefault + this.sizeActive);
        }
        else {
            this._buster.clear();
            this.setDefaultSize();
        }
        this._active = value;
    }
    get isActive() {
        return this._active;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    useCallback() {
        if (this.callback) {
            this.callback();
        }
    }
}
exports.default = BusterPanel;
//# sourceMappingURL=BusterPanel.js.map