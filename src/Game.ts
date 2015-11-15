module MiniIntruders {

    export class Game extends Phaser.Game {

        constructor() {

            super(640, 480, Phaser.AUTO, 'content');

            this.state.add('Boot', Boot, true);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level', Level, false);

        }

    }

}
