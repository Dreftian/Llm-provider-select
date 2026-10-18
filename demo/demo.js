// ==========================================================================
// OpenCode Desktop Model & Provider Selector Simulator Engine
// ==========================================================================

const PROVIDERS_DATA = [
  {
    id: "opencode-free",
    name: "OpenCode (Free)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="4" fill="#09090b" stroke="#3b82f6" stroke-width="1.8"/><path d="M7 8l4 4-4 4" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/><path d="M13 16h4" stroke="#60a5fa" stroke-width="2"/></svg>`,
    badge: "Free",
    models: [
      {
        id: "opencode/glm-5.3-flash-free",
        name: "OpenCode Glm 5.3 Flash Free",
        free: true,
        latest: true,
        context: "128K",
        desc: "Modelo gratuito insignia ultra rápido para desarrollo de software y asistencia en código.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Código, Visión, Thinking"
      },
      {
        id: "opencode/glm-5.2-zcode",
        name: "GLM-5.2 · ZCode",
        free: true,
        latest: false,
        context: "128K",
        desc: "Optimizado para refactorización de código y generación de pruebas unitarias.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Código, Linter"
      },
      {
        id: "opencode/glm-5-turbo-zcode",
        name: "GLM-5-Turbo · ZCode",
        free: true,
        latest: false,
        context: "64K",
        desc: "Variante liviana de alta velocidad para autocompletado en tiempo real.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Latencia ultra-baja"
      }
    ]
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 13.5C3.2 11.2 3.6 8.3 5.4 6.5C7.2 4.7 10.1 4.3 12.4 5.6C14.7 6.9 16.1 9.4 16.5 12.1C16.9 14.8 19.1 17 21.8 17.2V18.5C18.2 18.5 15.2 15.8 14.8 12.2C14.5 9.8 13.3 7.7 11.4 6.6C9.5 5.5 7.2 5.8 5.7 7.3C4.2 8.8 3.9 11.1 4.9 13C5.9 14.9 7.9 16.1 10.1 16.1H12V18.1H10.1C7.1 18.1 4.4 16.3 3.3 13.5L4.5 13.5Z" fill="#1D72F2"/><circle cx="8" cy="9" r="1.5" fill="#1D72F2"/></svg>`,
    badge: null,
    models: [
      {
        id: "deepseek/deepseek-v4.1-flash",
        name: "DeepSeek-V4.1-Flash",
        free: false,
        latest: true,
        context: "128K",
        desc: "Nueva arquitectura DeepSeek con razonamiento adaptativo e inferencia veloz.",
        costIn: "0.14 $ / 1M",
        costOut: "0.28 $ / 1M",
        caps: "Código, Razonamiento, Herramientas"
      },
      {
        id: "deepseek/deepseek-v4-pro",
        name: "DeepSeek-V4-Pro",
        free: false,
        latest: false,
        context: "128K",
        desc: "Modelo insignia para tareas complejas de arquitectura y planificación multi-agente.",
        costIn: "0.27 $ / 1M",
        costOut: "1.10 $ / 1M",
        caps: "Razonamiento profundo, Visión"
      }
    ]
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M13.8 3L8.2 21H11.2L16.8 3H13.8Z" fill="#D97757"/><path d="M4 17.5L9.6 3H12.6L7 17.5H4Z" fill="#D97757"/><path d="M12.8 17.5L18.4 3H21.4L15.8 17.5H12.8Z" fill="#D97757" opacity="0.8"/></svg>`,
    badge: null,
    models: [
      {
        id: "anthropic/claude-3-7-sonnet",
        name: "Claude 3.7 Sonnet (Thinking)",
        free: false,
        latest: true,
        context: "200K",
        desc: "Capacidades híbridas de respuesta instantánea o pensamiento extendido controlado.",
        costIn: "3.00 $ / 1M",
        costOut: "15.00 $ / 1M",
        caps: "Razonamiento avanzado, Código, Visión"
      },
      {
        id: "anthropic/claude-3-5-haiku",
        name: "Claude 3.5 Haiku",
        free: false,
        latest: false,
        context: "200K",
        desc: "Rendimiento veloz para análisis rápido de archivos y comandos shell.",
        costIn: "0.80 $ / 1M",
        costOut: "4.00 $ / 1M",
        caps: "Baja latencia, Herramientas"
      }
    ]
  },
  {
    id: "workbuddy",
    name: "WorkBuddy AI",
    icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" fill="#6366f1" opacity="0.15" stroke="#6366f1" stroke-width="1.8"/><circle cx="9" cy="11" r="1.5" fill="#818cf8"/><circle cx="15" cy="11" r="1.5" fill="#818cf8"/><path d="M8 15c1.5 1.5 4.5 1.5 6 0" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    badge: "Proxy",
    models: [
      {
        id: "workbuddy/auto",
        name: "Auto (Enrutador Dinámico)",
        free: false,
        latest: true,
        context: "128K",
        desc: "Selecciona automáticamente el mejor modelo disponible según el costo y complejidad.",
        costIn: "Dinámico",
        costOut: "Dinámico",
        caps: "Enrutamiento inteligente"
      },
      {
        id: "workbuddy/fast-034",
        name: "Fast · x0.34",
        free: false,
        latest: false,
        context: "64K",
        desc: "Prioriza mínima latencia para tareas repetitivas y generación de resúmenes.",
        costIn: "0.10 $ / 1M",
        costOut: "0.30 $ / 1M",
        caps: "Rápido, Liviano"
      },
      {
        id: "workbuddy/primary-331",
        name: "Primary · x3.31",
        free: false,
        latest: false,
        context: "128K",
        desc: "Máxima precisión analítica para refactorizaciones completas de repositorios.",
        costIn: "1.50 $ / 1M",
        costOut: "4.50 $ / 1M",
        caps: "Alta precisión"
      }
    ]
  }
];

