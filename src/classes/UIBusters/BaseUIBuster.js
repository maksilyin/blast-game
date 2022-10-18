"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseUIBuster {
    constructor() {
        this._needCount = 1;
        this._selected = [];
    }
    get needCount() {
        return this._needCount;
    }
    get selected() {
        return this._selected;
    }
    addSelected(gridItem) {
        this._selected.push(gridItem);
    }
    getFirstSelected() {
        return this.selected[0];
    }
    select(gridItem) {
        this.addSelected(gridItem);
        return this.selected.length >= this.needCount;
    }
    getBusterPanel() {
        return this.busterPanel;
    }
    setBusterPanel(busterPanel) {
        this.busterPanel = busterPanel;
    }
    clear() {
        this._selected = [];
    }
}
exports.default = BaseUIBuster;
//# sourceMappingURL=BaseUIBuster.js.map