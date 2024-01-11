export class Signal<
  TCallback extends (...args: readonly any[]) => any = (
    ...args: readonly any[]
  ) => any
> {
  protected callbacks = new Array<TCallback>();

  subscribe(callback: TCallback): TCallback {
    this.callbacks.push(callback);
    return callback;
  }

  unsubscribe(callback: TCallback) {
    let idx = this.callbacks.indexOf(callback);
    if (idx === -1) return;
    this.callbacks.splice(idx);
  }

  emit(...args: Parameters<TCallback>) {
    for (let callback of this.callbacks) {
      callback(...args);
    }
  }
}
