"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container = Phaser.GameObjects.Container;
var Image = Phaser.GameObjects.Image;
var Text = Phaser.GameObjects.Text;
const Store_1 = __importDefault(require("../classes/Store"));
class ScorePanel extends Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.setScale(Store_1.default.config.scale);
        this.scorePanel = new Image(scene, 0, 0, 'score-panel');
        this.lvlPanel = new Image(scene, 0, -180, 'lvl-ellipse');
        this.scoreField = new Image(scene, 0, 270, 'score-field');
        this.lvlText = new Text(scene, 0, -200, '1', { fontFamily: Store_1.default.config.font, fontSize: '22em' })
            .setOrigin(0.5, 0.5);
        this.scoreText = new Text(scene, 0, 320, '0', { fontFamily: Store_1.default.config.font, fontSize: '14em' })
            .setOrigin(0.5, 0.5);
        const markScore = new Text(scene, 0, 200, 'очки:', { fontFamily: Store_1.default.config.font, fontSize: '8em' })
            .setOrigin(0.5, 0.5);
        this.add([
            this.scorePanel,
            this.lvlPanel,
            this.scoreField,
            this.lvlText,
            this.scoreText,
            markScore,
        ]);
    }
}
exports.default = ScorePanel;
//# sourceMappingURL=ScorePanel.js.map