export abstract class Missile extends Phaser.Sprite {

    constructor(game: Phaser.Game, pos: Phaser.Point,
        key?: string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame?: string|number) {
        super(game, pos.x, pos.y, key, frame);

        game.physics.enable(this);

        // enable object recycling
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        game.add.existing(this);
    }

    public fire(pos: Phaser.Point, velocity: Phaser.Point): void {
        this.exists = true;
        this.body.velocity = velocity;
        this.x = pos.x;
        this.y = pos.y;
    }

    public update(): void {
        // TODO collision
        // hit player or enemy? Call their "shot" methods and delete bullet
    }
}
