import { Position } from "@vue-flow/core";

export function rotateFunction(position) {
    if (position.value === Position.Top) {
        position.value = Position.Right;
    } else if (position.value === Position.Right) {
        position.value = Position.Bottom;
    } else if (position.value === Position.Bottom) {
        position.value = Position.Left;
    } else if (position.value === Position.Left) {
        position.value = Position.Top;
    }
}