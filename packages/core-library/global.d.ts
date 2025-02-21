type AsyncFunction<A = unknown, O = unknown> = (...args: A) => Promise<O>;
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown
  ? A
  : never;
type Nullable<T> = { [P in keyof T]: T[P] | null };

interface Window {
  grecaptcha?: {
    render: (...args: any[]) => void;
    getResponse: (...args: any[]) => string;
    reset: (...args: any[]) => void;
    ready: (callback: () => void) => void;
  };
}
