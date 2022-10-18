import IGameObjectProperty from "../interfaces/IGameObjectProperty";
import Sizes from "./Sizes";

export default class Position {
    public static getCenter(gameObject: IGameObjectProperty): vector2 {
        const vector = {x: 0, y: 0};

        if (gameObject) {
            const pos = Position.getOriginPosition(gameObject);
            const size =  Sizes.getSizeScale(gameObject);
            vector.x = pos.x + size.w / 2;
            vector.y = pos.y + size.h / 2;
        }

        return vector;
    }

    public static getBottom(gameObject: IGameObjectProperty): number {
        if (!gameObject) {
            return 0;
        }
        const pos = Position.getOriginPosition(gameObject);
        const size =  Sizes.getSizeScale(gameObject);

        return pos.y + size.h;
    }

    public static getOriginPosition(gameObject: IGameObjectProperty): vector2 {
        const vector = {x: 0, y: 0};

        if (gameObject) {
            const size = Sizes.getSizeScale(gameObject);
            vector.x = gameObject.x - gameObject.originX * size.w;
            vector.y = gameObject.y - gameObject.originY * size.h;
        }

        return vector;
    }
}

interface vector2 {
    x: number;
    y: number;
}