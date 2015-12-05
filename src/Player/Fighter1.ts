import {Player} from "./Player";
import {Weapon} from "../Weapon/Weapon";
import {BasicUpWeapon} from "../Weapon/BasicUpWeapon";

export class Fighter1 extends Player {
    protected speed = 350;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'sprites', 'fighter1.png');
    }

    protected getWeapon(): Weapon {
        return new BasicUpWeapon(this.game, this);
    }
}
