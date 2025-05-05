import kaboom from "kaboom";
import { conScale } from "./constants";

export const kCtx = kaboom({
    width: 960,
    height: 960,
    letterbox: true,
    global: false,
    scale: conScale
}); 