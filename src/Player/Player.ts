import {Weapon} from "../Weapon/Weapon";
import keys = Phaser.Keyboard; // shortcut

export abstract class Player extends Phaser.Sprite {

    private _debug = false;
    private weapon: Weapon;

    constructor(game: Phaser.Game, x: number, y: number, key?: string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame?: string|number) {

        super(game, x, y, key, frame);

        this.anchor.setTo(0.5, 0);

        game.physics.enable(this);
        this.body.collideWorldBounds = true;

        this.weapon = this.getWeapon();

        game.add.existing(this);
    }

    public update() {

        // side-to-side
        this.body.velocity.x = 0;
        if (this.keyDown(keys.LEFT)) {
            this.body.velocity.x = -170;
        }
        else if (this.keyDown(keys.RIGHT)) {
            this.body.velocity.x = 170;
        }

        // firing
        this.weapon.firing = false;
        if (this.keyDown(keys.SPACEBAR)) {
            this.weapon.firing = true;
        }
        this.weapon.update();

        // enable debug info if necessary
        if (this._debug) {
            this.game.debug.bodyInfo(this, 32, 32);
            this.game.debug.body(this);
        }
    }

    protected abstract getWeapon(): Weapon;

    private keyDown = (key: number) => this.game.input.keyboard.isDown(key);

}
