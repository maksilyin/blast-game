"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("Phaser");
require("./main.sass");
const UIScene_1 = __importDefault(require("./scenes/UIScene"));
const TileScene_1 = __importDefault(require("./scenes/TileScene"));
const WinScene_1 = __importDefault(require("./scenes/WinScene"));
const phaser3_ninepatch_1 = require("@koreez/phaser3-ninepatch");
const LoseScene_1 = __importDefault(require("./scenes/LoseScene"));
const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#bf4dc6',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [TileScene_1.default, UIScene_1.default, WinScene_1.default, LoseScene_1.default],
    plugins: {
        global: [{ key: 'NinePatchPlugin', plugin: phaser3_ninepatch_1.NinePatchPlugin, start: true }],
    }
};
const game = new Phaser.Game(config);
//# sourceMappingURL=app.js.map