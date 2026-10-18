/**
 * LLM Provider Select - DeepSeek Harness & OpenCode Plugin
 * Host Entrypoint
 */
import type { Context } from "@deepseek-ai/cordis";
export declare const name = "dsh-plugin-llm-provider-select";
export interface Config {
    defaultProvider?: string;
    defaultModel?: string;
    enableFuzzySearch?: boolean;
    showPricingBadges?: boolean;
    showTooltips?: boolean;
}
export declare function apply(ctx: Context, config?: Config): void;
//# sourceMappingURL=index.d.ts.map