import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import Text = Phaser.GameObjects.Text;
import Store from "../classes/Store";
import {NinePatch} from "@koreez/phaser3-ninepatch";

export default class ProgressBar extends Container {
    public progress: NinePatch;
    public progressPanel: Image;
    public progressField: Image;
    private percent: number = 0;
    private _width: number = 0;
    constructor(scene: Phaser.Scene, x: number, y: number, percent?: number) {

        super(scene, x, y);

        if (percent) {
            this.percent = percent;
        }

        this.setScale(Store.config.scale)
        this.progressPanel = new Image(scene, 0, 0, 'progress-panel');
        this.progressField = new Image(scene, 0, 30, 'progress-field');
        this.progress = new NinePatch(scene, 45, 28, 90, 85, 'progress', 0, {
            top: 0,
            bottom: 0,
            left: 45,
            right: 45
        });

        const markProgress = new Text(scene, 0, -90, 'прогресс:', { fontFamily: Store.config.font, fontSize: '8em' })
            .setOrigin(0.5, 0.5);

        this.setProgress();

        this.add([
            this.progressPanel,
            this.progressField,
            this.progress,
            markProgress
        ]);
    }

    private setProgress(): void {
        if (this.percent) {
            this.progress.setVisible(true);
            this._width = Math.max(this.progress.width, this.progressField.width * this.percent / 100);
            //this.progress.setX(-(this.progressField.width / 2 - width / 2));
           // this.progress.resize(width, this.progress.height);
        }
        else {
            this.progress.setVisible(false);
        }
    }

    public setPercent(percent: number): void {
        this.percent = Math.min(100, percent);
        this.setProgress();
    }

    public getWidth(): number {
        return this._width;
    }
}