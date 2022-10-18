import Assets from '../classes/Assests';
import Register from '../classes/Register';
import GameManager from "../classes/GameManager";
import GameLogic from "../classes/GameLogic";
import BombBuster from "../classes/UIBusters/BombBuster";
import TeleportBuster from "../classes/UIBusters/TeleportBuster";
import ProgressBar from "../gameObjects/ProgressBar";
import Sizes from "../classes/Sizes";
import TileGrid from "../gameObjects/TileGrid";

class UIScene extends Phaser.Scene {
    progress: ProgressBar;
    constructor() {
        super({
            key: 'UIScene'
        });
    }

    init = () => {
        Register.UIRegister();
    }
    preload = (): void => {
        this.load.image('score-panel', Assets.sprite('square.png'));
        this.load.image('lvl-ellipse', Assets.sprite('ellipse.png'));
        this.load.image('bonus-panel', Assets.sprite('bonus.png'));
        this.load.image('score-field', Assets.sprite('rectangle.png'));
        this.load.image('purple-field', Assets.sprite('rounded-rectangle.png'));
        this.load.image('red-rounded-panel', Assets.sprite('rounded-rectangle-2.png'));
        this.load.image('purple-rounded-panel', Assets.sprite('rounded-rectangle-3.png'));
        this.load.image('money', Assets.sprite('ellipse-2.png'));
        this.load.image('progress-field', Assets.sprite('progress-2.png'));
        this.load.image('progress-panel', Assets.sprite('progress-3.png'));
        this.load.image('progress', Assets.sprite('progress.9.png'));
        this.load.image('teleport', Assets.sprite('teleport.png'));
    }
    create = () => {
        this.add.scorePanel(this.scale.width - 150, 220);
        this.add.moneyPanel(this.scale.width - 100, 25);
        this.add.movesPanel(this.scale.width - 280, 25);
        this.progress = this.add.progressBar(265, 31);
        const bombBusterPanel = this.add.busterPanel(this.scale.width - 220, 420, 50, 'bomb').setScale(0.3);
        const bonusPanel = this.add.busterPanel(this.scale.width - 85, 420, 10, 'teleport').setScale(0.3);

        GameLogic.setMove(GameManager.moves);
        GameLogic.setScore(0);
        GameLogic.setLvl();

        GameLogic.initBuster(BombBuster, bombBusterPanel);
        GameLogic.initBuster(TeleportBuster, bonusPanel);
    }
    update = () => {
        if (this.progress.getWidth() >= this.progress.progress.width) {
            const width = Math.min(this.progress.getWidth(), this.progress.progress.width + 20);
            this.progress.progress.setX(-(this.progress.progressField.width / 2 - width / 2));
            this.progress.progress.resize(width, this.progress.progress.height);
        }
    }
}

export default UIScene;