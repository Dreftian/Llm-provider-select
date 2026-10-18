// ==========================================================================
// Compact OpenCode Desktop Model & Provider Selector Simulator Engine
// 236px Width, 28px Rows, Proveedores -> Modelo & Esfuerzo Flow
// ==========================================================================

const PROVIDERS_DATA = [
  {
    id: "magpie",
    name: "Magpie",
    icon: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3b82f6" stroke-width="2"/><path d="M8 12l3 3 5-5" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/></svg>`,
    models: [
      { id: "group/auto-gemini-3-8-flash", name: "Gemini 3.8 Flash · routing group", latest: true, free: false }
    ]
  },
  {
    id: "magpie-responses",
    name: "Magpie · Responses",
    icon: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="1.8"><path d="M20.5 10.3a5.2 5.2 0 0 0-.4-3.8 5.3 5.3 0 0 0-4.6-2.7 5.2 5.2 0 0 0-3.6 1.4A5.2 5.2 0 0 0 7.8 4 5.3 5.3 0 0 0 3.6 7.4a5.2 5.2 0 0 0-1.3 3.6 5.3 5.3 0 0 0 2.2 4.4 5.2 5.2 0 0 0 .4 3.8 5.3 5.3 0 0 0 4.6 2.7 5.2 5.2 0 0 0 3.6-1.4 5.2 5.2 0 0 0 4.1 1.2 5.3 5.3 0 0 0 4.2-3.4 5.2 5.2 0 0 0 1.3-3.6 5.3 5.3 0 0 0-2.2-4.4z"/><path d="M12 9v6m-3-4.5l6 3m0-3l-6 3" stroke-width="1.5"/></svg>`,
    models: [
      { id: "codex/gpt-6.1-sol", name: "GPT-6.1-Sol · Codex", latest: true, free: false }
    ]
  },
  {
    id: "magpie-anthropic",
    name: "Magpie · Anthropic",
    icon: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><path d="M13.8 3L8.2 21H11.2L16.8 3H13.8Z" fill="#D97757"/><path d="M4 17.5L9.6 3H12.6L7 17.5H4Z" fill="#D97757"/><path d="M12.8 17.5L18.4 3H21.4L15.8 17.5H12.8Z" fill="#D97757" opacity="0.8"/></svg>`,
    models: [
      { id: "zcode/GLM-5.3-Flash", name: "GLM-5.3-Flash · ZCode", latest: true, free: false },
      { id: "zcode/GLM-5.2", name: "GLM-5.2 · ZCode", latest: false, free: false },
      { id: "zcode/GLM-5-Turbo", name: "GLM-5-Turbo · ZCode", latest: false, free: false }
    ]
  },
  {
    id: "opencode",
    name: "OpenCode Desktop",
    icon: `<svg class="oc-glyph" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="4" fill="#09090b" stroke="#3b82f6" stroke-width="1.8"/><path d="M7 8l4 4-4 4" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><path d="M13 16h4" stroke="#60a5fa" stroke-width="2"/></svg>`,
    models: [
      { id: "opencode/glm-5.3-flash-free", name: "GLM-5.3 Flash Free", latest: true, free: true },
      { id: "opencode/mimo-v2.6-flash-free", name: "Mimo V2.6 Flash Free", latest: false, free: true },
      { id: "opencode/longcat-2.5-free", name: "Longcat 2.5 Preview Free", latest: false, free: true }
    ]
  }
];

const EFFORT_LEVELS = [
  { id: "off", label: "Desactivado" },
  { id: "low", label: "Bajo" },
  { id: "medium", label: "Medio" },
  { id: "high", label: "Alto" },
  { id: "max", label: "Máximo" }
];

let appState = {
  selectedProviderId: "magpie",
  selectedModelId: "group/auto-gemini-3-8-flash",
  selectedEffort: "high",
  currentView: "root", // 'root' | 'providers' | 'models' | 'effort'
  drilledProviderId: "magpie",
  isOpen: false
};

