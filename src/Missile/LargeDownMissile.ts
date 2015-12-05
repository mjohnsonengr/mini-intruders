import {Missile} from "./Missile";

export class LargeDownMissile extends Missile {
    constructor(game: Phaser.Game, pos: Phaser.Point) {
        super(game, pos, 'sprites', 'missile_big_down.png');
    }
}
