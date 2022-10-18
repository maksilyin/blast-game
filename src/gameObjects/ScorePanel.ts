import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import Text = Phaser.GameObjects.Text;
import Store from "../classes/Store";

export default class ScorePanel extends Container {
    public scorePanel: Image;
    public lvlPanel: Image;
    public scoreField: Image;
    public lvlText: Text;
    public scoreText: Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y);
        this.setScale(Store.config.scale)

        this.scorePanel = new Image(scene, 0, 0, 'score-panel')
        this.lvlPanel = new Image(scene, 0, -180, 'lvl-ellipse');
        this.scoreField = new Image(scene, 0, 270, 'score-field');
        this.lvlText = new Text(scene, 0, -200, '1', { fontFamily: Store.config.font, fontSize: '22em' })
            .setOrigin(0.5, 0.5)
        this.scoreText = new Text(scene, 0, 320, '0', { fontFamily: Store.config.font, fontSize: '14em' })
            .setOrigin(0.5, 0.5);
        const markScore = new Text(scene, 0, 200, 'очки:', { fontFamily: Store.config.font, fontSize: '8em' })
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