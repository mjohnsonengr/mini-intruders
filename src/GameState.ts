export class GameState extends Phaser.State {
    public static nextStateKey: string;
    public static BOOT = "Boot";
    public static PRELOADER = "Preloader";
    public static MAINMENU = "MainMenu";
    public static LEVEL1 = "Level1";

    protected nextState(): void {
        // http://stackoverflow.com/a/29244254/1405720
        var dis = <typeof GameState>this.constructor;
        if (!dis.nextStateKey) throw new Error("No nextStateKey defined");
        this.game.state.start(dis.nextStateKey, true, false);
    }
}
