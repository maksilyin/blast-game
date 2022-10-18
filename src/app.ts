import 'Phaser';
import  './main.sass';

import UIScene from "./scenes/UIScene";
import TileScene from "./scenes/TileScene";
import WinScene from "./scenes/WinScene";
import {NinePatchPlugin} from "@koreez/phaser3-ninepatch";
import LoseScene from "./scenes/LoseScene";

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
            debug: true
        }
    },
    scene: [TileScene, UIScene, WinScene, LoseScene],
    plugins: {
        global: [{ key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true }],
    }
}
const game = new Phaser.Game(config);