declare module "@deepseek-ai/cordis" {
  export interface Context {
    plugin: (plugin: any, config?: any) => void;
    inject: (deps: string[], callback: (ctx: Context) => void) => void;
    effect: (callback: () => void | (() => void), name?: string) => void;
    slots?: any;
    logger?: (name: string) => {
      info: (...args: any[]) => void;
      warn: (...args: any[]) => void;
      error: (...args: any[]) => void;
    };
    [key: string]: any;
  }
}