// Elements
const triggerBtn = document.getElementById("oc-trigger-btn");
const popover = document.getElementById("oc-popover");
const popoverContent = document.getElementById("popover-content");
const triggerProviderIcon = document.getElementById("trigger-provider-icon");
const triggerProviderName = document.getElementById("trigger-provider-name");
const triggerModelName = document.getElementById("trigger-model-name");
const triggerBadge = document.getElementById("trigger-badge");

// Initialize
function init() {
  updateTriggerUI();
  renderPopover();

  triggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover();
  });

  document.addEventListener("click", (e) => {
    if (appState.isOpen && !popover.contains(e.target) && !triggerBtn.contains(e.target)) {
      closePopover();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && appState.isOpen) {
      if (appState.currentView === "models") {
        appState.currentView = "providers";
        renderPopover();
      } else if (appState.currentView !== "root") {
        appState.currentView = "root";
        renderPopover();
      } else {
        closePopover();
      }
    }
  });
}

function togglePopover() {
  if (appState.isOpen) {
    closePopover();
  } else {
    appState.isOpen = true;
    appState.currentView = "root";
    triggerBtn.classList.add("open");
    popover.classList.add("open");
    renderPopover();
  }
}

function closePopover() {
  appState.isOpen = false;
  triggerBtn.classList.remove("open");
  popover.classList.remove("open");
}

function updateTriggerUI() {
  const provider = PROVIDERS_DATA.find(p => p.id === appState.selectedProviderId) || PROVIDERS_DATA[0];
  const model = provider.models.find(m => m.id === appState.selectedModelId) || provider.models[0];
  const effort = EFFORT_LEVELS.find(e => e.id === appState.selectedEffort) || EFFORT_LEVELS[3];

  triggerProviderIcon.innerHTML = provider.icon;
  triggerProviderName.textContent = provider.name;
  triggerModelName.textContent = model.name;

  if (model.free) {
    triggerBadge.textContent = "FREE";
    triggerBadge.style.background = "rgba(16, 185, 129, 0.15)";
    triggerBadge.style.color = "#34d399";
    triggerBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";
  } else {
    triggerBadge.textContent = effort.label.toUpperCase();
    triggerBadge.style.background = "rgba(56, 189, 248, 0.15)";
    triggerBadge.style.color = "#38bdf8";
    triggerBadge.style.borderColor = "rgba(56, 189, 248, 0.3)";
  }
}

