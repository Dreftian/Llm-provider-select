import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, } from "react";
import { ProviderIcon } from "./ProviderIcons.js";
import styles from "./OpenCodeModelSelect.module.css";
const STANDARD_EFFORT_OPTIONS = [
    { id: "off", label: "Predeterminado" },
    { id: "low", label: "Low" },
    { id: "medium", label: "Medium" },
    { id: "high", label: "High" },
];
export function OpenCodeModelSelect({ locked, available, directory, load, select, }) {
    const state = useSyncExternalStore((fn) => directory.subscribe(fn), () => directory.getSnapshot());
    const [open, setOpen] = useState(false);
    const [currentView, setCurrentView] = useState("root");
    const [activeProviderId, setActiveProviderId] = useState(null);
    const [query, setQuery] = useState("");
    const triggerRef = useRef(null);
    const popoverRef = useRef(null);
    const searchInputRef = useRef(null);
    // Determine current active selection
    const currentSelection = useMemo(() => {
        if (!state.current)
            return null;
        for (const group of state.groups) {
            if (group.id === state.current.provider) {
                const model = group.models.find((m) => m.id === state.current?.model);
                if (model)
                    return { provider: group, model };
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
        if (!providerForModels)
            return [];
        const q = query.trim().toLowerCase();
        if (!q)
            return providerForModels.models;
        return providerForModels.models.filter((m) => m.name.toLowerCase().includes(q) ||
            m.id.toLowerCase().includes(q) ||
            (m.description && m.description.toLowerCase().includes(q)));
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
        if (!open)
            return;
        function handleClickOutside(e) {
            if (popoverRef.current &&
                !popoverRef.current.contains(e.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target)) {
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
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            if (currentView === "models") {
                setCurrentView("providers");
                setQuery("");
            }
            else if (currentView !== "root") {
                setCurrentView("root");
            }
            else {
                setOpen(false);
                triggerRef.current?.focus();
            }
        }
    };
    // Select Model
    const handleSelectModel = async (providerId, modelId) => {
        const selection = {
            provider: providerId,
            model: modelId,
            reasoningEffort: state.current?.reasoningEffort,
        };
        await select(selection);
        setOpen(false);
        triggerRef.current?.focus();
    };
    // Select Reasoning Effort
    const handleSelectEffort = async (effortId) => {
        if (!currentSelection)
            return;
        const selection = {
            provider: currentSelection.provider.id,
            model: currentSelection.model.id,
            reasoningEffort: effortId === "off" ? undefined : effortId,
        };
        await select(selection);
        setOpen(false);
        triggerRef.current?.focus();
    };
    const isCurrentFree = currentSelection?.model.name.toLowerCase().includes("free") ||
        (currentSelection?.model.cost && currentSelection.model.cost.input === 0);
    return (_jsxs("div", { className: styles.root, onKeyDown: handleKeyDown, children: [_jsxs("button", { ref: triggerRef, type: "button", disabled: locked || !available, "aria-haspopup": "menu", "aria-expanded": open, className: `${styles.trigger} ${open ? styles.triggerOpen : ""}`, onClick: handleToggleOpen, children: [_jsx("span", { className: styles.triggerIcon, children: _jsx(ProviderIcon, { id: currentSelection?.provider.id ?? "opencode", size: 14 }) }), _jsxs("span", { className: styles.triggerText, children: [_jsx("span", { className: styles.triggerProvider, children: currentSelection?.provider.name ?? "Proveedor" }), _jsx("span", { className: styles.triggerSeparator, children: "\u203A" }), _jsx("span", { className: styles.triggerModel, children: currentSelection?.model.name ?? "Modelo" })] }), isCurrentFree && _jsx("span", { className: styles.triggerBadge, children: "FREE" }), _jsx("svg", { className: `${styles.triggerChevron} ${open ? styles.triggerChevronOpen : ""}`, viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }) })] }), open && (_jsxs("div", { ref: popoverRef, role: "menu", className: styles.popover, "aria-label": "Selector de Proveedor y Esfuerzo", children: [currentView === "root" && (_jsxs("div", { className: styles.menuStack, children: [_jsxs("button", { type: "button", role: "menuitem", className: styles.menuRow, onClick: () => setCurrentView("providers"), children: [_jsxs("div", { className: styles.rowLeft, children: [_jsx("span", { className: styles.rowIcon, children: "\uD83C\uDFE2" }), _jsx("span", { className: styles.rowTitle, children: "Proveedores" })] }), _jsxs("div", { className: styles.rowRight, children: [_jsx("span", { className: styles.rowValue, children: currentSelection?.provider.name ?? "Elegir" }), _jsx("span", { className: styles.chevron, children: "\u203A" })] })] }), _jsx("div", { className: styles.separator }), _jsxs("button", { type: "button", role: "menuitem", className: styles.menuRow, onClick: () => setCurrentView("effort"), children: [_jsxs("div", { className: styles.rowLeft, children: [_jsx("span", { className: styles.rowIcon, children: "\u26A1" }), _jsx("span", { className: styles.rowTitle, children: "Esfuerzo" })] }), _jsxs("div", { className: styles.rowRight, children: [_jsx("span", { className: styles.rowValue, children: currentEffortLabel }), _jsx("span", { className: styles.chevron, children: "\u203A" })] })] })] })), currentView === "providers" && (_jsxs("div", { className: styles.menuStack, children: [_jsxs("button", { type: "button", className: styles.headerRow, onClick: () => setCurrentView("root"), children: [_jsx("span", { className: styles.backArrow, children: "\u2190" }), _jsx("span", { className: styles.headerTitle, children: "Proveedores" })] }), _jsx("div", { className: styles.scrollList, children: state.groups.map((group) => {
                                    const isActive = currentSelection?.provider.id === group.id;
                                    return (_jsxs("button", { type: "button", role: "menuitem", className: `${styles.menuRow} ${isActive ? styles.rowActive : ""}`, onClick: () => {
                                            setActiveProviderId(group.id);
                                            setCurrentView("models");
                                            setQuery("");
                                        }, children: [_jsxs("div", { className: styles.rowLeft, children: [_jsx(ProviderIcon, { id: group.id, size: 14 }), _jsx("span", { className: styles.rowTitle, children: group.name })] }), _jsxs("div", { className: styles.rowRight, children: [isActive && _jsx("span", { className: styles.check, children: "\u2713" }), _jsx("span", { className: styles.chevron, children: "\u203A" })] })] }, group.id));
                                }) })] })), currentView === "models" && providerForModels && (_jsxs("div", { className: styles.menuStack, children: [_jsxs("button", { type: "button", className: styles.headerRow, onClick: () => setCurrentView("providers"), children: [_jsx("span", { className: styles.backArrow, children: "\u2190" }), _jsxs("span", { className: styles.headerTitle, children: [providerForModels.name, " \u00B7 Modelos"] })] }), providerForModels.models.length > 3 && (_jsxs("div", { className: styles.searchRow, children: [_jsx("input", { ref: searchInputRef, type: "text", className: styles.searchInput, placeholder: "Buscar modelo...", value: query, onChange: (e) => setQuery(e.target.value) }), query && (_jsx("button", { type: "button", className: styles.searchClear, onClick: () => setQuery(""), children: "\u00D7" }))] })), _jsx("div", { className: styles.scrollList, children: visibleModelsForProvider.length === 0 ? (_jsx("div", { className: styles.emptyState, children: "No hay modelos" })) : (visibleModelsForProvider.map((model) => {
                                    const isCurrent = currentSelection?.provider.id === providerForModels.id &&
                                        currentSelection?.model.id === model.id;
                                    const isFree = model.name.toLowerCase().includes("free") ||
                                        (model.cost && model.cost.input === 0);
                                    return (_jsxs("button", { type: "button", role: "menuitem", className: `${styles.menuRow} ${isCurrent ? styles.rowActive : ""}`, onClick: () => handleSelectModel(providerForModels.id, model.id), children: [_jsx("div", { className: styles.rowLeft, children: _jsx("span", { className: styles.modelName, children: model.name }) }), _jsxs("div", { className: styles.rowRight, children: [model.latest && (_jsx("span", { className: styles.badgeLatest, children: "NEW" })), isFree && (_jsx("span", { className: styles.badgeFree, children: "FREE" })), isCurrent && _jsx("span", { className: styles.check, children: "\u2713" })] })] }, model.id));
                                })) })] })), currentView === "effort" && (_jsxs("div", { className: styles.menuStack, children: [_jsxs("button", { type: "button", className: styles.headerRow, onClick: () => setCurrentView("root"), children: [_jsx("span", { className: styles.backArrow, children: "\u2190" }), _jsx("span", { className: styles.headerTitle, children: "Esfuerzo" })] }), _jsx("div", { className: styles.scrollList, children: STANDARD_EFFORT_OPTIONS.map((opt) => {
                                    const currentEffort = state.current?.reasoningEffort ?? "off";
                                    const isCurrent = currentEffort === opt.id;
                                    return (_jsxs("button", { type: "button", role: "menuitem", className: `${styles.menuRow} ${isCurrent ? styles.rowActive : ""}`, onClick: () => handleSelectEffort(opt.id), children: [_jsx("div", { className: styles.rowLeft, children: _jsx("span", { className: styles.rowTitle, children: opt.label }) }), _jsx("div", { className: styles.rowRight, children: isCurrent && _jsx("span", { className: styles.check, children: "\u2713" }) })] }, opt.id));
                                }) })] }))] }))] }));
}
//# sourceMappingURL=OpenCodeModelSelect.js.map