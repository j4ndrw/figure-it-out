interface Lerp {
  (a: number, b: number, t: number): number;
  inverse(a: number, b: number, t: number): number;
}

export const lerp: Lerp = ((a, b, t) => a + (b - a) * t) as Lerp;
lerp.inverse = (a, b, t) => (b - a) * t - a;
