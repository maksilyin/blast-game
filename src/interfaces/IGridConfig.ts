import IKeyString from "./IKeyString";

export default interface IGridConfig extends IKeyString {
    sizeX: number,
    sizeY: number,
    widthItem: number,
    heightItem: number,
    offsetX: number,
    offsetY: number,
    sideOffset: number,
    containerSizeAuto: boolean,
}