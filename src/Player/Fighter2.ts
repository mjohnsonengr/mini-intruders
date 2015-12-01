import {Player} from "./Player";

export class Fighter2 extends Player {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'sprites', 'fighter2.png');
    }
}
