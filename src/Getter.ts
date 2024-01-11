type NotFunction<T> = T extends (...args: any[]) => any ? never : T;

function isCallable<T>(maybeFunc: T | unknown): maybeFunc is Function {
  return typeof maybeFunc === "function";
}

export type Getter<T extends (...args: any) => any = (...args: any) => any> =
  | ReturnType<T>
  | T;

export function fromGetter<TValue, TGetterArgs extends any[]>(
  getter: Getter<(...args: TGetterArgs) => NotFunction<TValue>>,
  args: TGetterArgs
): TValue {
  if (isCallable(getter)) {
    return getter(...args);
  } else {
    return getter;
  }
}
