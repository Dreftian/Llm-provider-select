<p align="center">
  <img src="assets/banner.svg" alt="LLM Provider Select Banner" width="100%" />
</p>

<p align="center">
  <strong>Transform the model and provider selector in DeepSeek Harness into the iconic, ultra-sleek OpenCode Desktop v2 design.</strong>
</p>

<p align="center">
  <a href="#-how-to-install-in-deepseek-harness-gui-dialog"><img src="https://img.shields.io/badge/Install-DeepSeek%20Harness%20GUI-1d72f2?style=flat-square&logo=github" alt="GUI Installation" /></a>
  <a href="#features"><img src="https://img.shields.io/badge/UI-OpenCode%20Desktop%20v2-3b82f6?style=flat-square" alt="OpenCode Desktop UI" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="MIT License" /></a>
  <a href="README.es.md"><img src="https://img.shields.io/badge/Idioma-Espa%C3%B1ol-blueviolet?style=flat-square" alt="Versión en Español" /></a>
</p>

---

## 📥 How to Install in DeepSeek Harness (GUI Dialog)

If you are using the **Plugins > + Add Plugin** (*Complementos > + Agregar plugin*) modal inside DeepSeek Harness:

<p align="center">
  <img src="assets/dsh-install-guide.svg" alt="DeepSeek Harness Installation Guide" width="100%" />
</p>

The input prompt in DeepSeek Harness requests:
> *"Enter plugin package name, GitHub repository address, or local directory path."*

Simply paste any of the following into the text box:

### 🌟 Option 1: GitHub Repository URL (Recommended)
This is the easiest and most direct method. Copy and paste the official repository URL:

```text
https://github.com/Dreftian/Llm-provider-select
```

*Or use the GitHub shorthand:*
```text
Dreftian/Llm-provider-select
```

* **How it works**: DeepSeek Harness automatically clones and installs the latest release directly from GitHub into its plugin directory.

---

### 📁 Option 2: Local Directory Path (If already downloaded to your PC)
If you already have this repository cloned locally on your computer, paste the absolute path:

```text
C:\Users\Dreitz\.gemini\antigravity\scratch\Llm-provider-select
```
*(Or the exact path where you placed the cloned repository on your drive)*.

* **How it works**: DeepSeek Harness loads the plugin directly from your local disk without needing an internet connection, allowing live local editing and instant reloading.

---

### 📦 Option 3: Standard DSH Package Name
If using the official DeepSeek Harness plugin registry or npm:

```text
dsh-plugin-llm-provider-select
```
*(or alias `llm-provider-select`)*.

* **How it works**: Follows the canonical naming format for DeepSeek Harness plugins (`dsh-plugin-*`), identical to the official example shown in the UI (`dsh-plugin-whale-pet`).

---

### 🚀 Step-by-Step Activation Walkthrough:
1. Open **DeepSeek Harness Desktop** (or Web).
2. On the left navigation sidebar, click **Plugins / Complementos** (puzzle icon).
3. In the top-right corner, click the **`+ Add plugin`** (*+ Agregar plugin*) button.
4. Paste the GitHub repository URL into the text box:
   ```text
   https://github.com/Dreftian/Llm-provider-select
   ```
5. Click the blue **Install** (*Instalar*) button.
6. Open any conversation, and click the model trigger chip at the bottom composer. The OpenCode Desktop v2 selector popover will appear immediately!

---

## 🌟 Overview

**`Llm-provider-select`** (package name `dsh-plugin-llm-provider-select`) is an interface plugin for the Cordis engine in **DeepSeek Harness** (`dsh`) designed to structure the model and provider selector with an **ultra-compact** design (236px width, 28px row height), identical to OpenCode Desktop v2 and native DeepSeek Harness.

### 🎯 Compact Menu Architecture:
1. **Root Menu**:
   - **Row 1: `Proveedores` (Providers)**: Displays current active provider name (`[Icon] Proveedores` → `Magpie ›`).
   - *Subtle 0.5px separator*.
   - **Row 2: `Esfuerzo` (Effort)**: Displays current reasoning effort level (`⚡ Esfuerzo` → `Alto / High ›`).
2. **Sub-view 1: Provider Catalog**:
   - Clicking **`Proveedores`** opens the compact list of all configured providers (*OpenCode Desktop, Magpie Responses, Magpie Anthropic, Magpie, etc.*) with SVG brand icons and a checkmark (`✓`) on the active provider.
3. **Sub-view 2: Model Selection**:
   - Selecting any provider immediately navigates to the **`Modelo`** view, displaying **only the models belonging to the chosen provider**.
   - Includes a back button (`← Proveedores`) and compact search bar.
   - Clicking a model confirms selection, updates the composer trigger, and closes the menu.
4. **Sub-view 3: Reasoning Effort**:
   - Clicking **`Esfuerzo`** lists effort levels (*Desactivado, Bajo, Medio, Alto, Máximo*) with single-click confirmation.

<p align="center">
  <img src="assets/preview-selector.svg" alt="Compact Provider and Model Architecture" width="100%" />
</p>

---

## ⚡ Features

### 1. Strictly Compact Dimensions (236px)
* Exact **236px width**, matching the native floating popovers of DeepSeek Harness and OpenCode Desktop.
* Strict **28px row height** for all provider, model, and effort entries.
* No oversized cards, no heavy banners, no wasted margin space.
* Dark glassmorphic finish with backdrop blur (*backdrop-filter: blur(20px)*) and subtle 0.5px translucent borders.

