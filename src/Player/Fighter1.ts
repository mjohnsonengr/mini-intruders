import {Level} from "../Level";
import {Player} from "./Player";
import {Weapon} from "../Weapon/Weapon";
import {BasicUpWeapon} from "../Weapon/BasicUpWeapon";

export class Fighter1 extends Player {
    protected speed = 350;

    constructor(level: Level, x: number, y: number) {
        super(level, x, y, 'sprites', 'fighter1.png');
    }

    protected getWeapon(): Weapon {
        return new BasicUpWeapon(this.level, () => this.world);
    }
}
