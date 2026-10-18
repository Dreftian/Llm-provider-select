/**
 * LLM Provider Select - OpenCode Desktop UI Engine for DeepSeek Harness
 * Client-Side Enhancement & Slot Interceptor
 *
 * Distinct "Proveedores" (Providers) and "Modelos" (Models) selection experience.
 */

(function () {
  function factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    // 1. Inject OpenCode Desktop Design System Stylesheet
    var STYLE_ID = "opencode-provider-select-theme";
    if (!document.getElementById(STYLE_ID)) {
      var styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.textContent = `
        /* ==========================================================================
           OpenCode Desktop Theme Injection for DeepSeek Harness Model Selector
           ========================================================================== */

        /* Composer Model Trigger Button Redesign */
        button[class*="trigger"],
        [data-slot="conversation.input.model"] button {
          border-radius: 8px !important;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding: 0 10px 0 8px !important;
          height: 28px !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif !important;
          font-weight: 500 !important;
          font-size: 13px !important;
          color: #f8fafc !important;
          transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: none !important;
        }

        button[class*="trigger"]:hover,
        [data-slot="conversation.input.model"] button:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.18) !important;
        }

        /* Free Badge in Trigger */
        .oc-trigger-pill-free {
          display: inline-flex;
          align-items: center;
          padding: 1px 6px;
          margin-left: 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(16, 185, 129, 0.15) !important;
          color: #34d399 !important;
          border: 1px solid rgba(16, 185, 129, 0.25) !important;
        }

        .oc-trigger-provider-tag {
          color: #94a3b8 !important;
          font-weight: 400 !important;
          margin-right: 4px !important;
        }

        .oc-trigger-separator {
          color: #64748b !important;
          margin: 0 4px !important;
          font-size: 11px !important;
        }

        /* Floating Menu / Popover Container */
        div[class*="MenuSurface"],
        div[class*="menu_"],
        div[role="menu"] {
          background: #141418 !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 14px !important;
          box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          padding: 8px 10px !important;
          min-width: 380px !important;
          max-width: 440px !important;
          animation: ocPopoverIn 0.16s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @keyframes ocPopoverIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Search input inside menu */
        div[class*="MenuSurface"] input[type="text"],
        div[role="menu"] input[type="text"],
        input[placeholder*="Buscar modelos"] {
          background: #1e1e24 !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 8px !important;
          color: #f8fafc !important;
          font-size: 13px !important;
          padding: 8px 12px 8px 32px !important;
          margin-bottom: 6px !important;
          transition: all 0.15s ease !important;
        }

        div[class*="MenuSurface"] input[type="text"]:focus,
        input[placeholder*="Buscar modelos"]:focus {
          border-color: #3b82f6 !important;
          background: #24242b !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
          outline: none !important;
        }

        /* Injected Provider Filter Bar in Native Menu */
        .oc-native-provider-bar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 0 8px 0;
          overflow-x: auto;
          white-space: nowrap;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 6px;
        }

        .oc-native-provider-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .oc-native-provider-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .oc-native-provider-pill.active {
          background: #2563eb;
          border-color: #3b82f6;
          color: #ffffff;
          font-weight: 600;
        }

        /* Provider Group Section Headers */
        div[class*="MenuGroup"],
        div[class*="groupHeading"],
        div[class*="groupTitle"],
        div[class*="category"] {
          color: #60a5fa !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          padding: 10px 10px 4px 10px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          background: rgba(59, 130, 246, 0.06) !important;
          border-radius: 6px !important;
          margin: 6px 0 2px 0 !important;
        }

        /* Model Option Rows */
        div[role="menuitem"],
        button[class*="menuItem"],
        button[class*="option"] {
          border-radius: 8px !important;
          padding: 8px 10px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          color: #f8fafc !important;
          transition: all 0.12s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }

        div[role="menuitem"]:hover,
        button[class*="menuItem"]:hover,
        button[class*="option"]:hover,
        div[role="menuitem"][data-highlighted="true"] {
          background: rgba(255, 255, 255, 0.06) !important;
          color: #ffffff !important;
        }

        div[role="menuitem"][aria-checked="true"],
        button[class*="menuItem"][data-active="true"] {
          background: rgba(59, 130, 246, 0.12) !important;
          border-color: rgba(59, 130, 246, 0.25) !important;
          color: #ffffff !important;
        }

        /* Badges inside model rows */
        .oc-badge-pill {
          display: inline-flex;
          align-items: center;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .oc-badge-pill.free {
          background: rgba(16, 185, 129, 0.15) !important;
          color: #34d399 !important;
          border: 1px solid rgba(16, 185, 129, 0.25) !important;
        }

        .oc-badge-pill.context {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #94a3b8 !important;
        }

        /* SVG Provider Icon inline */
        .oc-provider-brand-glyph {
          width: 15px;
          height: 15px;
          margin-right: 6px;
          display: inline-block;
          vertical-align: -2px;
        }
      `;
      document.head.appendChild(styleEl);
    }

    // 2. Provider SVG Icons Registry
    var SVG_ICONS = {
      opencode: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="4" fill="#09090b" stroke="#3b82f6" stroke-width="1.8"/><path d="M7 8l4 4-4 4" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><path d="M13 16h4" stroke="#60a5fa" stroke-width="2"/></svg>`,
      deepseek: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none"><path d="M4.5 13.5C3.2 11.2 3.6 8.3 5.4 6.5C7.2 4.7 10.1 4.3 12.4 5.6C14.7 6.9 16.1 9.4 16.5 12.1C16.9 14.8 19.1 17 21.8 17.2V18.5C18.2 18.5 15.2 15.8 14.8 12.2C14.5 9.8 13.3 7.7 11.4 6.6C9.5 5.5 7.2 5.8 5.7 7.3C4.2 8.8 3.9 11.1 4.9 13C5.9 14.9 7.9 16.1 10.1 16.1H12V18.1H10.1C7.1 18.1 4.4 16.3 3.3 13.5L4.5 13.5Z" fill="#1D72F2"/><circle cx="8" cy="9" r="1.5" fill="#1D72F2"/></svg>`,
      anthropic: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none"><path d="M13.8 3L8.2 21H11.2L16.8 3H13.8Z" fill="#D97757"/><path d="M4 17.5L9.6 3H12.6L7 17.5H4Z" fill="#D97757"/><path d="M12.8 17.5L18.4 3H21.4L15.8 17.5H12.8Z" fill="#D97757" opacity="0.8"/></svg>`,
      openai: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="1.8"><path d="M20.5 10.3a5.2 5.2 0 0 0-.4-3.8 5.3 5.3 0 0 0-4.6-2.7 5.2 5.2 0 0 0-3.6 1.4A5.2 5.2 0 0 0 7.8 4 5.3 5.3 0 0 0 3.6 7.4a5.2 5.2 0 0 0-1.3 3.6 5.3 5.3 0 0 0 2.2 4.4 5.2 5.2 0 0 0 .4 3.8 5.3 5.3 0 0 0 4.6 2.7 5.2 5.2 0 0 0 3.6-1.4 5.2 5.2 0 0 0 4.1 1.2 5.3 5.3 0 0 0 4.2-3.4 5.2 5.2 0 0 0 1.3-3.6 5.3 5.3 0 0 0-2.2-4.4z"/><path d="M12 9v6m-3-4.5l6 3m0-3l-6 3" stroke-width="1.5"/></svg>`,
      google: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#4285F4"/></svg>`,
      magpie: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3b82f6" stroke-width="2"/><path d="M8 12l3 3 5-5" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/></svg>`,
      workbuddy: `<svg class="oc-provider-brand-glyph" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" fill="#6366f1" opacity="0.2" stroke="#6366f1" stroke-width="1.8"/><circle cx="9" cy="11" r="1.5" fill="#818cf8"/><circle cx="15" cy="11" r="1.5" fill="#818cf8"/><path d="M8 15c1.5 1.5 4.5 1.5 6 0" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    };

    function detectProviderFromName(name) {
      var n = (name || "").toLowerCase();
      if (n.includes("opencode") || n.includes("glm") || n.includes("zcode")) return { id: "opencode", name: "OpenCode Desktop" };
      if (n.includes("deepseek")) return { id: "deepseek", name: "DeepSeek" };
      if (n.includes("anthropic") || n.includes("claude")) return { id: "anthropic", name: "Anthropic" };
      if (n.includes("openai") || n.includes("codex") || n.includes("gpt")) return { id: "openai", name: "OpenAI / Magpie" };
      if (n.includes("gemini") || n.includes("google")) return { id: "google", name: "Google Gemini" };
      if (n.includes("magpie")) return { id: "magpie", name: "Magpie · Responses" };
      if (n.includes("workbuddy")) return { id: "workbuddy", name: "WorkBuddy AI" };
      return { id: "opencode", name: "OpenCode" };
    }

    function getProviderIconForName(name) {
      var p = detectProviderFromName(name);
      return SVG_ICONS[p.id] || SVG_ICONS.opencode;
    }

    // 3. Periodic DOM Transformation & Enhancement
    var activeFilterProvider = null;

    function transformModelSelector() {
      // A. Enhance Composer Trigger Button
      var triggers = document.querySelectorAll('button[class*="trigger"], [data-slot="conversation.input.model"] button');
      for (var i = 0; i < triggers.length; i++) {
        var btn = triggers[i];
        if (btn.getAttribute("data-oc-styled")) continue;
        btn.setAttribute("data-oc-styled", "true");

        var text = btn.textContent || "";
        var isFree = text.toLowerCase().includes("free");
        var provider = detectProviderFromName(text);

        // Prepend brand icon if not already added
        if (!btn.querySelector(".oc-provider-brand-glyph")) {
          var iconSpan = document.createElement("span");
          iconSpan.innerHTML = getProviderIconForName(text);
          btn.insertBefore(iconSpan.firstChild, btn.firstChild);
        }

        // Add Free badge pill if free
        if (isFree && !btn.querySelector(".oc-trigger-pill-free")) {
          var badgeSpan = document.createElement("span");
          badgeSpan.className = "oc-trigger-pill-free";
          badgeSpan.textContent = "FREE";
          btn.appendChild(badgeSpan);
        }
      }

      // B. Enhance Menu and Differentiate Proveedores vs Modelos
      var searchInput = document.querySelector('input[placeholder*="Buscar modelos"], div[role="menu"] input[type="text"]');
      if (searchInput && searchInput.parentElement && !document.getElementById("oc-provider-filter-bar")) {
        // Find existing provider headers in the menu
        var menu = searchInput.closest('div[role="menu"]') || searchInput.closest('div[class*="MenuSurface"]') || searchInput.parentElement.parentElement;
        if (menu) {
          var bar = document.createElement("div");
          bar.id = "oc-provider-filter-bar";
          bar.className = "oc-native-provider-bar";

          var allBtn = document.createElement("button");
          allBtn.className = "oc-native-provider-pill active";
          allBtn.textContent = "🏢 Todos";
          allBtn.onclick = function (e) {
            e.stopPropagation();
            activeFilterProvider = null;
            updateFilter(menu, null);
            updatePillStyles(bar, allBtn);
          };
          bar.appendChild(allBtn);

          // Find distinct provider headings
          var headings = menu.querySelectorAll('div[class*="MenuGroup"], div[class*="groupHeading"], div[class*="groupTitle"]');
          var providersFound = {};
          headings.forEach(function (h) {
            var hText = (h.textContent || "").trim();
            if (hText && !providersFound[hText]) {
              providersFound[hText] = true;
              var pBtn = document.createElement("button");
              pBtn.className = "oc-native-provider-pill";
              pBtn.innerHTML = getProviderIconForName(hText) + " " + hText;
              pBtn.onclick = function (e) {
                e.stopPropagation();
                activeFilterProvider = hText;
                updateFilter(menu, hText);
                updatePillStyles(bar, pBtn);
              };
              bar.appendChild(pBtn);
            }
          });

          // Insert bar below search input
          if (searchInput.parentElement.nextSibling) {
            searchInput.parentElement.parentNode.insertBefore(bar, searchInput.parentElement.nextSibling);
          } else {
            searchInput.parentElement.appendChild(bar);
          }
        }
      }

      // C. Enhance the menu items when open
      var menuItems = document.querySelectorAll('div[role="menuitem"], button[class*="menuItem"], button[class*="option"]');
      for (var j = 0; j < menuItems.length; j++) {
        var item = menuItems[j];
        if (item.getAttribute("data-oc-styled")) continue;
        item.setAttribute("data-oc-styled", "true");

        var itemText = item.textContent || "";
        if (itemText.toLowerCase().includes("free") && !item.querySelector(".oc-badge-pill")) {
          var pill = document.createElement("span");
          pill.className = "oc-badge-pill free";
          pill.textContent = "FREE";
          item.appendChild(pill);
        }
      }
    }

    function updatePillStyles(container, activeBtn) {
      container.querySelectorAll(".oc-native-provider-pill").forEach(function (b) {
        b.classList.remove("active");
      });
      activeBtn.classList.add("active");
    }

    function updateFilter(menu, targetProvider) {
      var currentProvider = null;
      var items = menu.querySelectorAll('div[class*="MenuGroup"], div[class*="groupHeading"], div[class*="groupTitle"], div[role="menuitem"], button[class*="menuItem"]');
      items.forEach(function (el) {
        var isHeader = el.getAttribute("role") !== "menuitem" && !el.classList.contains("menuItem");
        if (isHeader) {
          currentProvider = (el.textContent || "").trim();
          if (targetProvider && currentProvider !== targetProvider) {
            el.style.display = "none";
          } else {
            el.style.display = "";
          }
        } else {
          if (targetProvider && currentProvider && currentProvider !== targetProvider) {
            el.style.display = "none";
          } else {
            el.style.display = "";
          }
        }
      });
    }

    // Run observer
    var observer = new MutationObserver(function () {
      transformModelSelector();
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Initial pass
    transformModelSelector();

    // Export module
    exports.name = "dsh-plugin-llm-provider-select";
    exports.apply = function () {
      transformModelSelector();
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
