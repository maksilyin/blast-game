"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Position_1 = __importDefault(require("./Position"));
const Sizes_1 = __importDefault(require("./Sizes"));
const Box_1 = __importDefault(require("../gameObjects/Box"));
class GameGenerator {
    static generateBoxGrid(scene, container, params = {}) {
        const pos = Position_1.default.getOriginPosition.call(scene, container);
        const sizeX = params.sizeX;
        const sizeY = params.sizeY;
        const widthItem = params.widthItem;
        const heightItem = params.heightItem;
        const offsetX = params.offsetX;
        const offsetY = params.offsetY;
        const sideOffset = params.sideOffset ? params.sideOffset : 0;
        pos.x += sideOffset;
        pos.y += sideOffset;
        let x = pos.x;
        let y = pos.y;
        if (params.containerSizeAuto) {
            const w = widthItem * sizeX + offsetX * sizeX + sideOffset * 2 - offsetX;
            const h = heightItem * sizeY + offsetY * sizeY + sideOffset * 2 - offsetY;
            Sizes_1.default.setSize(container, w, h);
        }
        for (let i = 0; i < sizeY; i++) {
            for (let j = 0; j < sizeX; j++) {
                const box = new Box_1.default(scene, x, y);
                box.setOrigin(0, 0)
                    .setDepth(1);
                Sizes_1.default.setSize(box, widthItem, heightItem);
                scene.children.add(box);
                // scene.physics.world.enableBody(gridItem)
                console.log(box);
                //container.addBox(gridItem);
                x += widthItem + offsetX;
            }
            y += heightItem + offsetY;
            x = pos.x;
        }
    }
}
exports.default = GameGenerator;
//# sourceMappingURL=GameGenerator.js.map