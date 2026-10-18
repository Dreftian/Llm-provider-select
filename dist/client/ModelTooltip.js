import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ModelTooltip({ model, provider, visible, top, }) {
    if (!model || !visible)
        return null;
    const isFree = model.name.toLowerCase().includes("free") ||
        (model.cost && model.cost.input === 0);
    const contextStr = model.contextLength
        ? `${(model.contextLength / 1000).toFixed(0)}K`
        : "128K";
    return (_jsxs("div", { style: {
            position: "absolute",
            top: `${Math.max(10, Math.min(top - 20, 240))}px`,
            right: "calc(100% + 14px)",
            width: "270px",
            background: "#1c1c22",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            padding: "14px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.7)",
            zIndex: 1010,
            pointerEvents: "none",
            color: "#f8fafc",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
        }, children: [_jsx("div", { style: { fontSize: "13px", fontWeight: 700, marginBottom: "4px" }, children: model.name }), _jsx("div", { style: {
                    fontSize: "11px",
                    color: "#94a3b8",
                    lineHeight: "1.4",
                    marginBottom: "10px",
                }, children: model.description ||
                    "Modelo de lenguaje optimizado para desarrollo y generación de código." }), _jsx("div", { style: {
                    height: "1px",
                    background: "rgba(255, 255, 255, 0.08)",
                    marginBottom: "10px",
                } }), _jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginBottom: "6px",
                }, children: [_jsx("span", { style: { color: "#64748b" }, children: "Proveedor:" }), _jsx("span", { style: { fontWeight: 600 }, children: provider?.name ?? "Directo" })] }), _jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginBottom: "6px",
                }, children: [_jsx("span", { style: { color: "#64748b" }, children: "Contexto:" }), _jsxs("span", { style: { fontWeight: 600 }, children: [contextStr, " tokens"] })] }), _jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginBottom: "6px",
                }, children: [_jsx("span", { style: { color: "#64748b" }, children: "Precios:" }), _jsx("span", { style: {
                            fontWeight: 700,
                            color: isFree ? "#34d399" : "#e2e8f0",
                        }, children: isFree ? "100% Gratuito (0.00 $)" : "$0.14 / 1M" })] }), _jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                }, children: [_jsx("span", { style: { color: "#64748b" }, children: "Capacidades:" }), _jsx("span", { style: { color: "#38bdf8", fontWeight: 600 }, children: model.capabilities?.join(", ") || "Código, Herramientas" })] })] }));
}
//# sourceMappingURL=ModelTooltip.js.map