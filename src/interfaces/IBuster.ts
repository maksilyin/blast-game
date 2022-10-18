import BaseBuster from "../gameObjects/BaseBuster";

export default interface IBuster extends BaseBuster {
    action(): void;
}