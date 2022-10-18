import Position from "./Position";
import Sizes from "./Sizes";
import Box from "../gameObjects/Box";
import TileGrid from "../gameObjects/TileGrid";

export default class GameGenerator {
    public static generateBoxGrid(scene: Phaser.Scene, container: TileGrid, params: any = {}) {
        const pos = Position.getOriginPosition.call(scene, container);

        const sizeX = params.sizeX;
        const sizeY = params.sizeY;

        const widthItem = params.widthItem;
        const heightItem = params.heightItem;

        const offsetX = params.offsetX;
        const offsetY = params.offsetY;

        const sideOffset: number = params.sideOffset ? params.sideOffset : 0;

        pos.x += sideOffset;
        pos.y += sideOffset;

        let x = pos.x;
        let y = pos.y;

        if (params.containerSizeAuto) {
            const w = widthItem * sizeX + offsetX * sizeX + sideOffset * 2 - offsetX;
            const h = heightItem * sizeY + offsetY * sizeY + sideOffset * 2 - offsetY;
            Sizes.setSize(container, w, h);
        }

        for (let i = 0; i < sizeY; i++) {
            for (let j = 0; j < sizeX; j++) {
                const box = new Box(scene, x, y);
                box.setOrigin(0, 0)
                    .setDepth(1)
                Sizes.setSize(box, widthItem, heightItem)
                scene.children.add(box)
               // scene.physics.world.enableBody(gridItem)
                console.log(box)
                //container.addBox(gridItem);
                x += widthItem + offsetX;
            }
            y += heightItem + offsetY;
            x = pos.x;
        }
    }
}