let currentSelectedModel = PROVIDERS_DATA[0].models[0];
let currentSelectedProvider = PROVIDERS_DATA[0];
let highlightedIndex = 0;
let visibleModelRows = [];

// DOM References
const triggerBtn = document.getElementById("oc-trigger-btn");
const triggerProviderIcon = document.getElementById("trigger-provider-icon");
const triggerModelName = document.getElementById("trigger-model-name");
const triggerBadge = document.getElementById("trigger-badge");
const popover = document.getElementById("oc-popover");
const searchInput = document.getElementById("oc-search-input");
const searchClearBtn = document.getElementById("oc-search-clear");
const modelList = document.getElementById("oc-model-list");
const tooltip = document.getElementById("oc-specs-tooltip");

function init() {
  updateTriggerUI();
  renderModelList();

  // Trigger toggle
  triggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover();
  });

  // Search input
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    searchClearBtn.style.display = q ? "flex" : "none";
    renderModelList(q);
  });

  searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchClearBtn.style.display = "none";
    renderModelList("");
    searchInput.focus();
  });

  // Global keyboard navigation
  window.addEventListener("keydown", handleKeydown);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !triggerBtn.contains(e.target)) {
      closePopover();
    }
  });
}

function updateTriggerUI() {
  triggerProviderIcon.innerHTML = currentSelectedProvider.icon;
  triggerModelName.textContent = currentSelectedModel.name;
  if (currentSelectedModel.free) {
    triggerBadge.style.display = "inline-block";
    triggerBadge.textContent = "FREE";
  } else {
    triggerBadge.style.display = "none";
  }
}

function togglePopover() {
  if (popover.classList.contains("show")) {
    closePopover();
  } else {
    openPopover();
  }
}

function openPopover() {
  popover.classList.add("show");
  triggerBtn.classList.add("is-open");
  searchInput.value = "";
  searchClearBtn.style.display = "none";
  renderModelList("");
  setTimeout(() => searchInput.focus(), 50);
}

function closePopover() {
  popover.classList.remove("show");
  triggerBtn.classList.remove("is-open");
  hideTooltip();
}

