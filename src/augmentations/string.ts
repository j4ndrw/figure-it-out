declare global {
  interface String {
    fromPixel(): number;
    fromHex(): number;
    isLowerCase(): boolean;
    isUpperCase(): boolean;
  }
}

String.prototype.fromPixel = function() {
  return +this.replace(/px/g, "");
};

String.prototype.fromHex = function() {
  return Number(`0x${this.replace("#", "")}`);
};

String.prototype.isLowerCase = function() {
  return this === this.toLowerCase();
};

String.prototype.isUpperCase = function() {
  return this === this.toUpperCase();
};

export { };
