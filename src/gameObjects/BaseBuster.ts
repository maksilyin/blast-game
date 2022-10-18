import BaseGridItem from "./BaseGridItem";
import IBonus from "../interfaces/IBuster";
import IGridConfig from "../interfaces/IGridConfig";
import IGridItem from "../interfaces/IGridItem";

export default class BaseBuster extends BaseGridItem implements IBonus{
    protected grid: Phaser.Physics.Arcade.Group | undefined;
    protected params: IGridConfig | undefined;
    protected callback: Function | undefined;
    protected itemReplace: IGridItem | undefined;

    constructor(scene: Phaser.Scene, x: number, y: number, grid?: Phaser.Physics.Arcade.Group, params?: IGridConfig, callback?: Function, itemReplace?: IGridItem) {
        super(scene, x, y);

        this.grid = grid;
        this.params = params;
        this.callback = callback;
        this.itemReplace = itemReplace;
    }
}