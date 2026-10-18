/**
 * LLM Provider Select - Compact OpenCode Desktop UI Engine for DeepSeek Harness
 * Client-Side Enhancement & Slot Interceptor
 *
 * Strict 236px width, 28px row height.
 * - Root Menu:
 *     Row 1: "Proveedores" -> Current provider name with chevron `>`
 *     Row 2: "Esfuerzo" -> Current effort level with chevron `>`
 * - Clicking "Esfuerzo": Native DSH handles it! ZERO injection of providers.
 * - Clicking "Proveedores": DSH opens pane === 'model'. First shows Proveedores list.
 *     Clicking a provider drills into that provider's models list.
 *     Clicking a model triggers native button selection and closes.
 *     Clean back button (← Proveedores / ← Volver) navigates back.
 */

(function () {
  function factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    // 1. Inject Compact OpenCode Desktop Theme (Strict 236px width, 28px item height)
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

      /* Active row check indicator */
      [aria-checked="true"],
      .oc-compact-row.active {
        background: rgba(255, 255, 255, 0.05) !important;
      }

      /* Navigation Header (Back button) */
      .oc-compact-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        height: 26px !important;
        padding: 0 6px !important;
        margin-bottom: 3px !important;
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
        margin-right: 4px;
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

    // 2. Brand SVGs
    var GLYPHS = {
      opencode: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="4" fill="#09090b" stroke="#3b82f6" stroke-width="1.8"/><path d="M7 8l4 4-4 4" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><path d="M13 16h4" stroke="#60a5fa" stroke-width="2"/></svg>`,
      deepseek: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M4.5 13.5C3.2 11.2 3.6 8.3 5.4 6.5C7.2 4.7 10.1 4.3 12.4 5.6C14.7 6.9 16.1 9.4 16.5 12.1C16.9 14.8 19.1 17 21.8 17.2V18.5C18.2 18.5 15.2 15.8 14.8 12.2C14.5 9.8 13.3 7.7 11.4 6.6C9.5 5.5 7.2 5.8 5.7 7.3C4.2 8.8 3.9 11.1 4.9 13C5.9 14.9 7.9 16.1 10.1 16.1H12V18.1H10.1C7.1 18.1 4.4 16.3 3.3 13.5L4.5 13.5Z" fill="#1D72F2"/><circle cx="8" cy="9" r="1.5" fill="#1D72F2"/></svg>`,
      anthropic: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M13.8 3L8.2 21H11.2L16.8 3H13.8Z" fill="#D97757"/><path d="M4 17.5L9.6 3H12.6L7 17.5H4Z" fill="#D97757"/><path d="M12.8 17.5L18.4 3H21.4L15.8 17.5H12.8Z" fill="#D97757" opacity="0.8"/></svg>`,
      openai: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="1.8"><path d="M20.5 10.3a5.2 5.2 0 0 0-.4-3.8 5.3 5.3 0 0 0-4.6-2.7 5.2 5.2 0 0 0-3.6 1.4A5.2 5.2 0 0 0 7.8 4 5.3 5.3 0 0 0 3.6 7.4a5.2 5.2 0 0 0-1.3 3.6 5.3 5.3 0 0 0 2.2 4.4 5.2 5.2 0 0 0 .4 3.8 5.3 5.3 0 0 0 4.6 2.7 5.2 5.2 0 0 0 3.6-1.4 5.2 5.2 0 0 0 4.1 1.2 5.3 5.3 0 0 0 4.2-3.4 5.2 5.2 0 0 0 1.3-3.6 5.3 5.3 0 0 0 2.2-4.4z"/><path d="M12 9v6m-3-4.5l6 3m0-3l-6 3" stroke-width="1.5"/></svg>`,
      google: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#4285F4"/></svg>`,
      magpie: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3b82f6" stroke-width="2"/><path d="M8 12l3 3 5-5" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/></svg>`,
    };

    function getGlyphForName(name) {
      var n = (name || "").toLowerCase();
      if (n.includes("anthropic") || n.includes("claude") || n.includes("glm") || n.includes("zcode")) return GLYPHS.anthropic;
      if (n.includes("deepseek")) return GLYPHS.deepseek;
      if (n.includes("google") || n.includes("gemini")) return GLYPHS.google;
      if (n.includes("openai") || n.includes("codex") || n.includes("gpt") || n.includes("responses")) return GLYPHS.openai;
      if (n.includes("opencode")) return GLYPHS.opencode;
      return GLYPHS.magpie;
    }

    function normalizeName(str) {
      return (str || "")
        .toLowerCase()
        .replace(/[·•\-_›/]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function matchProvider(nameA, nameB) {
      var a = normalizeName(nameA);
      var b = normalizeName(nameB);
      if (a === b) return true;
      var aTokens = a.split(" ");
      var bTokens = b.split(" ");
      if (aTokens.length === bTokens.length) {
        return aTokens.every(function (tok) { return bTokens.indexOf(tok) !== -1; });
      }
      return false;
    }

    function detectProviderFromName(name) {
      var n = (name || "").toLowerCase();
      if (n.includes("glm") || n.includes("zcode") || n.includes("anthropic")) return "Magpie · Anthropic";
      if (n.includes("codex") || n.includes("gpt") || n.includes("responses")) return "Magpie · Responses";
      if (n.includes("deepseek")) return "DeepSeek";
      if (n.includes("opencode")) return "OpenCode Desktop";
      return "Magpie";
    }

    // 3. Persistent state within session
    var state = {
      drillStage: null,       // null (root), 'providers', 'models'
      selectedProvider: null, // e.g. "Magpie · Anthropic"
      activeProvider: "Magpie",
    };

    // 4. Main Menu Enhancement Routine
    function enhanceMenu() {
      // A. Transform Composer Trigger Button
      var triggers = document.querySelectorAll('button[class*="trigger"], [data-slot="conversation.input.model"] button');
      triggers.forEach(function (btn) {
        var text = (btn.textContent || "").trim();
        if (text && !btn.getAttribute("data-oc-styled")) {
          btn.setAttribute("data-oc-styled", "true");
          if (!btn.querySelector(".oc-glyph")) {
            var icon = document.createElement("span");
            icon.innerHTML = getGlyphForName(text);
            btn.insertBefore(icon.firstChild, btn.firstChild);
          }
        }
      });

      // B. Locate Menu Popover
      var menu = document.querySelector('div[id$="-menu"], div[class*="MenuSurface"], div[class*="menu_"], div[role="menu"], div[role="group"][aria-label*="model" i]');
      if (!menu) {
        // Reset drill state when menu closes
        state.drillStage = null;
        state.selectedProvider = null;
        return;
      }

      // Check for Root Cells ("Modelo" / "Proveedores" & "Esfuerzo")
      var cells = menu.querySelectorAll('button[class*="cell_"], button[role="menuitem"]');
      var isRoot = false;
      var modelCell = null;
      var effortCell = null;

      cells.forEach(function (cell) {
        var tagged = cell.getAttribute("data-oc-cell");
        var txt = (cell.textContent || "").toLowerCase();
        if (tagged === "model" || txt.includes("modelo") || txt.includes("model") || txt.includes("proveedor")) {
          isRoot = true;
          modelCell = cell;
          cell.setAttribute("data-oc-cell", "model");
        } else if (tagged === "effort" || txt.includes("esfuerzo") || txt.includes("effort")) {
          isRoot = true;
          effortCell = cell;
          cell.setAttribute("data-oc-cell", "effort");
        }
      });

      // Check for Model Pane markers
      var groupsContainer = menu.querySelector('div[class*="groups_"], div[id$="-models"], div[class*="groups"]');
      var searchRow = menu.querySelector('div[class*="searchRow_"], div[class*="searchRow"]');
      var menuSections = menu.querySelectorAll('section[data-menu-group], section[role="group"]');
      var menuHeadings = menu.querySelectorAll('[data-menu-group-heading], div[class*="groupHeading_"]');

      var isModelPane = (menu.getAttribute("role") === "group") ||
                        !!groupsContainer ||
                        !!searchRow ||
                        (menuSections.length > 0) ||
                        (menuHeadings.length > 0);

      // =========================================================================
      // VISTA 1: ROOT ("Proveedores" y "Esfuerzo")
      // =========================================================================
      if (isRoot && modelCell) {
        state.drillStage = null;

        // Clean any injected drill wrappers from previous navigation
        var oldDrills = menu.querySelectorAll(".oc-drill-wrapper");
        oldDrills.forEach(function (el) { el.remove(); });

        // Ensure root cells are visible
        modelCell.style.display = "";
        if (effortCell) effortCell.style.display = "";

        // Transform Row 1: Label -> "Proveedores", Value -> Provider Name
        var labelEl = modelCell.querySelector('span[class*="cellLabel_"], span[class*="cellLabel"]') || modelCell.firstElementChild;
        var valueEl = modelCell.querySelector('span[class*="cellValue_"], span[class*="cellValue"]');
        if (!valueEl && modelCell.children.length >= 2 && modelCell.children[1].tagName === "SPAN") {
          valueEl = modelCell.children[1];
        }

        if (labelEl && labelEl.textContent !== "🏢 Proveedores") {
          labelEl.textContent = "🏢 Proveedores";
        }

        // Attach non-intrusive click listener to Row 1 so opening pane === 'model' starts at providers list
        if (!modelCell.getAttribute("data-oc-click-bound")) {
          modelCell.setAttribute("data-oc-click-bound", "true");
          modelCell.addEventListener("click", function () {
            state.drillStage = "providers";
            state.selectedProvider = null;
            setTimeout(enhanceMenu, 10);
          }, false);
        }

        // Update value display in Row 1 without touching the chevron SVG (modelCell.children[2])
        if (valueEl) {
          var currentModelText = (valueEl.textContent || "").trim();
          var detectedProvider = state.activeProvider;
          if (currentModelText && !currentModelText.includes("›")) {
            detectedProvider = detectProviderFromName(currentModelText);
          }
          state.activeProvider = detectedProvider;
          valueEl.textContent = detectedProvider;
        }

        // Row 2: "Esfuerzo" -> Native DSH displays effort level and chevron. Completely untouched!
        return;
      }

      // =========================================================================
      // VISTA 2: ESFUERZO (Native DSH pane === 'effort')
      // =========================================================================
      // The user explicitly commanded:
      // "'Esfuerzo' solo debe mostrar su esfuerzo nada más, donde debes modificar es en la parte de 'Modelos' y 'Provedor'".
      // ZERO injection of providers in pane === 'effort'.
      if (!isRoot && !isModelPane) {
        // Remove any leftover drill wrappers
        var drillWrappers = menu.querySelectorAll(".oc-drill-wrapper");
        drillWrappers.forEach(function (el) { el.remove(); });

        // Ensure native effort option buttons are visible and active
        var nativeEffortButtons = menu.querySelectorAll('button[role="menuitemradio"], button[class*="option_"]');
        nativeEffortButtons.forEach(function (btn) {
          btn.style.display = "";
        });

        return; // Full native DSH handling for Effort
      }

      // =========================================================================
      // VISTA 3: DRILLED MODEL PANE (pane === 'model')
      // =========================================================================
      if (isModelPane) {
        // Collect provider groups from native DOM
        var providerGroups = [];
        var activeModelProvider = null;

        // Check active model in groups to highlight active provider
        var activeOption = menu.querySelector('button[role="menuitemradio"][aria-checked="true"], button[class*="selected_"]');
        if (activeOption) {
          var sec = activeOption.closest('section[data-menu-group], section[role="group"]');
          if (sec) {
            var hEl = sec.querySelector('[data-menu-group-heading], div[class*="heading"]');
            if (hEl && hEl.textContent.trim()) {
              activeModelProvider = hEl.textContent.trim();
              state.activeProvider = activeModelProvider;
            }
          }
        }

        // Extract all provider section names
        if (menuSections.length > 0) {
          menuSections.forEach(function (s) {
            var h = s.querySelector('[data-menu-group-heading], div[class*="heading"]');
            var name = h ? h.textContent.trim() : "";
            if (name && providerGroups.indexOf(name) === -1) {
              providerGroups.push(name);
            }
          });
        } else if (menuHeadings.length > 0) {
          menuHeadings.forEach(function (h) {
            var name = (h.textContent || "").trim();
            if (name && providerGroups.indexOf(name) === -1) {
              providerGroups.push(name);
            }
          });
        }

        // Fallback default provider groups if DOM elements aren't parsed yet
        if (providerGroups.length === 0) {
          providerGroups = ["Magpie · Responses", "Magpie · Anthropic", "Magpie", "OpenCode Desktop"];
        }

        // Default to 'providers' sub-view when entering pane === 'model'
        if (!state.drillStage) {
          state.drillStage = "providers";
        }

        // -----------------------------------------------------------------------
        // SUB-VIEW 3A: LIST OF PROVEEDORES
        // -----------------------------------------------------------------------
        if (state.drillStage === "providers") {
          // Hide native search input and groups container
          if (searchRow) searchRow.style.display = "none";
          if (groupsContainer) groupsContainer.style.display = "none";
          menuSections.forEach(function (s) { s.style.display = "none"; });

          // Remove any existing model header
          var oldModelHeader = menu.querySelector("#oc-model-header");
          if (oldModelHeader) oldModelHeader.remove();

          // Render Proveedores List if not already rendered
          var providerListWrap = menu.querySelector("#oc-provider-list-wrap");
          if (!providerListWrap) {
            providerListWrap = document.createElement("div");
            providerListWrap.id = "oc-provider-list-wrap";
            providerListWrap.className = "oc-drill-wrapper";

            // Header: ← Volver (returns to Root menu via native Escape dispatch)
            var header = document.createElement("button");
            header.type = "button";
            header.className = "oc-compact-header";
            header.innerHTML = `
              <div style="display:flex;align-items:center;gap:6px;">
                <span>←</span><span>Volver</span>
              </div>
              <span style="font-size:11px;opacity:0.7;">Proveedores</span>
            `;
            header.onclick = function (e) {
              e.stopPropagation();
              // Native DSH handles Escape in pane === 'model' by calling back('model') to root
              menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
              state.drillStage = null;
              state.selectedProvider = null;
              setTimeout(enhanceMenu, 10);
            };
            providerListWrap.appendChild(header);

            // Provider Rows
            providerGroups.forEach(function (pName) {
              var row = document.createElement("button");
              row.type = "button";
              row.className = "oc-compact-row";
              var isSelected = matchProvider(pName, state.activeProvider);
              if (isSelected) row.classList.add("active");

              var glyph = getGlyphForName(pName);
              var checkHtml = isSelected ? `<span class="oc-check">✓</span>` : ``;

              row.innerHTML = `
                <div style="display:flex;align-items:center;min-width:0;gap:6px;">
                  ${glyph}
                  <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${pName}</span>
                </div>
                <div style="display:flex;align-items:center;gap:4px;">
                  ${checkHtml}
                  <span class="oc-chevron">›</span>
                </div>
              `;

              row.onclick = function (e) {
                e.stopPropagation();
                state.selectedProvider = pName;
                state.drillStage = "models";
                setTimeout(enhanceMenu, 10);
              };

              providerListWrap.appendChild(row);
            });

            menu.insertBefore(providerListWrap, menu.firstChild);
          }
        }

        // -----------------------------------------------------------------------
        // SUB-VIEW 3B: MODELOS OF SELECTED PROVIDER
        // -----------------------------------------------------------------------
        else if (state.drillStage === "models" && state.selectedProvider) {
          // Remove provider list wrap
          var pWrap = menu.querySelector("#oc-provider-list-wrap");
          if (pWrap) pWrap.remove();

          // Header: ← Proveedores / [Nombre Proveedor]
          var modelHeader = menu.querySelector("#oc-model-header");
          if (!modelHeader) {
            modelHeader = document.createElement("button");
            modelHeader.id = "oc-model-header";
            modelHeader.className = "oc-compact-header oc-drill-wrapper";
            modelHeader.innerHTML = `
              <div style="display:flex;align-items:center;gap:6px;">
                <span>←</span><span>Proveedores</span>
              </div>
              <span style="margin-left:auto;font-size:11px;opacity:0.85;font-weight:600;">${state.selectedProvider}</span>
            `;
            modelHeader.onclick = function (e) {
              e.stopPropagation();
              state.drillStage = "providers";
              state.selectedProvider = null;
              setTimeout(enhanceMenu, 10);
            };
            menu.insertBefore(modelHeader, menu.firstChild);
          }

          // Show native search bar for fast filtering
          if (searchRow) {
            searchRow.style.display = "";
            var searchInput = searchRow.querySelector("input");
            if (searchInput) searchInput.placeholder = "Buscar modelo...";
          }

          // Show groups container and filter ONLY the selected provider's models
          if (groupsContainer) groupsContainer.style.display = "";

          if (menuSections.length > 0) {
            menuSections.forEach(function (sec) {
              var h = sec.querySelector('[data-menu-group-heading], div[class*="heading"]');
              var pName = h ? h.textContent.trim() : "";
              var matches = matchProvider(pName, state.selectedProvider);
              if (matches) {
                sec.style.display = "";
                if (h) h.style.display = "none"; // Hide inner heading for clean compact list
                var modelBtns = sec.querySelectorAll('button[role="menuitemradio"], button[class*="option_"]');
                modelBtns.forEach(function (btn) {
                  btn.style.display = "";
                });
              } else {
                sec.style.display = "none";
              }
            });
          } else {
            // Flat headings fallback
            var currentGroup = "";
            Array.prototype.forEach.call(groupsContainer.children, function (el) {
              var isHeading = el.hasAttribute("data-menu-group-heading") || el.classList.contains("groupHeading_") || (el.tagName !== "BUTTON");
              if (isHeading) {
                currentGroup = (el.textContent || "").trim();
                el.style.display = "none";
              } else {
                if (matchProvider(currentGroup, state.selectedProvider)) {
                  el.style.display = "";
                } else {
                  el.style.display = "none";
                }
              }
            });
          }

          // Note: Clicking any model triggers DSH's native React onClick handler!
          // It selects the model and settles without any button breakage.
        }
      }
    }

    // 5. MutationObserver to enhance menus dynamically without polling lag
    var observer = new MutationObserver(function () {
      enhanceMenu();
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Initial pass
    enhanceMenu();

    // Export module for Cordis/DSH ModuleLoader
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
