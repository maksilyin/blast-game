"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Assests_1 = __importDefault(require("../classes/Assests"));
const Register_1 = __importDefault(require("../classes/Register"));
const GameManager_1 = __importDefault(require("../classes/GameManager"));
const GameLogic_1 = __importDefault(require("../classes/GameLogic"));
const BombBuster_1 = __importDefault(require("../classes/UIBusters/BombBuster"));
const TeleportBuster_1 = __importDefault(require("../classes/UIBusters/TeleportBuster"));
class UIScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'UIScene'
        });
        this.init = () => {
            Register_1.default.UIRegister();
        };
        this.preload = () => {
            this.load.image('score-panel', Assests_1.default.sprite('square.png'));
            this.load.image('lvl-ellipse', Assests_1.default.sprite('ellipse.png'));
            this.load.image('bonus-panel', Assests_1.default.sprite('bonus.png'));
            this.load.image('score-field', Assests_1.default.sprite('rectangle.png'));
            this.load.image('purple-field', Assests_1.default.sprite('rounded-rectangle.png'));
            this.load.image('red-rounded-panel', Assests_1.default.sprite('rounded-rectangle-2.png'));
            this.load.image('purple-rounded-panel', Assests_1.default.sprite('rounded-rectangle-3.png'));
            this.load.image('money', Assests_1.default.sprite('ellipse-2.png'));
            this.load.image('progress-field', Assests_1.default.sprite('progress-2.png'));
            this.load.image('progress-panel', Assests_1.default.sprite('progress-3.png'));
            this.load.image('progress', Assests_1.default.sprite('progress.9.png'));
            this.load.image('teleport', Assests_1.default.sprite('teleport.png'));
        };
        this.create = () => {
            this.add.scorePanel(this.scale.width - 150, 220);
            this.add.moneyPanel(this.scale.width - 100, 25);
            this.add.movesPanel(this.scale.width - 280, 25);
            this.progress = this.add.progressBar(265, 31);
            const bombBusterPanel = this.add.busterPanel(this.scale.width - 220, 420, 50, 'bomb').setScale(0.3);
            const bonusPanel = this.add.busterPanel(this.scale.width - 85, 420, 10, 'teleport').setScale(0.3);
            GameLogic_1.default.setMove(GameManager_1.default.moves);
            GameLogic_1.default.setScore(0);
            GameLogic_1.default.setLvl();
            GameLogic_1.default.initBuster(BombBuster_1.default, bombBusterPanel);
            GameLogic_1.default.initBuster(TeleportBuster_1.default, bonusPanel);
        };
        this.update = () => {
            if (this.progress.getWidth() >= this.progress.progress.width) {
                const width = Math.min(this.progress.getWidth(), this.progress.progress.width + 20);
                this.progress.progress.setX(-(this.progress.progressField.width / 2 - width / 2));
                this.progress.progress.resize(width, this.progress.progress.height);
            }
        };
    }
}
exports.default = UIScene;
//# sourceMappingURL=UIScene.js.map