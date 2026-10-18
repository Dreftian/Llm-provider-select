import React from "react";
import type { ModelCatalogModel, ModelProviderGroup } from "./types.js";

export function ModelTooltip({
  model,
  provider,
  visible,
  top,
}: {
  model: ModelCatalogModel | null;
  provider: ModelProviderGroup | null;
  visible: boolean;
  top: number;
}) {
  if (!model || !visible) return null;

  const isFree =
    model.name.toLowerCase().includes("free") ||
    (model.cost && model.cost.input === 0);

  const contextStr = model.contextLength
    ? `${(model.contextLength / 1000).toFixed(0)}K`
    : "128K";

  return (
    <div
      style={{
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
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
      }}
    >
      <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>
        {model.name}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "#94a3b8",
          lineHeight: "1.4",
          marginBottom: "10px",
        }}
      >
        {model.description ||
          "Modelo de lenguaje optimizado para desarrollo y generación de código."}
      </div>
      <div
        style={{
          height: "1px",
          background: "rgba(255, 255, 255, 0.08)",
          marginBottom: "10px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: "#64748b" }}>Proveedor:</span>
        <span style={{ fontWeight: 600 }}>{provider?.name ?? "Directo"}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: "#64748b" }}>Contexto:</span>
        <span style={{ fontWeight: 600 }}>{contextStr} tokens</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: "#64748b" }}>Precios:</span>
        <span
          style={{
            fontWeight: 700,
            color: isFree ? "#34d399" : "#e2e8f0",
          }}
        >
          {isFree ? "100% Gratuito (0.00 $)" : "$0.14 / 1M"}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
        }}
      >
        <span style={{ color: "#64748b" }}>Capacidades:</span>
        <span style={{ color: "#38bdf8", fontWeight: 600 }}>
          {model.capabilities?.join(", ") || "Código, Herramientas"}
        </span>
      </div>
    </div>
  );
}
