import IBonus from "./IBuster";
import BaseBuster from "../gameObjects/BaseBuster";
import IKeyString from "./IKeyString";

export default interface IBonusCollection extends IKeyString{
    [key: string]: Object
}