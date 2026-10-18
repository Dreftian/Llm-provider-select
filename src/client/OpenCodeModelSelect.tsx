import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  ModelCatalogModel,
  ModelDirectoryState,
  ModelProviderGroup,
  ModelSelectInjected,
  ModelSelection,
} from "./types.js";
import { ProviderIcon } from "./ProviderIcons.js";
import styles from "./OpenCodeModelSelect.module.css";

type ViewState = "root" | "providers" | "models" | "effort";

const STANDARD_EFFORT_OPTIONS = [
  { id: "off", label: "Desactivado" },
  { id: "low", label: "Bajo" },
  { id: "medium", label: "Medio" },
  { id: "high", label: "Alto" },
  { id: "max", label: "Máximo" },
];

export function OpenCodeModelSelect({
  locked,
  available,
  directory,
  load,
  select,
}: ModelSelectInjected & { locked?: boolean }) {
  const state: ModelDirectoryState = useSyncExternalStore(
    (fn) => directory.subscribe(fn),
    () => directory.getSnapshot()
  );

  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>("root");
  const [activeProviderId, setActiveProviderId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Determine current active selection
  const currentSelection = useMemo(() => {
    if (!state.current) return null;
    for (const group of state.groups) {
      if (group.id === state.current.provider) {
        const model = group.models.find((m) => m.id === state.current?.model);
        if (model) return { provider: group, model };
      }
    }
    if (state.groups.length > 0 && state.groups[0].models.length > 0) {
      return { provider: state.groups[0], model: state.groups[0].models[0] };
    }
    return null;
  }, [state.current, state.groups]);

  // Current effort label
  const currentEffortLabel = useMemo(() => {
    const effort = state.current?.reasoningEffort ?? "off";
    const found = STANDARD_EFFORT_OPTIONS.find((e) => e.id === effort);
    return found ? found.label : effort;
  }, [state.current?.reasoningEffort]);

  // Provider selected for the models sub-view
  const providerForModels = useMemo(() => {
    const id = activeProviderId || currentSelection?.provider.id;
    return state.groups.find((g) => g.id === id) ?? state.groups[0] ?? null;
  }, [activeProviderId, currentSelection, state.groups]);

  // Filtered models for current provider based on search
  const visibleModelsForProvider = useMemo(() => {
    if (!providerForModels) return [];
    const q = query.trim().toLowerCase();
    if (!q) return providerForModels.models;
    return providerForModels.models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        (m.description && m.description.toLowerCase().includes(q))
    );
  }, [providerForModels, query]);

  // Toggle open
  const handleToggleOpen = () => {
    if (!open) {
      load();
      setCurrentView("root");
      setQuery("");
    }
    setOpen((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Focus search when entering models view
  useEffect(() => {
    if (currentView === "models" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [currentView]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (currentView === "models") {
        setCurrentView("providers");
        setQuery("");
      } else if (currentView !== "root") {
        setCurrentView("root");
      } else {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
  };

  // Select Model
  const handleSelectModel = async (providerId: string, modelId: string) => {
    const selection: ModelSelection = {
      provider: providerId,
      model: modelId,
      reasoningEffort: state.current?.reasoningEffort,
    };
    await select(selection);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Select Reasoning Effort
  const handleSelectEffort = async (effortId: string) => {
    if (!currentSelection) return;
    const selection: ModelSelection = {
      provider: currentSelection.provider.id,
      model: currentSelection.model.id,
      reasoningEffort: effortId === "off" ? undefined : effortId,
    };
    await select(selection);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const isCurrentFree =
    currentSelection?.model.name.toLowerCase().includes("free") ||
    (currentSelection?.model.cost && currentSelection.model.cost.input === 0);

  return (
    <div className={styles.root} onKeyDown={handleKeyDown}>
      {/* 1. Compact Native Composer Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={locked || !available}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={handleToggleOpen}
      >
        <span className={styles.triggerIcon}>
          <ProviderIcon
            id={currentSelection?.provider.id ?? "opencode"}
            size={14}
          />
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerProvider}>
            {currentSelection?.provider.name ?? "Proveedor"}
          </span>
          <span className={styles.triggerSeparator}>›</span>
          <span className={styles.triggerModel}>
            {currentSelection?.model.name ?? "Modelo"}
          </span>
        </span>
        {isCurrentFree && <span className={styles.triggerBadge}>FREE</span>}
        <svg
          className={`${styles.triggerChevron} ${open ? styles.triggerChevronOpen : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 2. Compact Popover (Strict 236px width, 28px items) */}
      {open && (
        <div
          ref={popoverRef}
          role="menu"
          className={styles.popover}
          aria-label="Selector de Proveedor y Esfuerzo"
        >
          {/* VISTA 1: ROOT ("Proveedores" & "Esfuerzo") */}
          {currentView === "root" && (
            <div className={styles.menuStack}>
              {/* Row 1: Proveedores */}
              <button
                type="button"
                role="menuitem"
                className={styles.menuRow}
                onClick={() => setCurrentView("providers")}
              >
                <div className={styles.rowLeft}>
                  <span className={styles.rowIcon}>🏢</span>
                  <span className={styles.rowTitle}>Proveedores</span>
                </div>
                <div className={styles.rowRight}>
                  <span className={styles.rowValue}>
                    {currentSelection?.provider.name ?? "Elegir"}
                  </span>
                  <span className={styles.chevron}>›</span>
                </div>
              </button>

              <div className={styles.separator} />

              {/* Row 2: Esfuerzo */}
              <button
                type="button"
                role="menuitem"
                className={styles.menuRow}
                onClick={() => setCurrentView("effort")}
              >
                <div className={styles.rowLeft}>
                  <span className={styles.rowIcon}>⚡</span>
                  <span className={styles.rowTitle}>Esfuerzo</span>
                </div>
                <div className={styles.rowRight}>
                  <span className={styles.rowValue}>{currentEffortLabel}</span>
                  <span className={styles.chevron}>›</span>
                </div>
              </button>
            </div>
          )}

          {/* VISTA 2: LISTA DE PROVEEDORES */}
          {currentView === "providers" && (
            <div className={styles.menuStack}>
              <button
                type="button"
                className={styles.headerRow}
                onClick={() => setCurrentView("root")}
              >
                <span className={styles.backArrow}>←</span>
                <span className={styles.headerTitle}>Proveedores</span>
              </button>

              <div className={styles.scrollList}>
                {state.groups.map((group) => {
                  const isActive = currentSelection?.provider.id === group.id;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      role="menuitem"
                      className={`${styles.menuRow} ${isActive ? styles.rowActive : ""}`}
                      onClick={() => {
                        setActiveProviderId(group.id);
                        setCurrentView("models");
                        setQuery("");
                      }}
                    >
                      <div className={styles.rowLeft}>
                        <ProviderIcon id={group.id} size={14} />
                        <span className={styles.rowTitle}>{group.name}</span>
                      </div>
                      <div className={styles.rowRight}>
                        {isActive && <span className={styles.check}>✓</span>}
                        <span className={styles.chevron}>›</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VISTA 3: MODELOS DEL PROVEEDOR ELEGIDO */}
          {currentView === "models" && providerForModels && (
            <div className={styles.menuStack}>
              <button
                type="button"
                className={styles.headerRow}
                onClick={() => setCurrentView("providers")}
              >
                <span className={styles.backArrow}>←</span>
                <span className={styles.headerTitle}>
                  {providerForModels.name} · Modelos
                </span>
              </button>

              {/* Compact Search Bar if more than 3 models */}
              {providerForModels.models.length > 3 && (
                <div className={styles.searchRow}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar modelo..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      type="button"
                      className={styles.searchClear}
                      onClick={() => setQuery("")}
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              <div className={styles.scrollList}>
                {visibleModelsForProvider.length === 0 ? (
                  <div className={styles.emptyState}>No hay modelos</div>
                ) : (
                  visibleModelsForProvider.map((model) => {
                    const isCurrent =
                      currentSelection?.provider.id === providerForModels.id &&
                      currentSelection?.model.id === model.id;
                    const isFree =
                      model.name.toLowerCase().includes("free") ||
                      (model.cost && model.cost.input === 0);
                    return (
                      <button
                        key={model.id}
                        type="button"
                        role="menuitem"
                        className={`${styles.menuRow} ${isCurrent ? styles.rowActive : ""}`}
                        onClick={() =>
                          handleSelectModel(providerForModels.id, model.id)
                        }
                      >
                        <div className={styles.rowLeft}>
                          <span className={styles.modelName}>{model.name}</span>
                        </div>
                        <div className={styles.rowRight}>
                          {model.latest && (
                            <span className={styles.badgeLatest}>NEW</span>
                          )}
                          {isFree && (
                            <span className={styles.badgeFree}>FREE</span>
                          )}
                          {isCurrent && <span className={styles.check}>✓</span>}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* VISTA 4: ESFUERZO DE RAZONAMIENTO */}
          {currentView === "effort" && (
            <div className={styles.menuStack}>
              <button
                type="button"
                className={styles.headerRow}
                onClick={() => setCurrentView("root")}
              >
                <span className={styles.backArrow}>←</span>
                <span className={styles.headerTitle}>Esfuerzo</span>
              </button>

              <div className={styles.scrollList}>
                {STANDARD_EFFORT_OPTIONS.map((opt) => {
                  const currentEffort = state.current?.reasoningEffort ?? "off";
                  const isCurrent = currentEffort === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="menuitem"
                      className={`${styles.menuRow} ${isCurrent ? styles.rowActive : ""}`}
                      onClick={() => handleSelectEffort(opt.id)}
                    >
                      <div className={styles.rowLeft}>
                        <span className={styles.rowTitle}>{opt.label}</span>
                      </div>
                      <div className={styles.rowRight}>
                        {isCurrent && <span className={styles.check}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
