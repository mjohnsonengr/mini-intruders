import {Player} from "./Player";

export class Fighter1 extends Player {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'sprites', 'fighter1.png');
    }
}
