import Box from "./Box";
import Store from "../classes/Store";
import Position from "../classes/Position";
import Sizes from "../classes/Sizes";
import IGridConfig from "../interfaces/IGridConfig";
import IGridItem from "../interfaces/IGridItem";
import SuperTile from "./Busters/SuperTile";
import IUIBuster from "../interfaces/IUIBuster";
import BaseBuster from "./BaseBuster";

class TileGrid extends Phaser.GameObjects.Image {
    private group: Phaser.Physics.Arcade.Group;
    private params: IGridConfig;
    private callback: Function;
    private checkMiddleware: Function;
    private busters: any = {
        superTile: SuperTile
    };
    private activeBuster: IUIBuster | null;

    constructor(scene: Phaser.Scene, x: number, y: number, params: IGridConfig, callback: Function, checkMiddleware: Function) {
        super(scene, x, y, 'box-container');
        this.params = params;
        this.callback = callback;
        this.checkMiddleware = checkMiddleware;
        this.setScale(Store.config.scale);

        this.group = this.scene.physics.add.group({
            collideWorldBounds: true,
        });
        this.init();
    }

    private init(): void {
        if (this.params.containerSizeAuto) {
            this.setWidth();
        }
        this.setGrid();
    }

    private setWidth() {
        const sideOffset: number = this.getSideOffset();

        const w = this.params.widthItem * this.params.sizeX + this.params.offsetX * this.params.sizeX + sideOffset * 2 - this.params.offsetX;
        const h = this.params.heightItem * this.params.sizeY + this.params.offsetY * this.params.sizeY + sideOffset * 2 - this.params.offsetY;

        Sizes.setSize(this, w, h);
    }

    public getSideOffset(): number {
        return this.params.sideOffset ? this.params.sideOffset : 0;
    }

    private addDisplay(box: IGridItem): void {
        this.scene.children.add(box);
        this.scene.physics.add.existing(box, false);
        box
            .setOrigin(0, 0)
            .setDepth(1)
            .setInteractive()
            .setDisplaySize(this.params.widthItem, this.params.heightItem)
            .setCollideWorldBounds(true)

        this.group.add(box);
    }

    private setGrid() {
        const pos = Position.getOriginPosition(this);

        const sizeX = this.params.sizeX;
        const sizeY = this.params.sizeY;

        const widthItem = this.params.widthItem;
        const heightItem = this.params.heightItem;

        const offsetX = this.params.offsetX;
        const offsetY = this.params.offsetY;

        const sideOffset: number = this.getSideOffset();

        pos.x += sideOffset;
        pos.y += sideOffset;

        let x = pos.x;
        let y = pos.y;
        let count = 1;

        for (let i = 0; i < sizeY; i++) {
            for (let j = 0; j < sizeX; j++) {
                const box = new Box(this.scene, x, y);

                this.addDisplay(box);

                x += widthItem + offsetX;
                box.setId(count++);

                box.on('pointerdown',  (pointer: any) => {
                    if (pointer.leftButtonDown()) {
                        this.action(box);
                    }
                    if (pointer.rightButtonDown()) {
                        console.log(box.x + ' ' + box.y + ' ' + (box.scale * box.width) + ' '+ widthItem);
                    }
                });
            }
            y += heightItem + offsetY;
            x = pos.x;

            this.scene.physics.add.collider(this.group, this.group, function (s1, s2) {
                const b1 = s1.body;
                const b2 = s2.body;

                if (b1.y > b2.y) {
                    b2.y += (b1.top - b2.bottom);
                    b2.stop();
                }
                else {
                    b1.y += (b2.top - b1.bottom);
                    b1.stop();
                }
            });
        }
    }

    private getChain(box: IGridItem, except: Array<number> = []): Array<IGridItem> {
        except.push(box.id);
        let arResult: Array<IGridItem> = [box];

        const width = this.params.widthItem + this.params.offsetX;
        const height = this.params.heightItem + this.params.offsetY;
        const type = box.getType();

        const x = box.posX;
        const y = box.posY;

        const leftX = x + width;
        const botY = y + height;
        const rightX = x - width;
        const topY = y - height;
        const arBoxes = <Array<IGridItem>> this.group.children.getArray();

        let chain = arBoxes.filter((boxItem: IGridItem) => {
            return (
                boxItem.itemType === type && !except.includes(boxItem.id) &&
                ((boxItem.posX == leftX && boxItem.posY == y)
                || (boxItem.posX == x && boxItem.posY == botY)
                || (boxItem.posX == rightX && boxItem.posY == y)
                || (boxItem.posX == x && boxItem.posY == topY))
            );
        });

        if (chain.length) {
            chain.forEach((boxItem: IGridItem) => {
                arResult = [...arResult, ...this.getChain(boxItem, except)]
            });
        }

        return arResult;
    }

    public action(gridItem: IGridItem) {
        if (!this.checkMiddleware() || this.state !== 0) {
            return;
        }

        if (this.activeBuster) {
            if (this.activeBuster.select(gridItem)) {
                this.activeBuster.action();
                this.activeBuster.getBusterPanel().useCallback();
                this.unsetBuster();
            }
        }
        else if (gridItem instanceof BaseBuster) {
            gridItem.action();
        }
        else {
            this.destroyItemsChain(gridItem);
        }
    }

    private destroyItemsChain(gridItem: IGridItem) {
        const result = this.getChain(gridItem);

        if (result.length >= Store.config.minBoxAction) {

            result.forEach((oBox: IGridItem) => {
                oBox.action();
            });

            if (result.length >= this.params.busters.superTile.countToActive) {
                this.addBuster('superTile', gridItem.x, gridItem.y, this.callback, gridItem)
                gridItem.disable();
            }

            this.callback(result);
        }
    }

    private addBuster(className: string, x: number, y: number, callback: Function, box: IGridItem) {
        const buster = new this.busters[className](this.scene, x, y, this.group, this.params, callback, box);
        this.addDisplay(buster);

        buster.on('pointerdown',  (pointer: any) => {
            if (pointer.leftButtonDown()) {
                this.action(buster)
            }
        });
    }

    public setBuster(buster: IUIBuster) {
        this.activeBuster = buster;
    }

    public unsetBuster() {
        if (this.activeBuster) {
            this.activeBuster.getBusterPanel().isActive = false;
            this.activeBuster = null;
        }
    }

    public getGrid(): Phaser.Physics.Arcade.Group {
        return this.group;
    }

    public getParams(): IGridConfig {
        return this.params;
    }

    public getCallback(): Function {
        return this.callback;
    }

    public reInitGrid(): void {
        const gridItems = this.group.children.getArray();

        gridItems.forEach(gridItem => {
            gridItem.destroy(true);
        })

        this.group.clear();
        this.setGrid();
        this.scene.physics.add.collider(this.group, this.floor);
    }
}

export default TileGrid;