module MiniIntruders {
    export class GameState extends Phaser.State {
        public nextStateKey: string;

        protected nextState(): void {
            if (!this.nextStateKey) throw new Error("No nextStateKey defined");
            this.game.state.start(this.nextStateKey, true, false);
        }
    }
}
