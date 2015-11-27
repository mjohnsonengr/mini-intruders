import {Boot} from "./Boot";
import {Preloader} from "./Preloader";
import {MainMenu} from "./MainMenu";

export enum GameOptions {
    REGULAR = 0,
    PLAY = 1, // skips menu and goes straight to gameplay
}

export class Game extends Phaser.Game {

    constructor(opts?: GameOptions) {

        super(640, 480, Phaser.AUTO, 'content');

        this.state.add('Boot', Boot, true);
        this.state.add('Preloader', Preloader, false);
        this.state.add('MainMenu', MainMenu, false);
        //this.state.add('Level1', Level1, false);

    }
    /*public static parseArgs(args: string): GameOptions {

    }*/

}
