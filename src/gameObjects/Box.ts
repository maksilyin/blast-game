import BaseGridItem from "./BaseGridItem";

export default class Box extends BaseGridItem {
    protected _code: string = 'box'

    constructor(scene: Phaser.Scene, x: number, y: number, id?:number, type?: number) {
        super(scene, x, y);

        if (!type) {
            this.initType();
        }
        if (id) {
            this._id = id;
        }
        this.setTexture(this.getTexture());
    }

    private initType(): void {
        this._type = Math.floor(Math.random() * (this.config.boxTypes) + 1)
    }

    private getTexture(): string {
        if (!this._type) {
            return '';
        }
        return this.config.boxTexturePrefix + this._type;
    }

    public animDestroy() {
        const emitter = this.getEmitter();
        this.visible = false;

        setTimeout(()=>{
            this.reInit(this.x, -43);
        }, 200)

        setTimeout(()=>{
            emitter.remove()
        }, 600)
    }

    private reInit(x: number, y: number) {
        this.initType();
        this.setTexture(this.getTexture());
        this.setPosition(x, y);
        this.resetState();
        this.visible = true;
    }

    public action(): void {
        this.animDestroy();
    }
}