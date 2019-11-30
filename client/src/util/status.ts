interface SuccessState<T> {
  type: 'success';
  value: T;
}

interface ErrorState {
  type: 'error';
  error: Error;
}

interface PendingState {
  type: 'pending';
}

interface RestingState {
  type: 'resting';
}

type State<T> = SuccessState<T> | ErrorState | PendingState | RestingState;

/**
 * Immutable descriptor of progress of an operation.
 * Can be in the following states: pending, error, success, resting.
 */
export class Status<T = void> {
  state: State<T>;

  constructor(state: State<T>) {
    this.state = state;
  }

  switch<U>(switchFunctions: SwitchFunctions<T, U>): U {
    if (this.state.type === 'pending') {
      return switchFunctions.pending();
    }
    else if (this.state.type === 'error') {
      return switchFunctions.error(this.state.error);
    }
    else if (this.state.type === 'success') {
      return switchFunctions.success(this.state.value);
    }
    else if (this.state.type === 'resting') {
      return switchFunctions.resting();
    }
    else {
      throw new Error(`Unexpected state: ${this.state}`);
    }
  }

  static followPromise<T>(promise: Promise<T>, update: (s: Status<T>) => void) {
    update(Status.pending<T>());
    promise.then(
      value => update(Status.success(value)),
      err => update(Status.error<T>(err)),
    );
  }

  static pending<T>() {
    return new Status<T>({ type: 'pending' });
  }

  static success<T>(value: T) {
    return new Status<T>({ type: 'success', value });
  }

  static error<T>(error: Error) {
    return new Status<T>({ type: 'error', error });
  }

  static resting<T>() {
    return new Status<T>({ type: 'resting' });
  }

  isSuccess() {
    return this.state.type === 'success';
  }

  isPending() {
    return this.state.type === 'pending';
  }

  isError() {
    return this.state.type === 'error';
  }

  isResting() {
    return this.state.type === 'resting';
  }

  getValue() {
    if (this.state.type === 'success') {
      return this.state.value;
    }
    else {
      throw new Error('Status is not success');
    }
  }
}

interface SwitchFunctions<T, U> {
  pending: () => U;
  error: (error: Error) => U;
  success: (value: T) => U;
  resting: () => U;
}
