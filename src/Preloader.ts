import {GameState, GameStateID} from "./GameState";

export class Preloader extends GameState {
    public static nextStateKey = GameStateID.MainMenu;

    private preloadBar: Phaser.Sprite;

    public preload() {

        // Set-up our preloader sprite
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        // Load our actual games assets
        // TODO avoid hard-coded strings
        // TODO what are the considerations for future loading instead of all at once?

        // First, some app-wide stuff
        this.load.image('background01', 'assets/background01.png');
        this.load.audio('music', 'assets/audio/hop2nextlvl.mp3');

        // Some stuff for the menu (TODO programmatically generate menu text)
        this.load.image('menu_intro', 'assets/Dbproductions.png');
        this.load.image('menu_logo', 'assets/spaceinvaders.png');
        this.load.atlas('menu', 'assets/menu.png', 'assets/menu.json');

        // Some stuff for gameplay
        this.load.atlas('sprites', 'assets/sprites.png', 'assets/sprites.json');
        this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);

    }

    public create() {

        // This fades the preload bar over the duration of 1 second
        this.add.tween(this.preloadBar)
            .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
            .onComplete.add(this.startMainMenu, this);
        this.add.audio('music', 1, true).play();
    }

    private startMainMenu() {

        this.nextState();

    }

}
