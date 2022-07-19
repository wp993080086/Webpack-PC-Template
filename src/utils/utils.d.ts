/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
export type TGlobalDefaultType = HTMLElement | Document | Window | Element

export interface IThrottleFunction<F extends TAnyFunc> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void
}

export interface IDebounceFunction<F extends TAnyFunc> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void
  cancel: () => void
}
