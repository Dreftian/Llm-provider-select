import React, {
  useEffect,
  useId,
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
import { matchesModelSearch } from "./search.js";
import { ProviderIcon } from "./ProviderIcons.js";
import { ModelTooltip } from "./ModelTooltip.js";
import styles from "./OpenCodeModelSelect.module.css";

interface FlattenedRow {
  model: ModelCatalogModel;
  provider: ModelProviderGroup;
  elementId: string;
}

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
  const [query, setQuery] = useState("");
  const [collapsedProviders, setCollapsedProviders] = useState<
    Record<string, boolean>
  >({});
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [hoveredItem, setHoveredItem] = useState<{
    model: ModelCatalogModel;
    provider: ModelProviderGroup;
    top: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const idPrefix = useId();

  // Find currently selected model & provider
  const currentSelection = useMemo(() => {
    if (!state.current) return null;
    for (const group of state.groups) {
      if (group.id === state.current.provider) {
        const model = group.models.find((m) => m.id === state.current?.model);
        if (model) {
          return { provider: group, model };
        }
      }
    }
    // Fallback if not found in groups
    if (state.groups.length > 0 && state.groups[0].models.length > 0) {
      return { provider: state.groups[0], model: state.groups[0].models[0] };
    }
    return null;
  }, [state.current, state.groups]);

  // Flatten filtered rows for keyboard navigation
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result: {
      provider: ModelProviderGroup;
      models: ModelCatalogModel[];
    }[] = [];

    for (const group of state.groups) {
      const matchingModels = group.models.filter((model) => {
        if (!q) return true;
        const nameMatch = matchesModelSearch(model.name, q);
        const providerMatch = matchesModelSearch(group.name, q);
        return nameMatch.matches || providerMatch.matches;
      });

      if (matchingModels.length > 0) {
        result.push({ provider: group, models: matchingModels });
      }
    }
    return result;
  }, [state.groups, query]);

  const flatRows = useMemo<FlattenedRow[]>(() => {
    const rows: FlattenedRow[] = [];
    for (const group of filteredGroups) {
      if (!query && collapsedProviders[group.provider.id]) {
        continue;
      }
      for (const model of group.models) {
        rows.push({
          model,
          provider: group.provider,
          elementId: `${idPrefix}-${group.provider.id}-${model.id}`,
        });
      }
    }
    return rows;
  }, [filteredGroups, collapsedProviders, query, idPrefix]);

  // Auto focus search input when opening popover
  useEffect(() => {
    if (open) {
      load();
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setHoveredItem(null);
    }
  }, [open, load]);

  // Click outside listener
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatRows.length > 0) {
        const next = (highlightedIndex + 1) % flatRows.length;
        setHighlightedIndex(next);
        scrollRowIntoView(next);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatRows.length > 0) {
        const prev = (highlightedIndex - 1 + flatRows.length) % flatRows.length;
        setHighlightedIndex(prev);
        scrollRowIntoView(prev);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatRows[highlightedIndex]) {
        const row = flatRows[highlightedIndex];
        handleSelectModel(row.provider.id, row.model.id);
      }
    }
  };

  const scrollRowIntoView = (index: number) => {
    const target = flatRows[index];
    if (target) {
      const el = document.getElementById(target.elementId);
      el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      if (el && popoverRef.current) {
        const elRect = el.getBoundingClientRect();
        const pRect = popoverRef.current.getBoundingClientRect();
        setHoveredItem({
          model: target.model,
          provider: target.provider,
          top: elRect.top - pRect.top,
        });
      }
    }
  };

  const handleSelectModel = async (providerId: string, modelId: string) => {
    const selection: ModelSelection = {
      provider: providerId,
      model: modelId,
    };
    await select(selection);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const toggleProviderCollapse = (providerId: string) => {
    setCollapsedProviders((prev) => ({
      ...prev,
      [providerId]: !prev[providerId],
    }));
  };

  const isCurrentFree =
    currentSelection?.model.name.toLowerCase().includes("free") ||
    (currentSelection?.model.cost && currentSelection.model.cost.input === 0);

  return (
    <div className={styles.root} onKeyDown={handleKeyDown}>
      {/* 1. OpenCode Composer Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={locked || !available}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.triggerIcon}>
          <ProviderIcon
            id={currentSelection?.provider.id ?? "opencode"}
            size={16}
          />
        </span>
        <span className={styles.triggerLabel}>
          {currentSelection?.model.name ?? "Elegir modelo..."}
        </span>
        {isCurrentFree && <span className={styles.triggerBadge}>FREE</span>}
        <svg
          className={`${styles.triggerChevron} ${
            open ? styles.triggerChevronOpen : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M18 15l-6-6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 2. OpenCode Desktop Popover Dialog */}
      {open && (
        <div
          ref={popoverRef}
          className={styles.popover}
          role="dialog"
          aria-label="Selector de Proveedores y Modelos"
        >
          {/* Search Header */}
          <div className={styles.searchHeader}>
            <div className={styles.searchWrapper}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Buscar modelo o proveedor..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  className={styles.searchClear}
                  onClick={() => {
                    setQuery("");
                    searchInputRef.current?.focus();
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Model Groups List */}
          <div ref={listRef} className={styles.listViewport}>
            {filteredGroups.length === 0 ? (
              <div className={styles.emptyState}>
                No se encontraron modelos para "<strong>{query}</strong>"
              </div>
            ) : (
              filteredGroups.map(({ provider, models }) => {
                const isCollapsed = !query && collapsedProviders[provider.id];
                return (
                  <div key={provider.id} className={styles.providerGroup}>
                    {/* Collapsible Section Header */}
                    <button
                      type="button"
                      className={styles.providerHeader}
                      onClick={() => toggleProviderCollapse(provider.id)}
                    >
                      <svg
                        className={`${styles.providerChevron} ${
                          isCollapsed ? styles.providerChevronCollapsed : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                      </svg>
                      <span className={styles.providerIcon}>
                        <ProviderIcon id={provider.id} size={16} />
                      </span>
                      <span className={styles.providerTitle}>
                        {provider.name}
                      </span>
                      <span className={styles.providerCount}>
                        {models.length}
                      </span>
                    </button>

                    {/* Model Rows */}
                    {!isCollapsed && (
                      <div className={styles.modelRows}>
                        {models.map((model) => {
                          const isActive =
                            currentSelection?.provider.id === provider.id &&
                            currentSelection?.model.id === model.id;
                          const elementId = `${idPrefix}-${provider.id}-${model.id}`;
                          const isHighlighted =
                            flatRows[highlightedIndex]?.elementId === elementId;
                          const isFree =
                            model.name.toLowerCase().includes("free") ||
                            (model.cost && model.cost.input === 0);

                          return (
                            <button
                              key={model.id}
                              id={elementId}
                              type="button"
                              className={`${styles.modelRow} ${
                                isActive ? styles.modelRowActive : ""
                              } ${
                                isHighlighted ? styles.modelRowHighlighted : ""
                              }`}
                              onClick={() =>
                                handleSelectModel(provider.id, model.id)
                              }
                              onMouseEnter={(e) => {
                                if (popoverRef.current) {
                                  const r =
                                    e.currentTarget.getBoundingClientRect();
                                  const pr =
                                    popoverRef.current.getBoundingClientRect();
                                  setHoveredItem({
                                    model,
                                    provider,
                                    top: r.top - pr.top,
                                  });
                                }
                              }}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <span className={styles.modelName}>
                                {model.name}
                              </span>
                              <div className={styles.badges}>
                                {isFree && (
                                  <span className={styles.badgeFree}>FREE</span>
                                )}
                                {model.latest && (
                                  <span className={styles.badgeLatest}>
                                    LATEST
                                  </span>
                                )}
                                {model.contextLength && (
                                  <span className={styles.badgeContext}>
                                    {(model.contextLength / 1000).toFixed(0)}K
                                  </span>
                                )}
                              </div>
                              {isActive && (
                                <svg
                                  className={styles.checkIcon}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <polyline
                                    points="20 6 9 17 4 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className={styles.footer}>
            <div className={styles.footerKeys}>
              <span>
                <strong className={styles.keyChip}>↑↓</strong> navegar
              </span>
              <span>
                <strong className={styles.keyChip}>↵</strong> elegir
              </span>
              <span>
                <strong className={styles.keyChip}>esc</strong> salir
              </span>
            </div>
            <a
              href="#manage"
              className={styles.manageLink}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              + Conectar proveedores
            </a>
          </div>

          {/* Hover Specs Card */}
          <ModelTooltip
            model={hoveredItem?.model ?? null}
            provider={hoveredItem?.provider ?? null}
            visible={!!hoveredItem}
            top={hoveredItem?.top ?? 0}
          />
        </div>
      )}
    </div>
  );
}
