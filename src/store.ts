import { derived, writable } from "svelte/store";
import { Game, Stage, StageNameMap } from "./data";

export const start = new Date();
export const time = writable(0);
export const stage = writable(Stage.Egg);
export const stageName = derived([stage], ([stage]) => StageNameMap[stage]);
export const health = writable(0.2);
export const hunger = writable(0.75);
export const bored = writable(0);
export const playing = writable<undefined | Game>();
export const maturationThreshold = derived([stage], ([stage]) => {
  const maturationThresholds = {
    [Stage.Egg]: 0,
    [Stage.Baby]: 5, // 300, // 5 minutes
    [Stage.Child]: 10, // 3900, // 65 minutes
    [Stage.Teenager]: 15, // 259200, // 3 day
    [Stage.Adult]: 20, // 518400, // 6 days
  };

  if (stage + 1 in maturationThresholds) return maturationThresholds[stage + 1];

  return Number.POSITIVE_INFINITY;
});

let starvingInterval;
const starving = derived([hunger], ([hunger]) => {
  return hunger >= 0.75;
});

function starve() {
  health.update((health) => {
    return health < 0.1 ? 0 : health - 0.1;
  });
}

starving.subscribe((starving) => {
  if (starving) starvingInterval = setInterval(starve, 2500);
  else clearInterval(starvingInterval);
});

health.subscribe((health) => {
  if (health <= 0) stage.set(Stage.Death);
});
