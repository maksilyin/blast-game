import IGridConfig from "../../interfaces/IGridConfig";
import IGridItem from "../../interfaces/IGridItem";
import IVector2 from "../../interfaces/IVector2";
import BaseUIBuster from "./BaseUIBuster";

export default class BombBuster extends BaseUIBuster {
    protected _radius: number = 2;
    protected grid: Phaser.Physics.Arcade.Group;
    protected params: IGridConfig;

    constructor(
        grid: Phaser.Physics.Arcade.Group,
        params: IGridConfig,
        callback: Function,
    ) {
        super();

        this.grid = grid;
        this.params = params;
        this.callback = callback

        if (this.params?.bonuses?.bombBuster) {
            this.init();
        }
    }

    public get radius() {
        return this._radius;
    }

    private init() {
        const params = this.params.bonuses.bombBuster;

        if (params.radius) {
            this._radius = params.radius;
        }
    }

    public action(): void {
        const gridItem = this.getFirstSelected();

        const arDestroy = this.getDestroy({x: gridItem.posX, y: gridItem.posY});

        arDestroy.forEach((destroyItem: IGridItem) => {
            if (destroyItem.state < 2) {
                destroyItem.state = 2;
                destroyItem.action();
            }
        });
        this.clear();
        this.callback(arDestroy);
    }

    public setRadius(radius: number): void {
        this._radius = Math.max(0, radius);
    }

    private getDestroy(center: IVector2): Array<IGridItem> {
        const width = this.params.widthItem;
        const height = this.params.heightItem;
        const rightX = center.x + width * this.radius;
        const bottomY = center.y + height * this.radius;
        const leftX = center.x - width * this.radius;
        const topY = center.y - height * this.radius;
        const arBoxes = <Array<IGridItem>> this.grid.children.getArray();

        const arDestroy = arBoxes.filter((gridItem: IGridItem) => {

            if (
                gridItem.state > 0 ||
                ((gridItem.posY === topY && gridItem.posX === leftX)
                    || (gridItem.posY === bottomY && gridItem.posX === leftX)
                    || (gridItem.posY === topY && gridItem.posX === rightX)
                    || (gridItem.posY === bottomY && gridItem.posX === rightX))
            ) {
                return false;
            }

            return (
                gridItem.posX <= rightX && gridItem.posX >= leftX
                && gridItem.posY >= topY && gridItem.posY <= bottomY
            );
        });

        arDestroy.forEach(destroyItem => {
            destroyItem.state = 1;
        });

        return arDestroy;
    }
}