"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = __importDefault(require("../classes/Store"));
var Container = Phaser.GameObjects.Container;
var Image = Phaser.GameObjects.Image;
var Text = Phaser.GameObjects.Text;
class MovesPanel extends Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.setScale(Store_1.default.config.scale);
        this.movesPanel = new Image(scene, 0, 0, 'red-rounded-panel');
        this.movesIcon = new Image(scene, -170, 0, 'money');
        this.moneyText = new Text(scene, 20, -10, Store_1.default.config.moves, { fontFamily: Store_1.default.config.font, fontSize: '10em' })
            .setOrigin(0.5, 0.5);
        this.add([
            this.movesPanel,
            this.moneyText,
            this.movesIcon
        ]);
    }
}
exports.default = MovesPanel;
//# sourceMappingURL=MovesPanel.js.map