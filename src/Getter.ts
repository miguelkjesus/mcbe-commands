type NotFunction<T> = T extends (...args: any[]) => any ? never : T;

function isCallable<T>(maybeFunc: T | unknown): maybeFunc is Function {
  return typeof maybeFunc === "function";
}

export class Getter<TParams extends any[], TReturn> {
  value: (...args: TParams) => TReturn;

  constructor(getter: TReturn | ((...args: TParams) => TReturn)) {
    if (isCallable(getter)) {
      this.value = getter;
    } else {
      this.value = () => getter;
    }
  }
}
