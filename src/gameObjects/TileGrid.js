"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Box_1 = __importDefault(require("./Box"));
const Store_1 = __importDefault(require("../classes/Store"));
const Position_1 = __importDefault(require("../classes/Position"));
const Sizes_1 = __importDefault(require("../classes/Sizes"));
const SuperTile_1 = __importDefault(require("./Busters/SuperTile"));
const BaseBuster_1 = __importDefault(require("./BaseBuster"));
class TileGrid extends Phaser.GameObjects.Image {
    constructor(scene, x, y, params, callback, checkMiddleware) {
        super(scene, x, y, 'box-container');
        this.busters = {
            superTile: SuperTile_1.default
        };
        this.params = params;
        this.callback = callback;
        this.checkMiddleware = checkMiddleware;
        this.setScale(Store_1.default.config.scale);
        this.group = this.scene.physics.add.group({
            collideWorldBounds: true,
        });
        this.init();
    }
    init() {
        if (this.params.containerSizeAuto) {
            this.setWidth();
        }
        this.setGrid();
    }
    setWidth() {
        const sideOffset = this.getSideOffset();
        const w = this.params.widthItem * this.params.sizeX + this.params.offsetX * this.params.sizeX + sideOffset * 2 - this.params.offsetX;
        const h = this.params.heightItem * this.params.sizeY + this.params.offsetY * this.params.sizeY + sideOffset * 2 - this.params.offsetY;
        Sizes_1.default.setSize(this, w, h);
    }
    getSideOffset() {
        return this.params.sideOffset ? this.params.sideOffset : 0;
    }
    addDisplay(box) {
        this.scene.children.add(box);
        this.scene.physics.add.existing(box, false);
        box
            .setOrigin(0, 0)
            .setDepth(1)
            .setInteractive()
            .setDisplaySize(this.params.widthItem, this.params.heightItem)
            .setCollideWorldBounds(true);
        this.group.add(box);
    }
    setGrid() {
        const pos = Position_1.default.getOriginPosition(this);
        const sizeX = this.params.sizeX;
        const sizeY = this.params.sizeY;
        const widthItem = this.params.widthItem;
        const heightItem = this.params.heightItem;
        const offsetX = this.params.offsetX;
        const offsetY = this.params.offsetY;
        const sideOffset = this.getSideOffset();
        pos.x += sideOffset;
        pos.y += sideOffset;
        let x = pos.x;
        let y = pos.y;
        let count = 1;
        for (let i = 0; i < sizeY; i++) {
            for (let j = 0; j < sizeX; j++) {
                const box = new Box_1.default(this.scene, x, y);
                this.addDisplay(box);
                x += widthItem + offsetX;
                box.setId(count++);
                box.on('pointerdown', (pointer) => {
                    if (pointer.leftButtonDown()) {
                        this.action(box);
                    }
                    if (pointer.rightButtonDown()) {
                        console.log(box.x + ' ' + box.y + ' ' + (box.scale * box.width) + ' ' + widthItem);
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
    getChain(box, except = []) {
        except.push(box.id);
        let arResult = [box];
        const width = this.params.widthItem + this.params.offsetX;
        const height = this.params.heightItem + this.params.offsetY;
        const type = box.getType();
        const x = box.posX;
        const y = box.posY;
        const leftX = x + width;
        const botY = y + height;
        const rightX = x - width;
        const topY = y - height;
        const arBoxes = this.group.children.getArray();
        let chain = arBoxes.filter((boxItem) => {
            return (boxItem.itemType === type && !except.includes(boxItem.id) &&
                ((boxItem.posX == leftX && boxItem.posY == y)
                    || (boxItem.posX == x && boxItem.posY == botY)
                    || (boxItem.posX == rightX && boxItem.posY == y)
                    || (boxItem.posX == x && boxItem.posY == topY)));
        });
        if (chain.length) {
            chain.forEach((boxItem) => {
                arResult = [...arResult, ...this.getChain(boxItem, except)];
            });
        }
        return arResult;
    }
    action(gridItem) {
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
        else if (gridItem instanceof BaseBuster_1.default) {
            gridItem.action();
        }
        else {
            this.destroyItemsChain(gridItem);
        }
    }
    destroyItemsChain(gridItem) {
        const result = this.getChain(gridItem);
        if (result.length >= Store_1.default.config.minBoxAction) {
            result.forEach((oBox) => {
                oBox.action();
            });
            if (result.length >= this.params.busters.superTile.countToActive) {
                this.addBuster('superTile', gridItem.x, gridItem.y, this.callback, gridItem);
                gridItem.disable();
            }
            this.callback(result);
        }
    }
    addBuster(className, x, y, callback, box) {
        const buster = new this.busters[className](this.scene, x, y, this.group, this.params, callback, box);
        this.addDisplay(buster);
        buster.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.action(buster);
            }
        });
    }
    setBuster(buster) {
        this.activeBuster = buster;
    }
    unsetBuster() {
        if (this.activeBuster) {
            this.activeBuster.getBusterPanel().isActive = false;
            this.activeBuster = null;
        }
    }
    getGrid() {
        return this.group;
    }
    getParams() {
        return this.params;
    }
    getCallback() {
        return this.callback;
    }
    reInitGrid() {
        const gridItems = this.group.children.getArray();
        gridItems.forEach(gridItem => {
            gridItem.destroy(true);
        });
        this.group.clear();
        this.setGrid();
        this.scene.physics.add.collider(this.group, this.floor);
    }
}
exports.default = TileGrid;
//# sourceMappingURL=TileGrid.js.map