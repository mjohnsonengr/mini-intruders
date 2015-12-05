import {Player} from "./Player";
import {Weapon} from "../Weapon/Weapon";

export class Fighter2 extends Player {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'sprites', 'fighter2.png');
    }

    protected getWeapon(): Weapon {
        throw new Error("Not implemented!");
    }
}
