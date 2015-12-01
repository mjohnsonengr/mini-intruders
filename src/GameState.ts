export enum GameStateID {
    Boot,
    Preloader,
    MainMenu,
    Level
}

export class GameState extends Phaser.State {
    public static nextStateKey: GameStateID;

    protected nextState(): void {
        // http://stackoverflow.com/a/29244254/1405720
        var dis = <typeof GameState>this.constructor;
        if (!dis.nextStateKey) throw new Error("No nextStateKey defined");
        this.game.state.start(GameStateID[dis.nextStateKey], true, false);
    }
}
