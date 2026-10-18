/**
 * Client plugin entrypoint: registers OpenCodeModelSelect into conversation.input.model
 * in DeepSeek Harness client environment.
 */
import type { Context } from "@deepseek-ai/cordis";
export { OpenCodeModelSelect } from "./OpenCodeModelSelect.js";
export * from "./types.js";
export declare const name = "dsh-plugin-llm-provider-select";
export declare const inject: string[];
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map