import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, } from "react";
import { matchesModelSearch } from "./search.js";
import { ProviderIcon } from "./ProviderIcons.js";
import { ModelTooltip } from "./ModelTooltip.js";
import styles from "./OpenCodeModelSelect.module.css";
export function OpenCodeModelSelect({ locked, available, directory, load, select, }) {
    const state = useSyncExternalStore((fn) => directory.subscribe(fn), () => directory.getSnapshot());
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [collapsedProviders, setCollapsedProviders] = useState({});
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const triggerRef = useRef(null);
    const popoverRef = useRef(null);
    const searchInputRef = useRef(null);
    const listRef = useRef(null);
    const idPrefix = useId();
    // Find currently selected model & provider
    const currentSelection = useMemo(() => {
        if (!state.current)
            return null;
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
        const result = [];
        for (const group of state.groups) {
            const matchingModels = group.models.filter((model) => {
                if (!q)
                    return true;
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
    const flatRows = useMemo(() => {
        const rows = [];
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
        }
        else {
            setHoveredItem(null);
        }
    }, [open, load]);
    // Click outside listener
    useEffect(() => {
        if (!open)
            return;
        function handleClickOutside(event) {
            if (popoverRef.current &&
                !popoverRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);
    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!open)
            return;
        if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (flatRows.length > 0) {
                const next = (highlightedIndex + 1) % flatRows.length;
                setHighlightedIndex(next);
                scrollRowIntoView(next);
            }
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (flatRows.length > 0) {
                const prev = (highlightedIndex - 1 + flatRows.length) % flatRows.length;
                setHighlightedIndex(prev);
                scrollRowIntoView(prev);
            }
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (flatRows[highlightedIndex]) {
                const row = flatRows[highlightedIndex];
                handleSelectModel(row.provider.id, row.model.id);
            }
        }
    };
    const scrollRowIntoView = (index) => {
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
    const handleSelectModel = async (providerId, modelId) => {
        const selection = {
            provider: providerId,
            model: modelId,
        };
        await select(selection);
        setOpen(false);
        triggerRef.current?.focus();
    };
    const toggleProviderCollapse = (providerId) => {
        setCollapsedProviders((prev) => ({
            ...prev,
            [providerId]: !prev[providerId],
        }));
    };
    const isCurrentFree = currentSelection?.model.name.toLowerCase().includes("free") ||
        (currentSelection?.model.cost && currentSelection.model.cost.input === 0);
    return (_jsxs("div", { className: styles.root, onKeyDown: handleKeyDown, children: [_jsxs("button", { ref: triggerRef, type: "button", disabled: locked || !available, "aria-haspopup": "dialog", "aria-expanded": open, className: `${styles.trigger} ${open ? styles.triggerOpen : ""}`, onClick: () => setOpen((prev) => !prev), children: [_jsx("span", { className: styles.triggerIcon, children: _jsx(ProviderIcon, { id: currentSelection?.provider.id ?? "opencode", size: 16 }) }), _jsx("span", { className: styles.triggerLabel, children: currentSelection?.model.name ?? "Elegir modelo..." }), isCurrentFree && _jsx("span", { className: styles.triggerBadge, children: "FREE" }), _jsx("svg", { className: `${styles.triggerChevron} ${open ? styles.triggerChevronOpen : ""}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M18 15l-6-6-6 6", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), open && (_jsxs("div", { ref: popoverRef, className: styles.popover, role: "dialog", "aria-label": "Selector de Proveedores y Modelos", children: [_jsx("div", { className: styles.searchHeader, children: _jsxs("div", { className: styles.searchWrapper, children: [_jsxs("svg", { className: styles.searchIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }), _jsx("input", { ref: searchInputRef, type: "text", className: styles.searchInput, placeholder: "Buscar modelo o proveedor...", value: query, onChange: (e) => {
                                        setQuery(e.target.value);
                                        setHighlightedIndex(0);
                                    }, spellCheck: false }), query && (_jsx("button", { type: "button", className: styles.searchClear, onClick: () => {
                                        setQuery("");
                                        searchInputRef.current?.focus();
                                    }, children: "\u2715" }))] }) }), _jsx("div", { ref: listRef, className: styles.listViewport, children: filteredGroups.length === 0 ? (_jsxs("div", { className: styles.emptyState, children: ["No se encontraron modelos para \"", _jsx("strong", { children: query }), "\""] })) : (filteredGroups.map(({ provider, models }) => {
                            const isCollapsed = !query && collapsedProviders[provider.id];
                            return (_jsxs("div", { className: styles.providerGroup, children: [_jsxs("button", { type: "button", className: styles.providerHeader, onClick: () => toggleProviderCollapse(provider.id), children: [_jsx("svg", { className: `${styles.providerChevron} ${isCollapsed ? styles.providerChevronCollapsed : ""}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round" }) }), _jsx("span", { className: styles.providerIcon, children: _jsx(ProviderIcon, { id: provider.id, size: 16 }) }), _jsx("span", { className: styles.providerTitle, children: provider.name }), _jsx("span", { className: styles.providerCount, children: models.length })] }), !isCollapsed && (_jsx("div", { className: styles.modelRows, children: models.map((model) => {
                                            const isActive = currentSelection?.provider.id === provider.id &&
                                                currentSelection?.model.id === model.id;
                                            const elementId = `${idPrefix}-${provider.id}-${model.id}`;
                                            const isHighlighted = flatRows[highlightedIndex]?.elementId === elementId;
                                            const isFree = model.name.toLowerCase().includes("free") ||
                                                (model.cost && model.cost.input === 0);
                                            return (_jsxs("button", { id: elementId, type: "button", className: `${styles.modelRow} ${isActive ? styles.modelRowActive : ""} ${isHighlighted ? styles.modelRowHighlighted : ""}`, onClick: () => handleSelectModel(provider.id, model.id), onMouseEnter: (e) => {
                                                    if (popoverRef.current) {
                                                        const r = e.currentTarget.getBoundingClientRect();
                                                        const pr = popoverRef.current.getBoundingClientRect();
                                                        setHoveredItem({
                                                            model,
                                                            provider,
                                                            top: r.top - pr.top,
                                                        });
                                                    }
                                                }, onMouseLeave: () => setHoveredItem(null), children: [_jsx("span", { className: styles.modelName, children: model.name }), _jsxs("div", { className: styles.badges, children: [isFree && (_jsx("span", { className: styles.badgeFree, children: "FREE" })), model.latest && (_jsx("span", { className: styles.badgeLatest, children: "LATEST" })), model.contextLength && (_jsxs("span", { className: styles.badgeContext, children: [(model.contextLength / 1000).toFixed(0), "K"] }))] }), isActive && (_jsx("svg", { className: styles.checkIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: _jsx("polyline", { points: "20 6 9 17 4 12", strokeLinecap: "round", strokeLinejoin: "round" }) }))] }, model.id));
                                        }) }))] }, provider.id));
                        })) }), _jsxs("div", { className: styles.footer, children: [_jsxs("div", { className: styles.footerKeys, children: [_jsxs("span", { children: [_jsx("strong", { className: styles.keyChip, children: "\u2191\u2193" }), " navegar"] }), _jsxs("span", { children: [_jsx("strong", { className: styles.keyChip, children: "\u21B5" }), " elegir"] }), _jsxs("span", { children: [_jsx("strong", { className: styles.keyChip, children: "esc" }), " salir"] })] }), _jsx("a", { href: "#manage", className: styles.manageLink, onClick: (e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                }, children: "+ Conectar proveedores" })] }), _jsx(ModelTooltip, { model: hoveredItem?.model ?? null, provider: hoveredItem?.provider ?? null, visible: !!hoveredItem, top: hoveredItem?.top ?? 0 })] }))] }));
}
//# sourceMappingURL=OpenCodeModelSelect.js.map