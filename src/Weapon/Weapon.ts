import * as common from "../common";

import {Missile} from "../Missile/Missile";
import {Player} from "../Player/Player";

/**
 * Firing system (named Weapon because it makes sense :D)
 * In the future, will also be used to represent enemy firing system (subclasses?)
 */
export abstract class Weapon {
    public firing = false;
    public game: Phaser.Game;

    // these help determine how and when to fire
    protected fireInterval: number;
    protected fireSpeed: number; // pixels per second
    protected fireDirection: number; // degrees
    protected lastFired = 0;

    private cachedVelocity: Phaser.Point;

    // track all ammo so it can be re-used when it has exited the screen.
    private missiles: Phaser.Group;

    // gets position of this weapon to fire from
    private getPosition: () => Phaser.Point;

    constructor(game: Phaser.Game, getPosition: () => Phaser.Point) {
        this.game = game;
        this.getPosition = getPosition;
        this.missiles = new Phaser.Group(game);
    }

    public update(): void {
        this.assertInitialized();
        if (this.canFire()) this.fire();
    }

    protected canFire(): boolean {
        return this.firing && Date.now() - this.lastFired > this.fireInterval;
    }

    /** creates a new missile */
    protected abstract createMissile(): Missile;

    /** returns a basic velocity based on direction with no randomization */
    protected getVelocity(): Phaser.Point {
        return this.cachedVelocity || (this.cachedVelocity = new Phaser.Point(1,0)
            .setMagnitude(this.fireSpeed).rotate(0,0,this.fireDirection,true));
    }

    private assertInitialized(): void {
        common.assert(this.fireInterval != null, "fireInterval isn't defined!");
        common.assert(this.fireSpeed != null, "fireSpeed isn't defined!");
        common.assert(this.fireDirection != null, "fireDirection isn't defined!");
    }

    private fire(): void {
        console.log("FIRE!!!");
        this.getMissile().fire(this.getPosition(), this.getVelocity());
        this.lastFired = Date.now();
    }

    /** returns a missile suitable for firing. */
    private getMissile(): Missile {
        console.log(this.missiles.length);
        return this.missiles.getFirstExists(false) || this.missiles.add(this.createMissile());
    }
}
