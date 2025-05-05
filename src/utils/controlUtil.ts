import { GameObj, KaboomCtx } from "kaboom";
import { shootLaser } from "./playerUtil";
import { conPlayerSpeed } from "../constants";

export function setMenuControl(kCtx: KaboomCtx, selectedIndex: number, buttons: GameObj[]) {
    // key controls for menu
    kCtx.onKeyPress("down", () => {
        selectedIndex = (selectedIndex + 1) % buttons.length;
        updateSelection(kCtx, selectedIndex, buttons);
    });

    kCtx.onKeyPress("up", () => {
        selectedIndex = (selectedIndex - 1 + buttons.length) % buttons.length;
        updateSelection(kCtx, selectedIndex, buttons);
    });
    kCtx.onKeyPress("w", () => {
        selectedIndex = (selectedIndex + 1) % buttons.length;
        updateSelection(kCtx, selectedIndex, buttons);
    });

    kCtx.onKeyPress("s", () => {
        selectedIndex = (selectedIndex - 1 + buttons.length) % buttons.length;
        updateSelection(kCtx, selectedIndex, buttons);
    });

    kCtx.onKeyPress("enter", () => {
        const selected = buttons[selectedIndex];
        selected.action?.(); // run attached function
    });
    kCtx.onKeyPress("space", () => {
        const selected = buttons[selectedIndex];
        selected.action?.(); // run attached function
    });
}

export function updateSelection(kCtx: KaboomCtx, selectedIndex: number, buttons: GameObj[]) {
    buttons.forEach((btn, i) => {
        btn.scale = kCtx.vec2(i === selectedIndex ? 1.3 : 1);
    });
}

export function setPlayerControls(kCtx: KaboomCtx, player: GameObj) {

    // movement mechanics
    kCtx.onKeyDown("a", () => { player.move(-conPlayerSpeed.x, 0); });
    kCtx.onKeyDown("d", () => { player.move(conPlayerSpeed.x, 0); });
    kCtx.onKeyDown("w", () => { player.move(0, -conPlayerSpeed.y); });
    kCtx.onKeyDown("s", () => { player.move(0, conPlayerSpeed.y); });
    // kCtx.onKeyDown("k", () => { player.move(2, 2); });

    // shooting mechanics
    let lastShot = 0;
    const shotDelay = 0.4; // seconds between shots
    // let isShooting = false;
    kCtx.onKeyPress("l", () => shootLaser(kCtx, player));
    kCtx.onKeyPress("space", () => shootLaser(kCtx, player));
    kCtx.onKeyDown("space", () => {
        const now = kCtx.time(); // Current game time in seconds
        if (now - lastShot > shotDelay) {
            shootLaser(kCtx, player);
            lastShot = now;
        }
    });
    kCtx.onKeyDown("l", () => {
        const now = kCtx.time(); // Current game time in seconds
        if (now - lastShot > shotDelay) {
            shootLaser(kCtx, player);
            lastShot = now;
        }
    });
}