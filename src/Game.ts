import * as common from "./common";

import {GameState} from "./GameState";
import {Boot} from "./Boot";
import {Preloader} from "./Preloader";
import {MainMenu} from "./MainMenu";
import {Level} from "./Level";

export enum GameOptions {
    REGULAR = 0,
    PLAY = 1, // skips menu and goes straight to gameplay
}

export class Game extends Phaser.Game {

    constructor(opts?: GameOptions) {

        super(640, 480, Phaser.AUTO, 'content');

        if (!opts) opts = getOptsFromParameters();

        if (opts & GameOptions.PLAY) console.log("PLAY!!!");

        this.state.add(GameState.BOOT, Boot, true);
        this.state.add(GameState.PRELOADER, Preloader, false);
        this.state.add(GameState.MAINMENU, MainMenu, false);
        this.state.add("Level", Level, false);

    }

}

export function getOptsFromParameters(): GameOptions {
    var opts = GameOptions.REGULAR;

    if (common.getParameterByName("play") != null) opts |= GameOptions.PLAY;

    return opts;
}
