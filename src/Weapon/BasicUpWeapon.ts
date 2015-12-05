import {Weapon} from "./Weapon";
import {Missile} from "../Missile/Missile";
import {SmallUpMissile} from "../Missile/SmallUpMissile";

export class BasicUpWeapon extends Weapon {
    protected fireInterval = 75;
    protected fireSpeed = 600; // pixels per second
    protected fireDirection = -90; // up means negative y!!

    protected createMissile(): Missile {
        return new SmallUpMissile(this.game, this.player.world);
    }
}
