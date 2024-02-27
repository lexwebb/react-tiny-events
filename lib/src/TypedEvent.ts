export interface Listener<T> {
  (event: T): void;
}

export interface Disposable {
  dispose: () => void;
}

export class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOnceQueue: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener),
    };
  };

  once = (listener: Listener<T>): void => {
    this.listenersOnceQueue.push(listener);
  };

  off = (listener: Listener<T>) => {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  };

  emit = (...args: unknown extends T ? [event?: T] : [event: T]) => {
    if (this.listeners.length === 0 && this.listenersOnceQueue.length === 0) {
      console.warn("No listeners for event");
    }

    /** Update any general listeners */
    this.listeners.forEach((listener) => listener(args[0] as T));

    /** Clear the `once` queue */
    if (this.listenersOnceQueue.length > 0) {
      const toCall = this.listenersOnceQueue;
      this.listenersOnceQueue = [];
      toCall.forEach((listener) => listener(args[0] as T));
    }
  };

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  };
}
