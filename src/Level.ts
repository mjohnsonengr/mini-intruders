import {Player} from "./Player/Player";

export class Level extends Phaser.State {

    private background: Phaser.Sprite;
    private player: Player;

    public create() {

        //this.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.add.sprite(0, 0, 'background01');

        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height*0.8);

    }

}
