import IUIBuster from "../../interfaces/IUIBuster";
import IGridItem from "../../interfaces/IGridItem";
import BusterPanel from "../../gameObjects/BusterPanel";

export default abstract class BaseUIBuster implements IUIBuster {
    protected _needCount: number = 1;
    protected _selected: Array<IGridItem> = [];
    protected busterPanel: BusterPanel;
    protected callback: Function;

    public get needCount() {
        return this._needCount;
    }

    public get selected() {
        return this._selected;
    }

    public addSelected(gridItem: IGridItem) {
        this._selected.push(gridItem);
    }

    protected getFirstSelected():IGridItem {
        return this.selected[0];
    }

    public select(gridItem: IGridItem): boolean {
        this.addSelected(gridItem);

        return this.selected.length >= this.needCount;
    }

    public getBusterPanel(): BusterPanel {
        return this.busterPanel;
    }

    public setBusterPanel(busterPanel: BusterPanel): void {
        this.busterPanel = busterPanel;
    }

    public clear() {
        this._selected = [];
    }

    abstract action(): void;
}