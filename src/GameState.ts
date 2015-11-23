module MiniIntruders {
    export class GameState extends Phaser.State {
        public nextStateKey: string;

        protected nextState(): void {
            this.game.state.start(this.nextStateKey, true, false);
        }
    }
}
