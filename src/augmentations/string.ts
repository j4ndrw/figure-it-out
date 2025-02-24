declare global {
  interface String {
    /**
     * # WARNING
     * This is an augmentation built on top of the `String` prototype. Use with caution!
     */
    fromPixel(): number;

    /**
     * # WARNING
     * This is an augmentation built on top of the `String` prototype. Use with caution!
     */
    fromHex(): number;

    /**
     * # WARNING
     * This is an augmentation built on top of the `String` prototype. Use with caution!
     */
    isLowerCase(): boolean;

    /**
     * # WARNING
     * This is an augmentation built on top of the `String` prototype. Use with caution!
     */
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
