import { GameObj, KaboomCtx } from "kaboom";
import { makePlayer } from "./playerUtil";
import { setMenuControl, updateSelection } from "./controlUtil";

export function createScene(kCtx: KaboomCtx) {
    const menuOptions = [
        { label: "Start Game", action: () => kCtx.go("game") },
        { label: "Exit", action: () => alert("Thanks for playing!") },
    ];

    const buttons: GameObj[] = [];

    let selectedIndex = 0;

    menuOptions.forEach((option, i) => {
        const btn = kCtx.add([
            kCtx.text(option.label, { size: 24 }),
            kCtx.pos(kCtx.center().x, 180 + i * 50),
            kCtx.anchor("center"),
            kCtx.area(),
            kCtx.scale(1),
            { action: option.action }, // custom property
        ]);
        buttons.push(btn);
    });

    // Highlight logic

    setMenuControl(kCtx, selectedIndex, buttons)
    updateSelection(kCtx, selectedIndex, buttons)


    addBackground(kCtx)
}

export function createDummyGame(kCtx: KaboomCtx) {
    kCtx.add([
        kCtx.text("Game is running!", { size: 32 }),
        kCtx.pos(kCtx.center()),
        kCtx.anchor("center"),
    ]);

    kCtx.onKeyPress("escape", () => kCtx.go("menu"));

    addBackground(kCtx);
}

export function createGame(kCtx: KaboomCtx) {
    const canvas: { x: number; y: number } = {
        x: kCtx.width() - 100,
        y: kCtx.height() - 100,
    };

    // Define and add a translucent play area
    // const playArea = kCtx.add([
    kCtx.add([
        kCtx.rect(canvas.x, canvas.y),
        kCtx.color(kCtx.Color.fromHex("#828282")),
        kCtx.opacity(0.5),
        kCtx.pos(50, 50), // center it with some margin
        kCtx.z(0),
    ]);

    // const player = makePlayer(kCtx);
    makePlayer(kCtx);

    const margin = 50;
    const width = kCtx.width() - 100;
    const height = kCtx.height() - 100;

    // LEFT border
    kCtx.add([
        kCtx.rect(20, height),
        kCtx.pos(margin, margin),
        kCtx.area(),
        kCtx.body({ isStatic: true }),
        kCtx.color(120, 120, 120),
    ]);

    // RIGHT border
    kCtx.add([
        kCtx.rect(20, height),
        kCtx.pos(margin + width - 20, margin),
        kCtx.area(),
        kCtx.body({ isStatic: true }),
        kCtx.color(120, 120, 120),
    ]);

    // TOP border
    kCtx.add([
        kCtx.rect(width, 20),
        kCtx.pos(margin, margin),
        kCtx.area(),
        kCtx.body({ isStatic: true }),
        kCtx.color(120, 120, 120),
    ]);

    // BOTTOM border (you already had this, adjusted slightly)
    kCtx.add([
        kCtx.rect(width, 20),
        kCtx.pos(margin, margin + height - 20),
        kCtx.area(),
        kCtx.body({ isStatic: true }),
        kCtx.color(120, 120, 120),
    ]);

    addAlteranteBg(kCtx);
}

function addBackground(kCtx: KaboomCtx) {
    const bgFrames = ["bg1", "bg2", "bg3", "bg4"];

    // Laden
    bgFrames.forEach((name, i) => {
        kCtx.loadSprite(name, `./bg/bg-${i + 1}.png`);
    });

    //logic
    let current = 0;

    // Erstes Hintergrundbild anzeigen
    const bg: GameObj = kCtx.add([
        kCtx.sprite(bgFrames[0]),
        kCtx.pos(0, 0),
        kCtx.z(-1),
        kCtx.scale(kCtx.width() / 220, kCtx.height() / 220), // passt ggf. an Bildgröße an
    ]);

    // Animation durch Frame-Wechsel
    kCtx.loop(0.2, () => {
        current = (current + 1) % bgFrames.length;
        bg.use(kCtx.sprite(bgFrames[current]));
    });
}

function addAlteranteBg(kCtx: KaboomCtx) {
    let bgFrames: string[] = []

    for (let i = 0; i < 34; i++) {
        bgFrames.push(`bg2-${i}`)
        kCtx.loadSprite(`bg2-${i}`, `./bg2/bg2-${i + 1}.png`);
    }

    //logic
    let current = 0;

    // Erstes Hintergrundbild anzeigen
    const bg: GameObj = kCtx.add([
        kCtx.sprite(bgFrames[0]),
        kCtx.pos(0, 0),
        kCtx.z(-1),
        kCtx.scale(kCtx.width() / 130, kCtx.height() / 130), // passt ggf. an Bildgröße an
    ]);

    // Animation durch Frame-Wechsel
    kCtx.loop(0.2, () => {
        current = (current + 1) % bgFrames.length;
        bg.use(kCtx.sprite(bgFrames[current]));
    });
}



