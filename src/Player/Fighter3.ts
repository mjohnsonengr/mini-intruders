import {Player} from "./Player";

export class Fighter3 extends Player {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'sprites', 'fighter3.png');
    }
}
