"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container = Phaser.GameObjects.Container;
var Image = Phaser.GameObjects.Image;
var Text = Phaser.GameObjects.Text;
const Store_1 = __importDefault(require("../classes/Store"));
const phaser3_ninepatch_1 = require("@koreez/phaser3-ninepatch");
class ProgressBar extends Container {
    constructor(scene, x, y, percent) {
        super(scene, x, y);
        this.percent = 0;
        this._width = 0;
        if (percent) {
            this.percent = percent;
        }
        this.setScale(Store_1.default.config.scale);
        this.progressPanel = new Image(scene, 0, 0, 'progress-panel');
        this.progressField = new Image(scene, 0, 30, 'progress-field');
        this.progress = new phaser3_ninepatch_1.NinePatch(scene, 45, 28, 90, 85, 'progress', 0, {
            top: 0,
            bottom: 0,
            left: 45,
            right: 45
        });
        const markProgress = new Text(scene, 0, -90, 'прогресс:', { fontFamily: Store_1.default.config.font, fontSize: '8em' })
            .setOrigin(0.5, 0.5);
        this.setProgress();
        this.add([
            this.progressPanel,
            this.progressField,
            this.progress,
            markProgress
        ]);
    }
    setProgress() {
        if (this.percent) {
            this.progress.setVisible(true);
            this._width = Math.max(this.progress.width, this.progressField.width * this.percent / 100);
            //this.progress.setX(-(this.progressField.width / 2 - width / 2));
            // this.progress.resize(width, this.progress.height);
        }
        else {
            this.progress.setVisible(false);
        }
    }
    setPercent(percent) {
        this.percent = Math.min(100, percent);
        this.setProgress();
    }
    getWidth() {
        return this._width;
    }
}
exports.default = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map