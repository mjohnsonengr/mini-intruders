import {Missile} from "./Missile";

export class LargeUpMissile extends Missile {
    constructor(game: Phaser.Game) {
        super(game, 'sprites', 'missile_big_up.png');
    }
}
