import {Player} from "./Player";
import {Weapon} from "../Weapon/Weapon";

export class Fighter3 extends Player {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'sprites', 'fighter3.png');
    }

    protected getWeapon(): Weapon {
        throw new Error("Not implemented!");
    }
}
