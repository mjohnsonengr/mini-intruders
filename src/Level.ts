module MiniIntruders {

    export class Level extends Phaser.State {

        private background: Phaser.Sprite;
        private player: Player;

        public create() {

            //this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'background01');

            this.player = new Player(this.game, 130, 284);

        }

    }

}
