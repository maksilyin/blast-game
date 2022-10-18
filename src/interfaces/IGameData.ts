import IKeyString from "./IKeyString";

export default interface IGameData extends IKeyString{
    level: number,
    currentScore: number,
    money: number
}