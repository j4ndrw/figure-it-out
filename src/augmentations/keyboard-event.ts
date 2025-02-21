declare global {
  interface KeyboardEvent {
    /**
     * # WARNING
     * This is an augmentation built on top of the `KeyboardEvent` prototype. Use with caution!
     */
    isUpperCaseAlphaCharKey(): boolean;
  }
}

KeyboardEvent.prototype.isUpperCaseAlphaCharKey = function() {
  return (
    this.key.length === 1 && /[A-Za-z]/.test(this.key) && this.key.isUpperCase()
  );
};

export { };
