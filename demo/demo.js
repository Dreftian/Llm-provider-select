// ==========================================================================
// OpenCode Desktop Model & Provider Selector Simulator Engine
// Differentiating Proveedores vs Modelos
// ==========================================================================

const PROVIDERS_DATA = [
  {
    id: "opencode-desktop",
    name: "OpenCode Desktop",
    desc: "Modelos insignia gratuitos de alta velocidad proporcionados por OpenCode",
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
        id: "opencode/longcat-2.5-preview-free",
        name: "OpenCode Longcat 2.5 Preview Free",
        free: true,
        latest: false,
        context: "256K",
        desc: "Ventana de contexto ultra larga para análisis de proyectos enteros sin costo.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Contexto Extenso, Análisis"
      },
      {
        id: "opencode/mimo-v2.6-flash-free",
        name: "OpenCode Mimo V2.6 Flash Free",
        free: true,
        latest: false,
        context: "128K",
        desc: "Optimizado para refactorización de código y generación de pruebas unitarias.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Código, Linter"
      },
      {
        id: "opencode/nemotron-3-ultra-free",
        name: "OpenCode Nemotron 3 Ultra Free",
        free: true,
        latest: false,
        context: "128K",
        desc: "Modelo de alto rendimiento para arquitectura y resolución de algoritmos complejos.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Razonamiento, Código"
      },
      {
        id: "opencode/nemotron-3.5-lightning-free",
        name: "OpenCode Nemotron 3.5 Lightning Free",
        free: true,
        latest: true,
        context: "64K",
        desc: "Variante relámpago con latencia sub-segundo para autocompletado en el editor.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Baja Latencia"
      },
      {
        id: "opencode/nemotron-3.5-super-vl-free",
        name: "OpenCode Nemotron 3.5 Super Vl Free",
        free: true,
        latest: false,
        context: "128K",
        desc: "Comprensión visual avanzada para diagramas, mockups y capturas de pantalla.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Visión, Multimodal"
      },
      {
        id: "opencode/space-bunny-free",
        name: "OpenCode Space Bunny Free",
        free: true,
        latest: false,
        context: "128K",
        desc: "Modelo creativo y asistencial para redacción técnica y documentación.",
        costIn: "0.00 $",
        costOut: "0.00 $",
        caps: "Documentación, Explicaciones"
      }
    ]
  },
  {
    id: "magpie-responses",
    name: "Magpie · Responses",
    desc: "Pasarela empresarial de alta fidelidad con modelos OpenAI y Codex",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="1.8"><path d="M20.5 10.3a5.2 5.2 0 0 0-.4-3.8 5.3 5.3 0 0 0-4.6-2.7 5.2 5.2 0 0 0-3.6 1.4A5.2 5.2 0 0 0 7.8 4 5.3 5.3 0 0 0 3.6 7.4a5.2 5.2 0 0 0-1.3 3.6 5.3 5.3 0 0 0 2.2 4.4 5.2 5.2 0 0 0 .4 3.8 5.3 5.3 0 0 0 4.6 2.7 5.2 5.2 0 0 0 3.6-1.4 5.2 5.2 0 0 0 4.1 1.2 5.3 5.3 0 0 0 4.2-3.4 5.2 5.2 0 0 0 1.3-3.6 5.3 5.3 0 0 0-2.2-4.4z"/><path d="M12 9v6m-3-4.5l6 3m0-3l-6 3" stroke-width="1.5"/></svg>`,
    badge: "OpenAI",
    models: [
      {
        id: "codex/gpt-6.1-sol",
        name: "GPT-6.1-Sol · Codex",
        free: false,
        latest: true,
        context: "500K",
        desc: "Modelo insignia para programación con razonamiento adaptativo de alta fidelidad.",
        costIn: "2.50 $ / 1M",
        costOut: "10.00 $ / 1M",
        caps: "Código, Razonamiento xHigh, Visión"
      },
      {
        id: "codex/gpt-6-astra",
        name: "GPT-6-Astra · Codex",
        free: false,
        latest: false,
        context: "272K",
        desc: "Modelo avanzado para refactorizaciones a gran escala y análisis multi-archivo.",
        costIn: "2.00 $ / 1M",
        costOut: "8.00 $ / 1M",
        caps: "Código, Razonamiento"
      },
      {
        id: "codex/gpt-6-sol",
        name: "GPT-6-Sol · Codex",
        free: false,
        latest: false,
        context: "272K",
        desc: "Inferencia balanceada para desarrollo continuo e integración de APIs.",
        costIn: "1.80 $ / 1M",
        costOut: "7.20 $ / 1M",
        caps: "Código, Ejecución"
      },
      {
        id: "codex/gpt-6-luna",
        name: "GPT-6-Luna · Codex",
        free: false,
        latest: false,
        context: "272K",
        desc: "Variante liviana de alta velocidad para respuestas concisas en la terminal.",
        costIn: "0.90 $ / 1M",
        costOut: "3.60 $ / 1M",
        caps: "Baja Latencia"
      }
    ]
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    desc: "Modelos oficiales de DeepSeek con arquitectura MoE de alta eficiencia",
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
    desc: "Familia Claude 3.7 y 3.5 con razonamiento extendido y seguimiento preciso",
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
  }
];

let currentSelectedProvider = PROVIDERS_DATA[0];
let currentSelectedModel = PROVIDERS_DATA[0].models[0];
let currentStageView = "models"; // "providers" | "models" | "all"
let selectedProviderId = PROVIDERS_DATA[0].id;
let highlightedIndex = 0;
let visibleModelRows = [];

// DOM References
const triggerBtn = document.getElementById("oc-trigger-btn");
const triggerProviderIcon = document.getElementById("trigger-provider-icon");
const triggerProviderName = document.getElementById("trigger-provider-name");
const triggerModelName = document.getElementById("trigger-model-name");
const triggerBadge = document.getElementById("trigger-badge");
const popover = document.getElementById("oc-popover");
const searchInput = document.getElementById("oc-search-input");
const searchClearBtn = document.getElementById("oc-search-clear");
const modelList = document.getElementById("oc-model-list");
const tooltip = document.getElementById("oc-specs-tooltip");
const providerPills = document.getElementById("oc-provider-pills");
const breadcrumbBar = document.getElementById("oc-breadcrumb-bar");
const breadcrumbCurrent = document.getElementById("oc-breadcrumb-current");
const backToProvidersBtn = document.getElementById("oc-back-to-providers");

const tabProviders = document.getElementById("tab-providers");
const tabModels = document.getElementById("tab-models");
const tabAll = document.getElementById("tab-all");
const footerProvidersLink = document.getElementById("footer-providers-link");

function init() {
  updateTriggerUI();
  renderProviderPills();
  renderList();

  // Trigger toggle
  triggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover();
  });

  // Stage tab clicks
  tabProviders.addEventListener("click", () => setStage("providers"));
  tabModels.addEventListener("click", () => setStage("models"));
  tabAll.addEventListener("click", () => setStage("all"));
  footerProvidersLink.addEventListener("click", (e) => {
    e.preventDefault();
    setStage("providers");
  });

  backToProvidersBtn.addEventListener("click", () => setStage("providers"));

  // Search input
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    searchClearBtn.style.display = q ? "flex" : "none";
    renderList(q);
  });

  searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchClearBtn.style.display = "none";
    renderList("");
    searchInput.focus();
  });

  // Keyboard navigation
  window.addEventListener("keydown", handleKeydown);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !triggerBtn.contains(e.target)) {
      closePopover();
    }
  });
}

function setStage(stage) {
  currentStageView = stage;
  tabProviders.classList.toggle("active", stage === "providers");
  tabModels.classList.toggle("active", stage === "models");
  tabAll.classList.toggle("active", stage === "all");
  renderProviderPills();
  renderList(searchInput.value.trim().toLowerCase());
}

function updateTriggerUI() {
  triggerProviderIcon.innerHTML = currentSelectedProvider.icon;
  if (triggerProviderName) triggerProviderName.textContent = currentSelectedProvider.name;
  triggerModelName.textContent = currentSelectedModel.name;
  if (currentSelectedModel.free) {
    triggerBadge.style.display = "inline-block";
    triggerBadge.textContent = "FREE";
  } else {
    triggerBadge.style.display = "none";
  }
}

function renderProviderPills() {
  providerPills.innerHTML = "";

  const allPill = document.createElement("button");
  allPill.className = `oc-provider-pill ${currentStageView === "all" ? "active" : ""}`;
  allPill.textContent = "Todos los proveedores";
  allPill.onclick = () => setStage("all");
  providerPills.appendChild(allPill);

  PROVIDERS_DATA.forEach((p) => {
    const pill = document.createElement("button");
    const isActive = currentStageView === "models" && selectedProviderId === p.id;
    pill.className = `oc-provider-pill ${isActive ? "active" : ""}`;
    pill.innerHTML = `${p.icon} <span>${p.name}</span> <span style="opacity:0.6;font-size:10px;">(${p.models.length})</span>`;
    pill.onclick = () => {
      selectedProviderId = p.id;
      setStage("models");
    };
    providerPills.appendChild(pill);
  });
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
  renderList("");
  setTimeout(() => searchInput.focus(), 50);
}

function closePopover() {
  popover.classList.remove("show");
  triggerBtn.classList.remove("is-open");
  hideTooltip();
}

function renderList(query = "") {
  modelList.innerHTML = "";
  visibleModelRows = [];

  // STAGE: PROVIDERS SELECTION VIEW
  if (currentStageView === "providers" && !query) {
    breadcrumbBar.style.display = "none";
    const cardList = document.createElement("div");
    cardList.className = "oc-provider-card-list";

    PROVIDERS_DATA.forEach((p) => {
      const card = document.createElement("button");
      const isActive = currentSelectedProvider.id === p.id;
      card.className = `oc-provider-card ${isActive ? "active" : ""}`;
      card.innerHTML = `
        <div class="oc-provider-card-icon">${p.icon}</div>
        <div class="oc-provider-card-info">
          <div class="oc-provider-card-name">
            <span>${p.name}</span>
            ${isActive ? '<span class="oc-badge-pill" style="background:#2563eb;color:#fff;font-size:9.5px;padding:1px 5px;border-radius:4px;">ACTIVO</span>' : ''}
          </div>
          <div class="oc-provider-card-desc">${p.desc}</div>
        </div>
        <div class="oc-provider-card-meta">
          <span style="font-size:11px;color:#94a3b8;background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:6px;">${p.models.length} modelos</span>
          <svg style="width:14px;height:14px;color:#64748b;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      `;
      card.onclick = () => {
        selectedProviderId = p.id;
        setStage("models");
      };
      cardList.appendChild(card);
    });

    modelList.appendChild(cardList);
    return;
  }

  // STAGE: MODELS VIEW (Filter by selectedProviderId unless in 'all' or query)
  let activeProv = PROVIDERS_DATA.find((p) => p.id === selectedProviderId) || PROVIDERS_DATA[0];

  if (currentStageView === "models" && !query) {
    breadcrumbBar.style.display = "flex";
    breadcrumbCurrent.innerHTML = `${activeProv.icon} <span>${activeProv.name}</span>`;
  } else {
    breadcrumbBar.style.display = "none";
  }

  PROVIDERS_DATA.forEach((provider) => {
    if (!query && currentStageView === "models" && provider.id !== selectedProviderId) {
      return;
    }

    const matchingModels = provider.models.filter((m) => {
      if (!query) return true;
      return (
        m.name.toLowerCase().includes(query) ||
        provider.name.toLowerCase().includes(query) ||
        (m.desc && m.desc.toLowerCase().includes(query))
      );
    });

    if (matchingModels.length === 0) return;

    // Section group container
    const groupEl = document.createElement("div");
    groupEl.className = "oc-provider-group";

    // Header
    const headerBtn = document.createElement("button");
    headerBtn.className = "oc-provider-header";
    headerBtn.innerHTML = `
      <svg class="oc-provider-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" stroke-linecap="round"/>
      </svg>
      <span class="oc-provider-icon">${provider.icon}</span>
      <span class="oc-provider-title">${provider.name}</span>
      <span class="oc-provider-count">${matchingModels.length}</span>
    `;

    const modelRowsContainer = document.createElement("div");
    modelRowsContainer.className = "oc-model-rows";

    headerBtn.addEventListener("click", () => {
      const isCollapsed = modelRowsContainer.classList.toggle("collapsed");
      headerBtn.classList.toggle("collapsed", isCollapsed);
    });

    matchingModels.forEach((model) => {
      const row = document.createElement("button");
      const isSelected =
        currentSelectedModel.id === model.id &&
        currentSelectedProvider.id === provider.id;

      row.className = `oc-model-row ${isSelected ? "is-active" : ""}`;
      row.innerHTML = `
        <span class="oc-model-name">${model.name}</span>
        <div class="oc-badges-container">
          ${model.free ? '<span class="oc-badge-pill oc-badge-free">FREE</span>' : ""}
          ${model.latest ? '<span class="oc-badge-pill oc-badge-latest">LATEST</span>' : ""}
          ${model.context ? `<span class="oc-badge-pill oc-badge-context">${model.context}</span>` : ""}
        </div>
        <svg class="oc-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      row.addEventListener("mouseenter", (e) => {
        showTooltip(model, provider, e.currentTarget);
      });
      row.addEventListener("mouseleave", () => hideTooltip());

      row.addEventListener("click", () => {
        selectModel(provider, model);
      });

      visibleModelRows.push({ element: row, provider, model });
      modelRowsContainer.appendChild(row);
    });

    groupEl.appendChild(headerBtn);
    groupEl.appendChild(modelRowsContainer);
    modelList.appendChild(groupEl);
  });

  if (visibleModelRows.length === 0) {
    const empty = document.createElement("div");
    empty.className = "oc-empty-state";
    empty.innerHTML = `No se encontraron modelos para "<strong>${query}</strong>"`;
    modelList.appendChild(empty);
  } else {
    highlightedIndex = 0;
    updateHighlight();
  }
}

function selectModel(provider, model) {
  currentSelectedProvider = provider;
  currentSelectedModel = model;
  selectedProviderId = provider.id;
  updateTriggerUI();
  closePopover();
}

function showTooltip(model, provider, targetRow) {
  const ttProviderIcon = document.getElementById("tt-provider-icon");
  const ttProviderName = document.getElementById("tt-provider-name");
  const ttBadgePill = document.getElementById("tt-badge-pill");
  const ttModelName = document.getElementById("tt-model-name");
  const ttDesc = document.getElementById("tt-desc");
  const ttContext = document.getElementById("tt-context");
  const ttCostIn = document.getElementById("tt-costin");
  const ttCostOut = document.getElementById("tt-costout");
  const ttCapsTags = document.getElementById("tt-caps-tags");

  ttProviderIcon.innerHTML = provider.icon;
  ttProviderName.textContent = provider.name;
  ttBadgePill.textContent = model.free ? "FREE" : "PRO";
  ttBadgePill.className = `tooltip-badge-pill ${model.free ? "free" : "pro"}`;
  ttModelName.textContent = model.name;
  ttDesc.textContent = model.desc || "Sin descripción disponible.";
  ttContext.textContent = model.context || "128K";
  ttCostIn.textContent = model.costIn || "0.00 $";
  ttCostOut.textContent = model.costOut || "0.00 $";

  ttCapsTags.innerHTML = "";
  if (model.caps) {
    model.caps.split(",").forEach((cap) => {
      const span = document.createElement("span");
      span.className = "tooltip-tag";
      span.textContent = cap.trim();
      ttCapsTags.appendChild(span);
    });
  }

  const popoverRect = popover.getBoundingClientRect();
  const rowRect = targetRow.getBoundingClientRect();
  const relativeTop = rowRect.top - popoverRect.top;

  tooltip.style.top = `${Math.max(10, Math.min(relativeTop, popoverRect.height - 240))}px`;
  tooltip.classList.add("visible");
}

function hideTooltip() {
  tooltip.classList.remove("visible");
}

function updateHighlight() {
  visibleModelRows.forEach((rowObj, index) => {
    rowObj.element.classList.toggle("is-highlighted", index === highlightedIndex);
  });
}

function handleKeydown(e) {
  if (!popover.classList.contains("show")) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closePopover();
    triggerBtn.focus();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (visibleModelRows.length > 0) {
      highlightedIndex = (highlightedIndex + 1) % visibleModelRows.length;
      updateHighlight();
      visibleModelRows[highlightedIndex].element.scrollIntoView({ block: "nearest" });
      showTooltip(
        visibleModelRows[highlightedIndex].model,
        visibleModelRows[highlightedIndex].provider,
        visibleModelRows[highlightedIndex].element
      );
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (visibleModelRows.length > 0) {
      highlightedIndex =
        (highlightedIndex - 1 + visibleModelRows.length) % visibleModelRows.length;
      updateHighlight();
      visibleModelRows[highlightedIndex].element.scrollIntoView({ block: "nearest" });
      showTooltip(
        visibleModelRows[highlightedIndex].model,
        visibleModelRows[highlightedIndex].provider,
        visibleModelRows[highlightedIndex].element
      );
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (visibleModelRows[highlightedIndex]) {
      const { provider, model } = visibleModelRows[highlightedIndex];
      selectModel(provider, model);
    }
  }
}

// Start
document.addEventListener("DOMContentLoaded", init);
