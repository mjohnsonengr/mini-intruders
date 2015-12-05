import {Missile} from "./Missile";

export class SmallDownMissile extends Missile {
    constructor(game: Phaser.Game) {
        super(game, 'sprites', 'missile_small_down.png');
    }
}
