export function randomFromArray<T = any>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

export function keysOfEnum<T extends {}>(enumeration: T) {
  return Object.keys(enumeration).filter(Number.isNaN) as Array<keyof T>;
}

export function valuesOfEnum<T extends {}>(enumeration: T) {
  return Object.values(enumeration).filter(Number.isInteger) as Array<
    T[keyof T]
  >;
}

export enum Action {
  Bathroom,
  Discipline,
  Feed,
  Game,
  Light,
  Medicine,
}

export enum Game {
  RockPaperScissors,
  GuessTheNumber,
}

export enum Stage {
  Egg,
  Baby,
  Child,
  Teenager,
  Adult,
  Senior,
  Death,
}

export const ActionNameMap: Record<Action, string> = {
  [Action.Bathroom]: "bathroom",
  [Action.Discipline]: "discipline",
  [Action.Feed]: "feed",
  [Action.Game]: "game",
  [Action.Light]: "light",
  [Action.Medicine]: "medicine",
};
export const StageNameMap: Record<Stage, string> = {
  [Stage.Egg]: "egg",
  [Stage.Baby]: "baby",
  [Stage.Child]: "child",
  [Stage.Teenager]: "teenager",
  [Stage.Adult]: "adult",
  [Stage.Senior]: "senior",
  [Stage.Death]: "death",
};

export const GameNameMap: Record<Game, string> = {
  [Game.GuessTheNumber]: "Guess the Number",
  [Game.RockPaperScissors]: "Rock, Paper, Scissors",
};
