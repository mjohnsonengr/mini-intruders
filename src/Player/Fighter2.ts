import {Level} from "../Level";
import {Player} from "./Player";
import {Weapon} from "../Weapon/Weapon";

export class Fighter2 extends Player {
    constructor(level: Level, x: number, y: number) {
        super(level, x, y, 'sprites', 'fighter2.png');
    }

    protected getWeapon(): Weapon {
        throw new Error("Not implemented!");
    }
}
