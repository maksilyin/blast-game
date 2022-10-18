export default class Assets {
    private static _assetsPath = './assets';
    private static _spritePath = '/sprites';

    public static sprite (fileName: string): string {
        return `${this.spritePath}/${fileName}`;
    }

    public static get spritePath(): string {
        return this._assetsPath + this._spritePath;
    }
}