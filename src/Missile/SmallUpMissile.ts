import {Missile} from "./Missile";

export class SmallUpMissile extends Missile {
    constructor(game: Phaser.Game, pos: Phaser.Point) {
        super(game, pos, 'sprites', 'missile_small_up.png');
    }
}
