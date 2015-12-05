import {Missile} from "./Missile";

export class SmallUpMissile extends Missile {
    constructor(game: Phaser.Game) {
        super(game, 'sprites', 'missile_small_up.png');
    }
}
