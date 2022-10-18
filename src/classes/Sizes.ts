import IGameObjectProperty from "../interfaces/IGameObjectProperty";
import ISize from "../interfaces/ISize";

export default class Sizes {
    public static setSize(gameObject: IGameObjectProperty, width: number, height: number): void {
        gameObject.displayWidth = width;
        gameObject.displayHeight = height;
    }

    public static getScale(gameObject: IGameObjectProperty, width: number, height: number): {x: number, y: number} {
        const size = {
            x: 0,
            y: 0,
        }
        size.x = width / gameObject.width;
        size.y = height / gameObject.height;

        return size;
    }

    public static getSizeScale(gameObject: IGameObjectProperty): ISize {
        const size = {w: 0, h: 0};

        if (gameObject) {
            size.w = gameObject.width * gameObject.scaleX;
            size.h = gameObject.height * gameObject.scaleY;
        }

        return size;
    }
}