import Store from "../classes/Store";
import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import Text = Phaser.GameObjects.Text;

export default class MovesPanel extends Container {
    public movesPanel: Image;
    public movesIcon: Image;
    public moneyText: Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y);
        this.setScale(Store.config.scale);

        this.movesPanel = new Image(scene,0, 0, 'red-rounded-panel');
        this.movesIcon = new Image(scene,-170, 0, 'money');
        this.moneyText = new Text(scene, 20, -10, Store.config.moves, { fontFamily: Store.config.font, fontSize: '10em' })
            .setOrigin(0.5, 0.5)

        this.add([
            this.movesPanel,
            this.moneyText,
            this.movesIcon
        ]);
    }
}