function renderModelList(query = "") {
  modelList.innerHTML = "";
  visibleModelRows = [];
  let totalMatches = 0;

  PROVIDERS_DATA.forEach((provider) => {
    const matchingModels = provider.models.filter((m) => {
      if (!query) return true;
      return (
        m.name.toLowerCase().includes(query) ||
        provider.name.toLowerCase().includes(query) ||
        (m.desc && m.desc.toLowerCase().includes(query))
      );
    });

    if (matchingModels.length === 0) return;

    totalMatches += matchingModels.length;

    // Provider Accordion
    const group = document.createElement("div");
    group.className = "oc-provider-group";
    if (query.length > 0) {
      group.classList.remove("collapsed");
    }

    const header = document.createElement("button");
    header.className = "oc-provider-header";
    header.innerHTML = `
      <svg class="oc-provider-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" stroke-linecap="round"/>
      </svg>
      <div class="oc-provider-icon">${provider.icon}</div>
      <span class="oc-provider-title">${provider.name}</span>
      <span class="oc-provider-count">${matchingModels.length}</span>
    `;

    header.addEventListener("click", () => {
      group.classList.toggle("collapsed");
    });

    const modelsContainer = document.createElement("div");
    modelsContainer.className = "oc-provider-models";

    matchingModels.forEach((model) => {
      const isSelected = currentSelectedModel.id === model.id;
      const row = document.createElement("button");
      row.className = `oc-model-row ${isSelected ? "is-active" : ""}`;
      row.setAttribute("data-model-id", model.id);

      let badgesHtml = "";
      if (model.free) {
        badgesHtml += `<span class="oc-badge oc-badge-free">FREE</span>`;
      }
      if (model.latest) {
        badgesHtml += `<span class="oc-badge oc-badge-latest">LATEST</span>`;
      }
      if (model.context) {
        badgesHtml += `<span class="oc-badge oc-badge-context">${model.context}</span>`;
      }

      row.innerHTML = `
        <span class="oc-model-row-name">${highlightMatch(model.name, query)}</span>
        <div class="oc-model-badges">${badgesHtml}</div>
        <svg class="oc-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      // Hover Tooltip
      row.addEventListener("mouseenter", () => {
        showTooltip(model, provider, row);
      });
      row.addEventListener("mouseleave", hideTooltip);

      // Select Model
      row.addEventListener("click", () => {
        selectModel(model, provider);
      });

      modelsContainer.appendChild(row);
      visibleModelRows.push({ element: row, model, provider });
    });

    group.appendChild(header);
    group.appendChild(modelsContainer);
    modelList.appendChild(group);
  });

  if (totalMatches === 0) {
    modelList.innerHTML = `
      <div class="oc-empty-state">
        <p>No se encontraron modelos que coincidan con "<strong>${escapeHtml(query)}</strong>"</p>
      </div>
    `;
  }

  // Update highlighted row for arrow key nav
  highlightedIndex = 0;
  updateHighlightedRow();
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query})`, "gi");
  return escapeHtml(text).replace(regex, `<span style="color: #38bdf8; font-weight: 700;">$1</span>`);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function selectModel(model, provider) {
  currentSelectedModel = model;
  currentSelectedProvider = provider;
  updateTriggerUI();
  closePopover();
}

function updateHighlightedRow() {
  visibleModelRows.forEach((item, idx) => {
    if (idx === highlightedIndex) {
      item.element.classList.add("is-highlighted");
      item.element.scrollIntoView({ block: "nearest", behavior: "smooth" });
      showTooltip(item.model, item.provider, item.element);
    } else {
      item.element.classList.remove("is-highlighted");
    }
  });
}

function handleKeydown(e) {
  if (!popover.classList.contains("show")) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closePopover();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (visibleModelRows.length > 0) {
      highlightedIndex = (highlightedIndex + 1) % visibleModelRows.length;
      updateHighlightedRow();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (visibleModelRows.length > 0) {
      highlightedIndex = (highlightedIndex - 1 + visibleModelRows.length) % visibleModelRows.length;
      updateHighlightedRow();
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (visibleModelRows[highlightedIndex]) {
      selectModel(visibleModelRows[highlightedIndex].model, visibleModelRows[highlightedIndex].provider);
    }
  }
}

function showTooltip(model, provider, targetElement) {
  const rect = targetElement.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  tooltip.innerHTML = `
    <div class="oc-tooltip-title">${escapeHtml(model.name)}</div>
    <div class="oc-tooltip-desc">${escapeHtml(model.desc || "Modelo de lenguaje avanzado compatible con OpenCode y DeepSeek Harness.")}</div>
    <div class="oc-tooltip-divider"></div>
    <div class="oc-tooltip-row">
      <span class="oc-tooltip-label">Proveedor:</span>
      <span class="oc-tooltip-val">${escapeHtml(provider.name)}</span>
    </div>
    <div class="oc-tooltip-row">
      <span class="oc-tooltip-label">Contexto:</span>
      <span class="oc-tooltip-val">${model.context || "128,000"} tokens</span>
    </div>
    <div class="oc-tooltip-row">
      <span class="oc-tooltip-label">Entrada / Salida:</span>
      <span class="oc-tooltip-val ${model.free ? "free" : ""}">${model.costIn} / ${model.costOut}</span>
    </div>
    <div class="oc-tooltip-row">
      <span class="oc-tooltip-label">Capacidades:</span>
      <span class="oc-tooltip-val" style="color: #38bdf8;">${escapeHtml(model.caps || "Código, Agente")}</span>
    </div>
  `;

  // Align with current element
  const offsetTop = rect.top - popoverRect.top;
  tooltip.style.top = Math.max(10, Math.min(offsetTop - 20, 240)) + "px";
  tooltip.classList.add("visible");
}

function hideTooltip() {
  tooltip.classList.remove("visible");
}

// Start
init();
