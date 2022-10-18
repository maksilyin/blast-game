import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import Text = Phaser.GameObjects.Text;
import Store from "../classes/Store";
import IUIBuster from "../interfaces/IUIBuster";

export default class BusterPanel extends Container {
    private countText: Text;
    public bonusPanel: Image;
    private moneyField: Image;
    private icon: Image;
    private moneyIcon: Image;
    private _buster: IUIBuster;
    private _cost: number = 0;
    private _active: boolean = false;
    private sizeActive: number = 0.02;
    private sizeDefault: number;
    private callback: Function;

    constructor(scene: Phaser.Scene, x: number, y: number, cost: number, icon: string) {
        super(scene, x, y);
        this.setScale(0.31);

        this._cost = cost;

        this.bonusPanel = new Image(scene,0, 0, 'bonus-panel');
        this.moneyField = new Image(scene,0, 90, 'purple-field');
        this.moneyIcon = new Image(scene,85, 90, 'money');
        this.moneyIcon.displayWidth = 70;
        this.moneyIcon.displayHeight = 70;
        this.icon = new Image(scene,0, -70, icon);
        this.countText = new Text(scene, -30, 85, String(this.cost), { fontFamily: Store.config.font, fontSize: '8em' })
            .setOrigin(0.5, 0.5);

        this.add([
            this.bonusPanel,
            this.icon,
            this.moneyField,
            this.moneyIcon,
            this.countText,
        ]);
        this.sizeDefault = this.scale;
        this.setSize(this.bonusPanel.width, this.bonusPanel.height)
    }

    private setDefaultSize() {
        this.setScale(this.sizeDefault - 0.01);
    }

    public get cost() {
        return this._cost;
    }

    public get buster() {
        return this._buster;
    }

    public set buster(buster: IUIBuster) {
        this._buster = buster;
        this._buster.setBusterPanel(this);
    }

    public set isActive(value: boolean) {
        if (value) {
            console.log(this.sizeDefault + this.sizeActive)
            this.setScale(this.sizeDefault + this.sizeActive);
        }
        else {
            this._buster.clear();
            this.setDefaultSize();
        }
        this._active = value;
    }

    public get isActive() {
        return this._active;
    }

    public setCallback(callback: Function) {
        this.callback = callback;
    }

    public useCallback(): void {
        if (this.callback) {
            this.callback();
        }
    }
}