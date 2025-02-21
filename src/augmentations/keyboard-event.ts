declare global {
  interface KeyboardEvent {
    isUpperCaseAlphaCharKey(): boolean;
  }
}

KeyboardEvent.prototype.isUpperCaseAlphaCharKey = function() {
  return (
    this.key.length === 1 && /[A-Za-z]/.test(this.key) && this.key.isUpperCase()
  );
};

export { };
