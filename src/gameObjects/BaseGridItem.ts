import GameManager from "../classes/GameManager";
import IGridItem from "../interfaces/IGridItem";
import IGridConfig from "../interfaces/IGridConfig";

export default abstract class BaseGridItem extends Phaser.Physics.Arcade.Sprite implements IGridItem {
    protected _id: number = 0;
    protected _type: number;
    protected _config = GameManager.config;
    protected _particles: Phaser.GameObjects.Particles;
    protected _code: string = 'grid_item';
    public state: number;

    protected constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '');
        this._particles = this.scene.add.particles('flares').setDepth(2);
    }

    public activeItem(): void {
        this.body.enable = true;
    }

    public disable(): void {
        this.body.enable = false;
    }

    public get posX(): number {
        return Math.round(this.x);
    }

    public get posY(): number {
        return Math.round(this.y);
    }

    public get config(): IGridConfig {
        return this._config;
    }

    public get code(): string {
        return this._code;
    }

    public get id(): number {
        return this._id;
    }

    public get particles(): Phaser.GameObjects.Particles {
        return this._particles;
    }

    public get itemType(): number {
        return this._type;
    }

    public getEmitter(config?: any):  Phaser.GameObjects.Particles.ParticleEmitter {
        const pos = this.getCenter();

        if (!config) {
            config = {
                frame: { frames: [ 'yellow' ], cycle: true },
                x: pos.x,
                y: pos.y,
                lifespan: 1000,
                speed: { min: 15, max: 15 },
                scale: { start: 0.1, end: 0.1 },
                gravity: 10,
                quantity: 2,
                blendMode: 'ADD',
                maxVelocityY: 20,
                maxVelocityX: 20
            }
        }

        return this.particles.createEmitter(config);
    }

    public set code(value: string) {
        this._code = value;
    }

    public setId(id: number) {
        this._id = id;
    }

    public getType(): number {
        return this._type;
    }

    public resetState(): void {
        this.state = 0;
    }

    public action(): void{}
}