/**
 * LLM Provider Select - DeepSeek Harness & OpenCode Plugin
 * Host Entrypoint
 */

import type { Context } from "@deepseek-ai/cordis";

export const name = "llm-provider-select";

export interface Config {
  defaultProvider?: string;
  defaultModel?: string;
  enableFuzzySearch?: boolean;
  showPricingBadges?: boolean;
  showTooltips?: boolean;
}

export const Config = {
  // Schema configuration if loaded via Cordis Web Configurator
};

export function apply(ctx: Context, config: Config = {}) {
  ctx.logger?.("llm-provider-select")?.info?.("LLM Provider Select plugin initialized.");
}
