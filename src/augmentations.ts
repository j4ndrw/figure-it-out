declare global {
  interface String {
    fromPixel(): number;
  }
}

String.prototype.fromPixel = function() {
  return +this.replace(/px/g, '');
}

export {};
