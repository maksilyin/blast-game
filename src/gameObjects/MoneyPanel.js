"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container = Phaser.GameObjects.Container;
var Image = Phaser.GameObjects.Image;
var Text = Phaser.GameObjects.Text;
const Store_1 = __importDefault(require("../classes/Store"));
class MoneyPanel extends Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.setScale(Store_1.default.config.scale);
        this.moneyPanel = new Image(scene, 0, 0, 'purple-rounded-panel');
        this.moneyIcon = new Image(scene, -200, 0, 'money');
        this.moneyText = new Text(scene, 30, -10, String(Store_1.default.data.money), { fontFamily: Store_1.default.config.font, fontSize: '10em' })
            .setOrigin(0.5, 0.5);
        this.add([
            this.moneyPanel,
            this.moneyIcon,
            this.moneyText,
        ]);
    }
    setMoney(count) {
        this.moneyText.setText(String(count));
    }
}
exports.default = MoneyPanel;
//# sourceMappingURL=MoneyPanel.js.map