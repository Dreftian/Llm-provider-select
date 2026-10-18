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

**`Llm-provider-select`** (package name `dsh-plugin-llm-provider-select`) is a Cordis client plugin for **DeepSeek Harness** (`dsh` desktop and web runtime) that completely revamps the bottom composer model selector.

Instead of the default nested 2-tier sub-menus, it delivers the celebrated **[OpenCode Desktop](https://opencode.ai/)** modal selector experience:
- **Unified Glassmorphism Popover**: Single-layer floating dialog with backdrop blur and smooth entrance animations.
- **Instant Fuzzy Search**: High-speed filtering by model name, provider, or capability with keyboard navigation.
- **Provider Accordions & Official Brand Icons**: Clean collapsible sections for OpenCode Free, DeepSeek, Anthropic Claude, OpenAI, Google Gemini, Groq, Mistral, Ollama, and WorkBuddy.
- **Rich Badges**: Prominent `FREE`, `LATEST`, and Context Window (`128K`, `1M`) pill badges.
- **Specs Hover Card**: Floating inspection card displaying context size, input/output pricing, and model capabilities.

<p align="center">
  <img src="assets/preview-selector.svg" alt="OpenCode Desktop Selector Architecture" width="100%" />
</p>

---

## ⚡ Features

### 1. Distinct Trigger Pill: Provider › Model
* Replaces plain text with a modern, glass-styled chip in the composer toolbar.
* Displays brand icon and clearly separates the provider and model: `[Icon] Provider › Model`.
* Examples: `OpenCode Desktop › GLM-5.3-Flash Free` or `Magpie · Responses › GPT-6.1-Sol · Codex`.
* Embedded `FREE` badge for free-tier models.
* Smooth chevron rotation when opening and closing.

### 2. Two-Stage Navigation: 1. Providers → 2. Models
* **Tab 1. Providers**: Browse all configured providers (`OpenCode Desktop`, `Magpie · Responses`, `DeepSeek`, `Claude`, `OpenAI`, etc.) in interactive cards showing brand icon, description, and model count. Clicking a provider immediately opens its models.
* **Tab 2. Models**: Displays models for the active provider, with a top breadcrumb (`← Switch Provider | Current Provider`) to return in 1 click.
* **Tab All**: Full unified view with collapsible accordions for quick inspection of all providers simultaneously.
* **Horizontal Provider Pills**: Scrollable quick-select chips at the top to switch between providers instantly.

### 3. Real-Time Fuzzy Search & Keyboard Navigation
* Auto-focuses on open.
* Instant query matching across provider names, model IDs, and descriptions.
* **Full keyboard accessibility**:
  * <kbd>↓</kbd> / <kbd>↑</kbd> to cycle highlighted models with automatic scroll-into-view.
  * <kbd>Enter</kbd> to select and activate the model.
  * <kbd>Esc</kbd> to dismiss.

### 4. Interactive Specs Tooltip (`ModelTooltip`)
* Hover over any model row or highlight it via keyboard to inspect:
  * **Context window** (e.g., 128,000 tokens, 200,000 tokens, 500,000 tokens).
  * **Maximum output tokens** (e.g., 8,192 tokens, 128,000 tokens).
  * **Pricing** (e.g., *100% Free* or exact $/M token rates).
  * **Capabilities** (Code, Tool Calling, Vision, Thinking/Reasoning).

---

## 🚀 Quick Interactive Demo

You can test the exact OpenCode selector interactively right now without installing anything:

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
