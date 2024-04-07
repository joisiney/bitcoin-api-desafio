export class Left<R, L> {
  constructor(private readonly _error: L) {}

  get isError(): boolean {
    return true
  }

  get isSuccess(): boolean {
    return false
  }

  get value(): R {
    throw new Error(
      `Não é possível obter valor da esquerda. Erro: ${this._error}`,
    )
  }

  get error(): L {
    return this._error as L
  }

  launchError(): void {
    throw this.error
  }
}
