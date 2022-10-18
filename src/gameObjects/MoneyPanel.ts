import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import Text = Phaser.GameObjects.Text;
import Store from "../classes/Store";

export default class MoneyPanel extends Container {
    public moneyPanel: Image;
    public moneyIcon: Image;
    public moneyText: Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y);
        this.setScale(Store.config.scale);

        this.moneyPanel = new Image(scene,0, 0, 'purple-rounded-panel');
        this.moneyIcon = new Image(scene,-200, 0, 'money');
        this.moneyText = new Text(scene, 30, -10, String(Store.data.money), { fontFamily: Store.config.font, fontSize: '10em' })
            .setOrigin(0.5, 0.5)

        this.add([
            this.moneyPanel,
            this.moneyIcon,
            this.moneyText,
        ]);
    }

    public setMoney(count: number) {
        this.moneyText.setText(String(count));
    }
}