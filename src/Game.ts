import {GameState} from "./GameState";
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

        this.state.add(GameState.BOOT, Boot, true);
        this.state.add(GameState.PRELOADER, Preloader, false);
        this.state.add(GameState.MAINMENU, MainMenu, false);
        //this.state.add(GameState.LEVEL1, Level1, false);

    }
    /*public static parseArgs(args: string): GameOptions {

    }*/

}