function renderPopover() {
  const currentProvider = PROVIDERS_DATA.find(p => p.id === appState.selectedProviderId) || PROVIDERS_DATA[0];
  const currentEffort = EFFORT_LEVELS.find(e => e.id === appState.selectedEffort) || EFFORT_LEVELS[3];

  // =========================================================================
  // 1. ROOT VIEW: Proveedores & Esfuerzo
  // =========================================================================
  if (appState.currentView === "root") {
    popoverContent.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        <!-- Row 1: Proveedores -->
        <button type="button" class="oc-row" onclick="navigateTo('providers')">
          <div class="oc-row-left">
            <span style="font-size:13px; opacity:0.85;">🏢</span>
            <span class="oc-row-title">Proveedores</span>
          </div>
          <div class="oc-row-right">
            <span class="oc-row-val">${currentProvider.name}</span>
            <span class="oc-chevron">›</span>
          </div>
        </button>

        <div class="oc-separator"></div>

        <!-- Row 2: Esfuerzo -->
        <button type="button" class="oc-row" onclick="navigateTo('effort')">
          <div class="oc-row-left">
            <span style="font-size:13px; opacity:0.85;">⚡</span>
            <span class="oc-row-title">Esfuerzo</span>
          </div>
          <div class="oc-row-right">
            <span class="oc-row-val">${currentEffort.label}</span>
            <span class="oc-chevron">›</span>
          </div>
        </button>
      </div>
    `;
    return;
  }

  // =========================================================================
  // 2. PROVIDERS VIEW
  // =========================================================================
  if (appState.currentView === "providers") {
    let rowsHtml = PROVIDERS_DATA.map(p => {
      const isActive = p.id === appState.selectedProviderId;
      return `
        <button type="button" class="oc-row ${isActive ? 'active' : ''}" onclick="selectProviderDrill('${p.id}')">
          <div class="oc-row-left">
            ${p.icon}
            <span class="oc-row-title">${p.name}</span>
          </div>
          <div class="oc-row-right">
            ${isActive ? '<span class="oc-check">✓</span>' : ''}
            <span class="oc-chevron">›</span>
          </div>
        </button>
      `;
    }).join("");

    popoverContent.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        <button type="button" class="oc-header-row" onclick="navigateTo('root')">
          <span>←</span>
          <span class="oc-header-title">Proveedores</span>
        </button>
        <div class="oc-scroll-list">
          ${rowsHtml}
        </div>
      </div>
    `;
    return;
  }

  // =========================================================================
  // 3. MODELS VIEW (For selected provider only)
  // =========================================================================
  if (appState.currentView === "models") {
    const provider = PROVIDERS_DATA.find(p => p.id === appState.drilledProviderId) || PROVIDERS_DATA[0];
    let modelsHtml = provider.models.map(m => {
      const isCurrent = provider.id === appState.selectedProviderId && m.id === appState.selectedModelId;
      return `
        <button type="button" class="oc-row ${isCurrent ? 'active' : ''}" onclick="chooseModel('${provider.id}', '${m.id}')">
          <div class="oc-row-left">
            <span class="oc-row-title">${m.name}</span>
          </div>
          <div class="oc-row-right">
            ${m.latest ? '<span class="badge-new">NEW</span>' : ''}
            ${m.free ? '<span class="badge-free">FREE</span>' : ''}
            ${isCurrent ? '<span class="oc-check">✓</span>' : ''}
          </div>
        </button>
      `;
    }).join("");

    popoverContent.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        <button type="button" class="oc-header-row" onclick="navigateTo('providers')">
          <span>← Proveedores</span>
          <span class="oc-header-title" style="margin-left:auto; opacity:0.8;">${provider.name}</span>
        </button>
        <div class="oc-scroll-list">
          ${modelsHtml}
        </div>
      </div>
    `;
    return;
  }

  // =========================================================================
  // 4. EFFORT VIEW
  // =========================================================================
  if (appState.currentView === "effort") {
    let effortHtml = EFFORT_LEVELS.map(e => {
      const isCurrent = e.id === appState.selectedEffort;
      return `
        <button type="button" class="oc-row ${isCurrent ? 'active' : ''}" onclick="chooseEffort('${e.id}')">
          <div class="oc-row-left">
            <span class="oc-row-title">${e.label}</span>
          </div>
          <div class="oc-row-right">
            ${isCurrent ? '<span class="oc-check">✓</span>' : ''}
          </div>
        </button>
      `;
    }).join("");

    popoverContent.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        <button type="button" class="oc-header-row" onclick="navigateTo('root')">
          <span>←</span>
          <span class="oc-header-title">Esfuerzo</span>
        </button>
        <div class="oc-scroll-list">
          ${effortHtml}
        </div>
      </div>
    `;
    return;
  }
}

// Navigation helpers
window.navigateTo = function (view) {
  appState.currentView = view;
  renderPopover();
};

window.selectProviderDrill = function (providerId) {
  appState.drilledProviderId = providerId;
  appState.currentView = "models";
  renderPopover();
};

window.chooseModel = function (providerId, modelId) {
  appState.selectedProviderId = providerId;
  appState.selectedModelId = modelId;
  updateTriggerUI();
  closePopover();
};

window.chooseEffort = function (effortId) {
  appState.selectedEffort = effortId;
  updateTriggerUI();
  closePopover();
};

window.selectProviderAndModel = function (providerId, modelId) {
  appState.selectedProviderId = providerId;
  appState.selectedModelId = modelId;
  updateTriggerUI();
};

// Start
init();
