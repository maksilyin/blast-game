"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Register_1 = __importDefault(require("../classes/Register"));
const GameLogic_1 = __importDefault(require("../classes/GameLogic"));
const Store_1 = __importDefault(require("../classes/Store"));
class WinScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'WinScene'
        });
        this.init = () => {
            Register_1.default.UIRegister();
        };
        this.preload = () => {
        };
        this.create = () => {
            const winText = "Уровень пройден!";
            this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.8).setOrigin(0, 0);
            const popupPanel = this.add.image(0, 0, 'popupPanel')
                .setScale(0.5);
            this.container = this.add.container(this.scale.width / 2, this.scale.height / 2);
            const nextBtn = this.add.image(0, 130, 'btnNext')
                .setScale(0.5)
                .setInteractive();
            const text = this.add.text(0, 0, winText, { fontFamily: Store_1.default.config.font, fontSize: '14em' })
                .setOrigin(0.5, 0.5)
                .setScale(0.23);
            const textBtn = this.add.text(0, 130, 'Дальше', { fontFamily: Store_1.default.config.font, fontSize: '12em' })
                .setOrigin(0.5, 0.5)
                .setScale(0.23);
            this.container.add([
                popupPanel,
                text,
                nextBtn,
                textBtn,
            ]).setScale(0);
            nextBtn.on('pointerdown', (pointer) => {
                if (pointer.leftButtonDown()) {
                    GameLogic_1.default.initNextLvl();
                    this.scene.setVisible(false);
                    this.scene.start('UIScene');
                    this.scene.start('default');
                }
            });
        };
    }
    update(time, delta) {
        super.update(time, delta);
        if (this.container.scale < 1) {
            this.container.setScale(this.container.scale + 0.04);
        }
    }
}
exports.default = WinScene;
//# sourceMappingURL=WinScene.js.map