import { kCtx } from "./KaboomCtx";
import { createDummyGame, createGame, createScene } from "./utils/sceneUtil";

// Init Kaboom
async function init() {

    // Menü-Szene
    kCtx.scene("menu", () => {
        createScene(kCtx);
    });

    // Game-Szene
    kCtx.scene("game", () => {
        // Dummy game scene
        createGame(kCtx);
    });

    // Spiel mit Menü starten
    kCtx.go("menu");
}

init()