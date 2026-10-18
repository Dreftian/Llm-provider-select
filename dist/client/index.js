/**
 * Client plugin entrypoint: registers OpenCodeModelSelect into conversation.input.model
 * in DeepSeek Harness client environment.
 */
import { OpenCodeModelSelect } from "./OpenCodeModelSelect.js";
export { OpenCodeModelSelect } from "./OpenCodeModelSelect.js";
export * from "./types.js";
export const name = "dsh-plugin-llm-provider-select";
export const inject = ["slots", "modelDirectories", "sessions"];
export function apply(ctx) {
    // Inject and override the conversation.input.model slot
    if (ctx.slots && typeof ctx.slots.inject === "function") {
        ctx.slots.inject("conversation.input.model", () => {
            ctx.slots.register({
                name: "conversation.input.model",
                children: {
                    "conversation.input.model.label": {
                        kind: "single",
                        scope: "session",
                        inline: true,
                    },
                },
                inject: (sessionId) => {
                    const directory = ctx.modelDirectories.directoryFor(sessionId);
                    const available = ctx.sessions.subagentAddress(sessionId) === undefined;
                    return {
                        available,
                        directory: directory.store,
                        load: () => {
                            if (available) {
                                directory.load().catch(() => { });
                            }
                        },
                        select: (selection) => available ? directory.select(selection) : Promise.resolve(undefined),
                    };
                },
            }, OpenCodeModelSelect);
        });
    }
}
//# sourceMappingURL=index.js.map