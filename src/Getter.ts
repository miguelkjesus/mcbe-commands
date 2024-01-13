function isCallable<T>(maybeFunc: T | unknown): maybeFunc is Function {
  return typeof maybeFunc === "function";
}

export class Getter<TParams extends any[], TReturn> {
  readonly value: (...args: TParams) => TReturn;

  constructor(getter: TReturn | ((...args: TParams) => TReturn)) {
    if (isCallable(getter)) {
      this.value = getter;
    } else {
      this.value = () => getter;
    }
  }
}
