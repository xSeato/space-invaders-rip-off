import { GameObj, KaboomCtx } from "kaboom";
import { setPlayerControls } from "./controlUtil";
import { conLaserSpeed } from "../constants";

export function makePlayer(kCtx: KaboomCtx) {
    kCtx.loadSprite("player", "/player/player.png");

    const player = kCtx.add([
        kCtx.sprite("player"),
        // kCtx.pos(kCtx.width(), kCtx.height()),
        kCtx.pos(kCtx.width() / 2, kCtx.height() - 100),
        kCtx.area(),
        kCtx.body(),
    ]);

    setPlayerControls(kCtx, player);
    return player;
}

export function shootLaser(kCtx: KaboomCtx, player: GameObj) {
    // Create the laser object
    const laser = kCtx.add([
        kCtx.rect(8, 30), // Laser size (width x height)
        kCtx.color(255, 0, 0), // Red color for laser
        kCtx.pos(player.pos.x, player.pos.y - 40), // Position above the player
        kCtx.area(),
        kCtx.scale(1, 1),
        {layer: 1},
        "laser", // Tag this object as a laser
    ]);

    // Update the laser's position each frame
    laser.onUpdate(() => {
        // Move the laser upwards each frame
        laser.pos.y -= conLaserSpeed * kCtx.dt(); // kCtx.dt() makes movement frame-rate independent
        // If the laser goes off-screen, destroy it
        if (laser.pos.y < 0 || laser.pos.x < 0 || laser.pos.x > kCtx.width()) {
            laser.destroy();
        }
    });
}
