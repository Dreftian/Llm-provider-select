/**
 * LLM Provider Select - Compact OpenCode Desktop UI Engine for DeepSeek Harness
 * Client-Side Enhancement & Slot Interceptor
 *
 * Strict 236px width, 28px row height.
 * Root Menu: "Proveedores" and "Esfuerzo"
 * Drill-down: Proveedores -> Modelo (filtered by selected provider)
 */

(function () {
  function factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    // 1. Inject Compact OpenCode Desktop Design System Stylesheet
    var STYLE_ID = "opencode-compact-theme";
    var existingStyle = document.getElementById(STYLE_ID);
    if (existingStyle && existingStyle.parentNode) {
      existingStyle.parentNode.removeChild(existingStyle);
    }

    var styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    styleEl.textContent = `
      /* ==========================================================================
         Compact OpenCode Desktop Theme for DeepSeek Harness (236px)
         ========================================================================== */

      /* Composer Trigger Button */
      button[class*="trigger"],
      [data-slot="conversation.input.model"] button {
        border-radius: 6px !important;
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        padding: 0 8px !important;
        height: 28px !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif !important;
        font-weight: 500 !important;
        font-size: 12.5px !important;
        color: #f4f3ee !important;
        transition: all 0.12s ease !important;
        box-shadow: none !important;
      }

      button[class*="trigger"]:hover,
      [data-slot="conversation.input.model"] button:hover {
        background: rgba(255, 255, 255, 0.09) !important;
        border-color: rgba(255, 255, 255, 0.18) !important;
      }

      /* Popover Surface: Strictly 236px compact width */
      div[class*="MenuSurface"],
      div[class*="menu_"],
      div[role="menu"],
      div[role="group"][aria-label*="model" i] {
        width: 236px !important;
        min-width: 236px !important;
        max-width: 236px !important;
        background: rgba(22, 22, 26, 0.95) !important;
        border: 0.5px solid rgba(255, 255, 255, 0.12) !important;
        border-radius: 8px !important;
        box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04) !important;
        backdrop-filter: blur(20px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
        padding: 4px !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }

      /* Compact Menu Items: Strict 28px row height */
      div[role="menuitem"],
      button[role="menuitem"],
      button[role="menuitemradio"],
      button[class*="cell_"],
      button[class*="option_"],
      .oc-compact-row {
        height: 28px !important;
        min-height: 28px !important;
        line-height: 28px !important;
        padding: 0 8px !important;
        border-radius: 5px !important;
        font-size: 12.5px !important;
        font-weight: 400 !important;
        color: #f4f3ee !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        box-sizing: border-box !important;
        border: none !important;
        background: transparent !important;
        cursor: pointer !important;
        transition: background 0.1s ease !important;
        user-select: none !important;
        width: 100% !important;
      }

      div[role="menuitem"]:hover,
      button[role="menuitem"]:hover,
      button[role="menuitemradio"]:hover,
      button[class*="cell_"]:hover,
      button[class*="option_"]:hover,
      .oc-compact-row:hover {
        background: rgba(255, 255, 255, 0.08) !important;
      }

      /* Checkmark indicator for active items */
      [aria-checked="true"],
      .oc-compact-row.active {
        background: rgba(255, 255, 255, 0.05) !important;
      }

      /* Subtle Separator between items */
      .oc-compact-sep {
        height: 0.5px;
        margin: 3px 2px;
        background: rgba(255, 255, 255, 0.08);
      }

      /* Back Navigation Header */
      .oc-compact-header {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        width: 100% !important;
        height: 26px !important;
        padding: 0 6px !important;
        margin-bottom: 2px !important;
        border-radius: 4px !important;
        background: transparent !important;
        border: none !important;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.08) !important;
        color: #94a3b8 !important;
        font-size: 11.5px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        box-sizing: border-box !important;
        transition: all 0.1s ease !important;
      }

      .oc-compact-header:hover {
        background: rgba(255, 255, 255, 0.06) !important;
        color: #f4f3ee !important;
      }

      /* Brand SVGs */
      .oc-glyph {
        width: 14px;
        height: 14px;
        margin-right: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: -2px;
        flex-shrink: 0;
      }

      .oc-badge-free {
        font-size: 8.5px;
        font-weight: 700;
        padding: 1px 4px;
        border-radius: 3px;
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border: 0.5px solid rgba(16, 185, 129, 0.3);
      }

      .oc-badge-new {
        font-size: 8.5px;
        font-weight: 700;
        padding: 1px 4px;
        border-radius: 3px;
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        border: 0.5px solid rgba(56, 189, 248, 0.3);
      }

      .oc-chevron {
        color: #64748b;
        font-size: 13px;
        margin-left: auto;
      }

      .oc-check {
        color: #38bdf8;
        font-size: 11.5px;
        font-weight: 600;
        margin-left: auto;
      }

      .oc-subtext {
        font-size: 11.5px;
        color: #94a3b8;
        max-width: 110px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: auto;
        padding-right: 4px;
      }
    `;
    document.head.appendChild(styleEl);

    // 2. Brand Glyphs
    var GLYPHS = {
      opencode: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="4" fill="#09090b" stroke="#3b82f6" stroke-width="1.8"/><path d="M7 8l4 4-4 4" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><path d="M13 16h4" stroke="#60a5fa" stroke-width="2"/></svg>`,
      deepseek: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M4.5 13.5C3.2 11.2 3.6 8.3 5.4 6.5C7.2 4.7 10.1 4.3 12.4 5.6C14.7 6.9 16.1 9.4 16.5 12.1C16.9 14.8 19.1 17 21.8 17.2V18.5C18.2 18.5 15.2 15.8 14.8 12.2C14.5 9.8 13.3 7.7 11.4 6.6C9.5 5.5 7.2 5.8 5.7 7.3C4.2 8.8 3.9 11.1 4.9 13C5.9 14.9 7.9 16.1 10.1 16.1H12V18.1H10.1C7.1 18.1 4.4 16.3 3.3 13.5L4.5 13.5Z" fill="#1D72F2"/><circle cx="8" cy="9" r="1.5" fill="#1D72F2"/></svg>`,
      anthropic: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M13.8 3L8.2 21H11.2L16.8 3H13.8Z" fill="#D97757"/><path d="M4 17.5L9.6 3H12.6L7 17.5H4Z" fill="#D97757"/><path d="M12.8 17.5L18.4 3H21.4L15.8 17.5H12.8Z" fill="#D97757" opacity="0.8"/></svg>`,
      openai: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="1.8"><path d="M20.5 10.3a5.2 5.2 0 0 0-.4-3.8 5.3 5.3 0 0 0-4.6-2.7 5.2 5.2 0 0 0-3.6 1.4A5.2 5.2 0 0 0 7.8 4 5.3 5.3 0 0 0 3.6 7.4a5.2 5.2 0 0 0-1.3 3.6 5.3 5.3 0 0 0 2.2 4.4 5.2 5.2 0 0 0 .4 3.8 5.3 5.3 0 0 0 4.6 2.7 5.2 5.2 0 0 0 3.6-1.4 5.2 5.2 0 0 0 4.1 1.2 5.3 5.3 0 0 0 4.2-3.4 5.2 5.2 0 0 0 1.3-3.6 5.3 5.3 0 0 0-2.2-4.4z"/><path d="M12 9v6m-3-4.5l6 3m0-3l-6 3" stroke-width="1.5"/></svg>`,
      google: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#4285F4"/></svg>`,
      magpie: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3b82f6" stroke-width="2"/><path d="M8 12l3 3 5-5" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/></svg>`,
    };

    function getGlyphForName(name) {
      var n = (name || "").toLowerCase();
      if (n.includes("anthropic") || n.includes("claude") || n.includes("glm") || n.includes("zcode")) return GLYPHS.anthropic;
      if (n.includes("deepseek")) return GLYPHS.deepseek;
      if (n.includes("google") || n.includes("gemini")) return GLYPHS.google;
      if (n.includes("openai") || n.includes("codex") || n.includes("gpt")) return GLYPHS.openai;
      if (n.includes("magpie")) return GLYPHS.magpie;
      return GLYPHS.opencode;
    }

    function detectProviderFromName(name) {
      var n = (name || "").toLowerCase();
      if (n.includes("glm") || n.includes("zcode")) return "Magpie · Anthropic";
      if (n.includes("gemini")) return "Magpie";
      if (n.includes("codex") || n.includes("gpt")) return "Magpie · Responses";
      if (n.includes("deepseek")) return "DeepSeek";
      if (n.includes("claude")) return "Anthropic";
      return "Magpie";
    }

    // 3. State Management for Drilled Navigation
    var state = {
      drillStage: null, // null (root), 'providers', 'models'
      selectedProviderName: null,
      activeProviderName: "Magpie",
    };

    // 4. Main DOM Transformation Routine
    function enhanceMenu() {
      // A. Transform Composer Trigger Button
      var triggers = document.querySelectorAll('button[class*="trigger"], [data-slot="conversation.input.model"] button');
      triggers.forEach(function (btn) {
        var text = (btn.textContent || "").trim();
        if (text && !btn.getAttribute("data-oc-styled")) {
          btn.setAttribute("data-oc-styled", "true");
          // Prepend brand glyph if missing
          if (!btn.querySelector(".oc-glyph")) {
            var icon = document.createElement("span");
            icon.innerHTML = getGlyphForName(text);
            btn.insertBefore(icon.firstChild, btn.firstChild);
          }
        }
      });

      // B. Locate Menu Popover
      var menu = document.querySelector('div[class*="MenuSurface"], div[class*="menu_"], div[role="menu"], div[role="group"][aria-label*="model" i]');
      if (!menu) {
        // Reset drill stage when menu closes
        state.drillStage = null;
        state.selectedProviderName = null;
        return;
      }

      // Check if menu is in Root View (cells: "Modelo" & "Esfuerzo")
      var cells = menu.querySelectorAll('button[class*="cell_"], button[role="menuitem"]');
      var isRoot = false;
      var modelCell = null;
      var effortCell = null;

      cells.forEach(function (cell) {
        var txt = (cell.textContent || "").toLowerCase();
        if (txt.includes("modelo") || txt.includes("model")) {
          isRoot = true;
          modelCell = cell;
        } else if (txt.includes("esfuerzo") || txt.includes("effort")) {
          isRoot = true;
          effortCell = cell;
        }
      });

      // =========================================================================
      // VISTA 1: ROOT ("Proveedores" y "Esfuerzo")
      // =========================================================================
      if (isRoot && modelCell) {
        state.drillStage = null;

        // Clean any injected elements from previous drill
        var injected = menu.querySelectorAll(".oc-drill-wrapper");
        injected.forEach(function (el) { el.remove(); });

        // Ensure both cells are visible
        modelCell.style.display = "";
        if (effortCell) effortCell.style.display = "";

        // Transform Model Cell into "Proveedores"
        var labelEl = modelCell.querySelector('span[class*="cellLabel_"]') || modelCell.firstElementChild;
        var valueEl = modelCell.querySelector('span[class*="cellValue_"]') || modelCell.lastElementChild;

        if (labelEl && !modelCell.getAttribute("data-oc-root-styled")) {
          modelCell.setAttribute("data-oc-root-styled", "true");
          labelEl.textContent = "🏢 Proveedores";

          // Intercept click on "Proveedores" to start Drilled Provider List
          modelCell.addEventListener("click", function () {
            state.drillStage = "providers";
            // Next tick transform will render provider list
            setTimeout(enhanceMenu, 10);
          }, true);
        }

        // Show current provider name in value
        if (valueEl) {
          var currentModelName = (valueEl.textContent || "").trim();
          var detectedProvider = detectProviderFromName(currentModelName);
          state.activeProviderName = detectedProvider;
          valueEl.textContent = detectedProvider;
        }

        return;
      }

      // =========================================================================
      // VISTA 2 & 3: DRILLED SUB-VIEWS (Proveedores -> Modelo)
      // =========================================================================
      // Check if menu is currently in Drilled Model Selection mode
      var searchInput = menu.querySelector('input[type="text"]');
      var groupHeadings = menu.querySelectorAll('div[class*="groupHeading_"], div[class*="MenuGroup"], div[class*="category_"]');
      var modelOptions = menu.querySelectorAll('button[role="menuitemradio"], button[class*="option_"]');

      if (groupHeadings.length > 0 || modelOptions.length > 0) {
        // Collect all distinct provider groups
        var providerGroups = [];
        var currentHeadingName = "Magpie";

        // Find existing headings
        groupHeadings.forEach(function (h) {
          var hName = (h.textContent || "").trim();
          if (hName && providerGroups.indexOf(hName) === -1) {
            providerGroups.push(hName);
          }
        });

        if (providerGroups.length === 0) {
          providerGroups = ["Magpie · Responses", "Magpie · Anthropic", "Magpie", "OpenCode Desktop"];
        }

        // Determine if we are in Provider list stage or Model list stage
        if (!state.drillStage) {
          state.drillStage = "providers";
        }

        // --- STAGE A: LIST OF PROVEEDORES ---
        if (state.drillStage === "providers") {
          // Hide native search and native options
          if (searchInput && searchInput.parentElement) {
            searchInput.parentElement.style.display = "none";
          }
          groupHeadings.forEach(function (h) { h.style.display = "none"; });
          modelOptions.forEach(function (opt) { opt.style.display = "none"; });

          // Render custom Provider List if not already rendered
          var providerListWrap = menu.querySelector("#oc-provider-list-wrap");
          if (!providerListWrap) {
            // Remove any other custom wrap
            var existing = menu.querySelectorAll(".oc-drill-wrapper");
            existing.forEach(function (el) { el.remove(); });

            providerListWrap = document.createElement("div");
            providerListWrap.id = "oc-provider-list-wrap";
            providerListWrap.className = "oc-drill-wrapper";

            // Header Row: ← Volver / Proveedores
            var header = document.createElement("button");
            header.type = "button";
            header.className = "oc-compact-header";
            header.innerHTML = `<span>←</span><span>Proveedores</span>`;
            header.onclick = function (e) {
              e.stopPropagation();
              // Simulate Escape or back to root
              var escEvent = new KeyboardEvent("keydown", { key: "Escape", bubbles: true });
              menu.dispatchEvent(escEvent);
              state.drillStage = null;
              setTimeout(enhanceMenu, 10);
            };
            providerListWrap.appendChild(header);

            // Provider Rows
            providerGroups.forEach(function (pName) {
              var row = document.createElement("button");
              row.type = "button";
              row.className = "oc-compact-row";
              if (pName === state.activeProviderName) {
                row.classList.add("active");
              }

              var glyph = getGlyphForName(pName);
              var isActiveCheck = pName === state.activeProviderName ? `<span class="oc-check">✓</span>` : ``;

              row.innerHTML = `
                <div style="display:flex;align-items:center;min-width:0;overflow:hidden;">
                  ${glyph}
                  <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${pName}</span>
                </div>
                <div style="display:flex;align-items:center;gap:4px;">
                  ${isActiveCheck}
                  <span class="oc-chevron">›</span>
                </div>
              `;

              row.onclick = function (e) {
                e.stopPropagation();
                state.selectedProviderName = pName;
                state.drillStage = "models";
                setTimeout(enhanceMenu, 10);
              };

              providerListWrap.appendChild(row);
            });

            menu.insertBefore(providerListWrap, menu.firstChild);
          }
        }

        // --- STAGE B: MODELOS FOR SELECTED PROVIDER ---
        else if (state.drillStage === "models" && state.selectedProviderName) {
          // Remove provider list wrap if present
          var pWrap = menu.querySelector("#oc-provider-list-wrap");
          if (pWrap) pWrap.remove();

          // Header Row: ← Proveedores / [Nombre Proveedor] · Modelos
          var modelListHeader = menu.querySelector("#oc-model-header");
          if (!modelListHeader) {
            modelListHeader = document.createElement("button");
            modelListHeader.id = "oc-model-header";
            modelListHeader.className = "oc-compact-header oc-drill-wrapper";
            modelListHeader.innerHTML = `<span>← Proveedores</span><span style="margin-left:auto;opacity:0.8;">${state.selectedProviderName}</span>`;
            modelListHeader.onclick = function (e) {
              e.stopPropagation();
              state.drillStage = "providers";
              state.selectedProviderName = null;
              setTimeout(enhanceMenu, 10);
            };
            menu.insertBefore(modelListHeader, menu.firstChild);
          }

          // Show native search bar (cleanly, without bulky additions)
          if (searchInput && searchInput.parentElement) {
            searchInput.parentElement.style.display = "";
            searchInput.placeholder = "Buscar modelo...";
          }

          // Filter models: show ONLY models belonging to selectedProviderName
          var currentGroup = "";
          var items = menu.querySelectorAll('div[class*="groupHeading_"], div[class*="MenuGroup"], button[role="menuitemradio"], button[class*="option_"]');

          items.forEach(function (el) {
            var isHeading = el.getAttribute("role") !== "menuitemradio" && !el.classList.contains("option_");
            if (isHeading) {
              currentGroup = (el.textContent || "").trim();
              el.style.display = "none"; // Hide group headings for ultra-clean compact list
            } else {
              if (currentGroup === state.selectedProviderName) {
                el.style.display = "";
              } else {
                el.style.display = "none";
              }
            }
          });
        }
      }
    }

    // 5. Mutation Observer to keep menu enhanced without polling lag
    var observer = new MutationObserver(function () {
      enhanceMenu();
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Initial pass
    enhanceMenu();

    // Export plugin definition
    exports.name = "dsh-plugin-llm-provider-select";
    exports.apply = function () {
      enhanceMenu();
    };

    return module.exports;
  }

  // Register with DeepSeek Harness ModuleLoader if present
  if (typeof window !== "undefined") {
    if (window.__ModuleLoader__ && typeof window.__ModuleLoader__.load === "function") {
      window.__ModuleLoader__.load({
        id: "dsh-plugin-llm-provider-select",
        factory: factory,
      });
      window.__ModuleLoader__.load({
        id: "llm-provider-select",
        factory: factory,
      });
    } else {
      factory(function () { return {}; });
    }
  }
})();
