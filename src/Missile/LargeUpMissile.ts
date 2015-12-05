import {Missile} from "./Missile";

export class LargeUpMissile extends Missile {
    constructor(game: Phaser.Game, pos: Phaser.Point) {
        super(game, pos, 'sprites', 'missile_big_up.png');
    }
}
