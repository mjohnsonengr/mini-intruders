import {GameState, GameStateID} from "./GameState";

export class Boot extends GameState {
    public static nextStateKey = GameStateID.Preloader;

    public preload() {

        // Preload graphics that are used by the preloader:
        this.load.image('preloadBar', 'assets/loader.png');

    }

    public create() {

        // Unless you specifically need to support multitouch I would
        // recommend setting this to 1
        this.input.maxPointers = 1;

        // Phaser will automatically pause if the browser tab the game is in
        // loses focus; you can disable that here.
        this.stage.disableVisibilityChange = true;

        // Settings on how to handle device scaling
        if (this.game.device.desktop) {
            // If you have any desktop specific settings, they go in here
            this.scale.pageAlignHorizontally = true;
        }
        else {
            // Same goes for mobile settings
        }

        this.nextState();

    }

}
