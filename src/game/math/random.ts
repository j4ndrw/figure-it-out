import { clamp } from "./clamp";

export const randomInt = (min: number, max: number) => {
  const a = Math.floor(min);
  const b = Math.floor(max);
  return a + Math.floor(Math.random() * b + 1);
};

export const chance = (percentage: number) => {
  const p = clamp(percentage, 0, 1);
  return randomInt(0, 100) > 100 - p * 100;
};
