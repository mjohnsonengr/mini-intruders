import {Boot} from "./Boot";
import {Preloader} from "./Preloader";
import {MainMenu} from "./MainMenu";

    export class Game extends Phaser.Game {

        constructor() {

            super(640, 480, Phaser.AUTO, 'content');

            this.state.add('Boot', Boot, true);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            //this.state.add('Level1', Level1, false);

        }

    }
