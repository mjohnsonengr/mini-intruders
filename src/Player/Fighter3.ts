import {Level} from "../Level";
import {Player} from "./Player";
import {Weapon} from "../Weapon/Weapon";

export class Fighter3 extends Player {
    constructor(level: Level, x: number, y: number) {
        super(level, x, y, 'sprites', 'fighter3.png');
    }

    protected createWeapon(): Weapon {
        throw new Error("Not implemented!");
    }
}
