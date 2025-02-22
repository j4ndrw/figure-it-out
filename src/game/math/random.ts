export const randomInt = (min: number, max: number) => {
  const a = Math.floor(min);
  const b = Math.floor(max);
  return a + Math.floor(Math.random() * (b) + 1);
};
