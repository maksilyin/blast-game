import Register from "../classes/Register";
import GameLogic from "../classes/GameLogic";
import Store from "../classes/Store";

class LoseScene extends Phaser.Scene {
    container: any

    constructor() {
        super({
            key: 'LoseScene'
        });
    }

    init = () => {
        Register.UIRegister();
    }
    preload = (): void => {

    }
    create = () => {

        const winText = "Вы проиграли";
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.8).setOrigin(0,0);

        const popupPanel = this.add.image(0, 0, 'popupPanel')
            .setScale(0.5);

        this.container = this.add.container(this.scale.width / 2, this.scale.height / 2);

        const nextBtn = this.add.image(0, 130, 'btnNext')
            .setScale(0.5)
            .setInteractive();

        const text = this.add.text(0, 0, winText, { fontFamily: Store.config.font, fontSize: '14em' })
            .setOrigin(0.5, 0.5)
            .setScale(0.23);

        const textBtn = this.add.text(0, 130, 'Заново', { fontFamily: Store.config.font, fontSize: '12em' })
            .setOrigin(0.5, 0.5)
            .setScale(0.23);

        this.container.add([
            popupPanel,
            text,
            nextBtn,
            textBtn,
        ]).setScale(0)

        nextBtn.on('pointerdown',  (pointer: any) => {
            if (pointer.leftButtonDown()) {
                GameLogic.restart();
                this.scene.setVisible(false);
                this.scene.start('UIScene');
                this.scene.start('default');
            }
        });
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        if (this.container.scale < 1) {
            this.container.setScale(this.container.scale + 0.04)
        }
    }


}

export default LoseScene;