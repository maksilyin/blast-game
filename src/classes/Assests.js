"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Assets {
    static sprite(fileName) {
        return `${this.spritePath}/${fileName}`;
    }
    static get spritePath() {
        return this._assetsPath + this._spritePath;
    }
}
exports.default = Assets;
Assets._assetsPath = './assets';
Assets._spritePath = '/sprites';
//# sourceMappingURL=Assests.js.map