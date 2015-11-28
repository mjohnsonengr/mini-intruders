import * as common from "./common";

import {GameState, GameStateID} from "./GameState";
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

        this.addState(GameStateID.Boot, Boot, true);
        this.addState(GameStateID.Preloader, Preloader);
        this.addState(GameStateID.MainMenu, MainMenu);
        this.addState(GameStateID.Level, Level);

    }

    public addState(id: GameStateID, state: any, autoStart?: boolean): void {
        this.state.add(GameStateID[id], state, autoStart);
    }
}

export function getOptsFromParameters(): GameOptions {
    var opts = GameOptions.REGULAR;

    if (common.getParameterByName("play") != null) opts |= GameOptions.PLAY;

    return opts;
}
