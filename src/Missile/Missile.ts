export abstract class Missile extends Phaser.Sprite {

    constructor(game: Phaser.Game, key?: string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame?: string|number) {
        super(game, 0, 0, key, frame);

        game.physics.enable(this);

        // enable object recycling
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        game.add.existing(this);

        // start off dead; fire will liven us up
        this.kill();
    }

    public fire(pos: Phaser.Point, velocity: Phaser.Point): void {
        this.exists = true;
        this.body.velocity = velocity;
        this.x = pos.x;
        this.y = pos.y;
    }
}
