import IGridItem from "./IGridItem";
import BusterPanel from "../gameObjects/BusterPanel";

export default interface IUIBuster {
    needCount: number;
    selected: Array<IGridItem>;

    select(gridItem: IGridItem): boolean;
    action(): void;
    getBusterPanel(): BusterPanel;
    setBusterPanel(busterPanel: BusterPanel): void;
    clear(): void;
}