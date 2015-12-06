import {Player} from "./Player/Player";
import {Fighter1} from "./Player/Fighter1";

export class Level extends Phaser.State {
    public playerMissiles: Phaser.Group;
    public enemyMissiles: Phaser.Group;

    private background: Phaser.Sprite;
    private player: Player;

    public create() {
        this.background = this.add.sprite(0, 0, 'background01');

        // initialize
        this.playerMissiles = this.game.add.group();
        this.enemyMissiles = this.game.add.group();

        // add entities
        this.player = new Fighter1(this, this.game.world.centerX, this.game.world.height*0.8);
    }
}
