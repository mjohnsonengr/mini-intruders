import * as common from "../common";

import {IShootable} from "../Entity/IShootable";
import {Level} from "../Level";
import {Weapon} from "../Weapon/Weapon";
import keys = Phaser.Keyboard; // shortcut

export abstract class Player extends Phaser.Sprite implements IShootable {

    public level: Level;
    public weapon: Weapon;

    protected speed: number;

    private _debug = false;
    private startX: number;
    private startY: number;

    constructor(level: Level, x: number, y: number, key?: string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame?: string|number) {

        super(level.game, x, y, key, frame);

        this.level = level;
        this.startX = x;
        this.startY = y;

        this.anchor.setTo(0.5, 0);

        this.game.physics.enable(this);
        this.body.collideWorldBounds = true;

        this.weapon = this.createWeapon();

        this.game.add.existing(this);
    }

    public update() {
        common.assert(this.speed, "Player.speed is uninitialized!");

        // side-to-side
        this.body.velocity.x = 0;
        if (this.keyDown(keys.LEFT)) {
            this.body.velocity.x = -this.speed;
        }
        else if (this.keyDown(keys.RIGHT)) {
            this.body.velocity.x = this.speed;
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

    public onShot(): void {
        console.log("By George, He's been SHOT!");
        this.kill();
        setTimeout(() => this.reset(this.startX, this.startY), 1000);
    }

    protected abstract createWeapon(): Weapon;

    private keyDown = (key: number) => this.game.input.keyboard.isDown(key);

}
