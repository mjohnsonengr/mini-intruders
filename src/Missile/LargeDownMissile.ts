import {Missile} from "./Missile";

export class LargeDownMissile extends Missile {
    constructor(game: Phaser.Game) {
        super(game, 'sprites', 'missile_big_down.png');
    }
}