### 2. Hierarchical Flow: Providers → Model
* **Complete distinction**: Choose the **Provider** first, and then pick from the **Models** belonging to that specific provider.
* Quick back navigation (`← Volver` / `← Proveedores`) and <kbd>Esc</kbd> key support to transition cleanly between views.
* High-fidelity checkmark (`✓`) on active provider and model.

### 3. Composer Trigger Pill: Provider › Model
* Displays official brand glyph and clearly separates provider from model: `[Icon] Provider › Model`.
* Examples: `Magpie › Gemini 3.8 Flash · HIGH` or `OpenCode Desktop › GLM-5.3-Flash Free`.
* Integrated badge for free models (`FREE`) or effort levels (`HIGH`, `MED`).

### 4. Full Keyboard Navigation
* <kbd>↓</kbd> / <kbd>↑</kbd> to cycle between rows.
* <kbd>Enter</kbd> to confirm selection.
* <kbd>Esc</kbd> to step back to the previous view or dismiss the menu.

---

## 🚀 Live Interactive Simulator

You can test the complete compact 236px experience immediately in your browser:

```bash
git clone https://github.com/Dreftian/Llm-provider-select.git
cd Llm-provider-select
npm run start:demo
```
Open [http://localhost:3000](http://localhost:3000) (or open `demo/index.html` directly in your browser) to interact with the live simulator!

---

## 📦 Alternative Installation Methods

### Method A: Automated CLI Script (Included)

#### Windows (PowerShell):
```powershell
.\install.ps1
```
Or directly from the web in PowerShell:
```powershell
irm https://raw.githubusercontent.com/Dreftian/Llm-provider-select/main/install.ps1 | iex
```

#### macOS / Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/Dreftian/Llm-provider-select/main/install.sh | bash
```

---

### Method B: DeepSeek Harness Cordis Configuration (`cordis.yml`)

Add the plugin to your `~/.dsh/cordis.yml` (or your project's `cordis.yml`):

```yaml
plugins:
  - name: 'dsh-plugin-llm-provider-select'
    defaultProvider: 'opencode-free'
    enableFuzzySearch: true
    showPricingBadges: true
```

Or via Cordis bundle patch (`cordis.patch.yml`):
```yaml
- insert:
    - id: dsh-plugin-llm-provider-select
      name: 'dsh-plugin-llm-provider-select'
```

---

### Method C: Direct Client Injection for DeepSeek Harness Desktop (`client.js`)

If using the packaged binary distribution of DeepSeek Harness Desktop:
1. Copy `client.js` to your DeepSeek Harness plugin directory (`~/.dsh/plugins/` or application resources).
2. Restart DeepSeek Harness Desktop.

---

## 🛠️ Repository Structure

```text
Llm-provider-select/
├── assets/
│   ├── banner.svg               # High-resolution hero banner
│   ├── dsh-install-guide.svg    # Visual guide for DeepSeek Harness installer modal
│   ├── preview-selector.svg     # Architecture diagram
│   └── icons/                   # Brand vector icons (SVG)
├── demo/
│   ├── index.html               # In-browser interactive simulator
│   ├── demo.css                 # OpenCode Desktop styles
│   └── demo.js                  # Search and keyboard engine
├── src/
│   ├── index.ts                 # Cordis host entrypoint
│   ├── cordis.d.ts              # Cordis type declarations
│   ├── css-modules.d.ts         # CSS modules declarations
│   └── client/
│       ├── index.ts             # conversation.input.model slot hook
│       ├── OpenCodeModelSelect.tsx  # React component matching OpenCode Desktop
│       ├── OpenCodeModelSelect.module.css
│       ├── ProviderIcons.tsx    # SVG brand icons
│       ├── ModelTooltip.tsx     # Context & specs hover card
│       ├── search.ts            # Fuzzy match algorithm
│       └── types.ts             # TypeScript interfaces
├── dist/                        # Production build
├── cordis.patch.yml             # Cordis bundle patch declaration
├── install.ps1                  # Automated installer for Windows
├── install.sh                   # Automated installer for Linux/macOS
├── package.json
├── tsconfig.json
├── README.md                    # English documentation
├── README.es.md                 # Spanish documentation
└── LICENSE                      # MIT License
```

---

## 🎨 Supported Providers & Official Brand Icons

| Provider | SVG Icon | Sample Supported Models |
|---|:---:|---|
| **OpenCode Free** | <img src="assets/icons/opencode.svg" width="18"/> | `GLM-5.3-Flash Free`, `GLM-5.2 · ZCode`, `GLM-5-Turbo` |
| **DeepSeek** | <img src="assets/icons/deepseek.svg" width="18"/> | `DeepSeek-V4.1-Flash`, `DeepSeek-V4-Pro`, `DeepSeek-V3`, `DeepSeek-R1` |
| **Anthropic** | <img src="assets/icons/anthropic.svg" width="18"/> | `Claude 3.7 Sonnet (Thinking)`, `Claude 3.5 Haiku` |
| **OpenAI** | <img src="assets/icons/openai.svg" width="18"/> | `GPT-6.1-Sol · Codex`, `GPT-6-Astra`, `GPT-5-Luna` |
| **Google** | <img src="assets/icons/google-gemini.svg" width="18"/> | `Gemini 2.5 Pro`, `Gemini 2.5 Flash` |
| **WorkBuddy AI** | <img src="assets/icons/workbuddy.svg" width="18"/> | `Auto`, `Fast · x0.34`, `Balanced · x0.59`, `Primary · x3.31` |
| **Groq / Mistral / Ollama** | <img src="assets/icons/groq.svg" width="18"/> | Open models (Llama 3.3, Mistral Large, etc.) |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  Crafted with care by <a href="https://github.com/Dreftian"><strong>Dreftian</strong></a>
</p>
