/**
 * Type declarations for LLM Provider Select plugin.
 * Compatible with DeepSeek Harness client and OpenCode Desktop catalog schema.
 */
export interface ModelReasoningMetadata {
    effortLevels?: readonly string[];
    defaultEffort?: string;
}
export interface ModelCatalogModel {
    id: string;
    name: string;
    description?: string;
    reasoning?: ModelReasoningMetadata;
    contextLength?: number;
    maxOutput?: number;
    cost?: {
        input: number;
        output: number;
    };
    latest?: boolean;
    capabilities?: readonly string[];
}
export interface ModelProviderGroup {
    id: string;
    name: string;
    canonical?: string;
    models: readonly ModelCatalogModel[];
}
export interface ModelDirectoryState {
    current: {
        provider: string;
        model: string;
        reasoningEffort?: string;
    } | null;
    groups: readonly ModelProviderGroup[];
    failures: readonly {
        id: string;
        name: string;
        message: string;
    }[];
    pending: boolean;
}
export interface ModelSelection {
    provider: string;
    model: string;
    reasoningEffort?: string;
}
export interface ModelSelectInjected {
    available: boolean;
    directory: {
        getSnapshot: () => ModelDirectoryState;
        subscribe: (listener: () => void) => () => void;
    };
    load: () => void;
    select: (selection: ModelSelection) => Promise<{
        ok: boolean;
        error?: any;
    } | undefined>;
}
//# sourceMappingURL=types.d.ts.map