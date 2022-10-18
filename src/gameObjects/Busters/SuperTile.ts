import IBonus from "../../interfaces/IBuster";
import IGridConfig from "../../interfaces/IGridConfig";
import IGridItem from "../../interfaces/IGridItem";
import BaseBuster from "../BaseBuster";

export default class SuperTile extends BaseBuster implements IBonus {

    protected horizontal: boolean = true;
    protected grid: Phaser.Physics.Arcade.Group;
    protected params: IGridConfig;
    protected callback: Function;
    protected _code: string = 'super';

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        grid: Phaser.Physics.Arcade.Group,
        params: IGridConfig,
        callback: Function,
        itemReplace: IGridItem
    ) {
        super(scene, x, y, grid, params, callback, itemReplace);
        this.grid = grid;
        this.params = params;
        this.callback = callback
        this.setTexture(this.code);
    }

    public changeDirection(current: boolean): void {
        this.horizontal = !current;
    }

    public action(): void {
        const arDestroy = this.getDestroy();
        this.animDestroy();
        this.state = 2;

        arDestroy.forEach((destroyItem: IGridItem) => {
            if (destroyItem.state < 2) {
                destroyItem.state = 2;

                if (destroyItem instanceof SuperTile) {
                    destroyItem.changeDirection(this.horizontal);
                }
                destroyItem.action();
            }
        });

        this.callback(arDestroy);
    }

    public animDestroy() {
        const emitter = this.getEmitter();
        this.visible = false;

        setTimeout(()=>{
            if (this.itemReplace) {
                this.itemReplace.setPosition(this.x, this.itemReplace.y);
                this.itemReplace.activeItem();
            }

            this.destroy(true);
        }, 200)

        setTimeout(()=>{
            emitter.remove()
        }, 600)
    }

    private getDestroy(): Array<IGridItem> {
        const posX = this.posX;
        const posY = this.posY;

        const arBoxes = <Array<IGridItem>> this.grid.children.getArray();

        const arDestroy = arBoxes.filter((gridItem: IGridItem) => {

            if (gridItem.state > 0) {
                return false;
            }

            if (this.horizontal) {
                return gridItem.posY === posY;
            }
            else {
                return gridItem.posX === posX;
            }
        });

        arDestroy.forEach(destroyItem => {
            destroyItem.state = 1;
        });

        return arDestroy;
    }
}