import IGridConfig from "./IGridConfig";

export default interface IGridItem extends Phaser.Physics.Arcade.Sprite {
    id: number;
    itemType: number;
    config: IGridConfig;
    particles: Phaser.GameObjects.Particles;
    code: string;
    state: number;

    get posX(): number;

    get posY(): number;

    setId(id: number): void;

    getEmitter(config: any): Phaser.GameObjects.Particles.ParticleEmitter;

    getType(): number;

    action(): void;

    resetState(): void;

    disable(): void;

    activeItem(): void;
}