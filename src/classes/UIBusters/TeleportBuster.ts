import BaseUIBuster from "./BaseUIBuster";
import IGridConfig from "../../interfaces/IGridConfig";

export default class TeleportBuster extends BaseUIBuster {
    protected grid: Phaser.Physics.Arcade.Group;
    protected params: IGridConfig;
    protected _needCount: number = 2;

    constructor(
        grid: Phaser.Physics.Arcade.Group,
        params: IGridConfig,
        callback: Function,
    ) {
        super();

        this.grid = grid;
        this.params = params;
        this.callback = callback
    }

    public action(): void {
        const gridItemFirst = this.getFirstSelected();
        const gridItemSecond = this.selected[1];

        const x1: number = gridItemFirst.x;
        const y1: number = gridItemFirst.y;

        const x2: number = gridItemSecond.x;
        const y2: number = gridItemSecond.y;

        gridItemFirst.setPosition(x2, y2);
        gridItemSecond.setPosition(x1, y1);

        this.clear();
    }
}