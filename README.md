<p align="center">
  <img src="assets/banner.svg" alt="LLM Provider Select Banner" width="100%" />
</p>

<p align="center">
  <strong>Transform the model and provider selector in DeepSeek Harness into the iconic, ultra-sleek OpenCode Desktop v2 design.</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/UI-OpenCode%20Desktop%20v2-3b82f6?style=flat-square" alt="OpenCode Desktop UI" /></a>
  <a href="#installation"><img src="https://img.shields.io/badge/Platform-DeepSeek%20Harness-1d72f2?style=flat-square" alt="DeepSeek Harness" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="MIT License" /></a>
  <a href="README.es.md"><img src="https://img.shields.io/badge/Idioma-Espa%C3%B1ol-blueviolet?style=flat-square" alt="Versión en Español" /></a>
</p>

---

## 🌟 Overview

**`Llm-provider-select`** is a high-performance Cordis client plugin for **DeepSeek Harness** (`dsh` desktop and web runtime) that completely revamps the bottom composer model selector.

Instead of the default nested 2-tier sub-menus, it delivers the celebrated **[OpenCode Desktop](https://opencode.ai/)** modal selector experience:
- **Unified Glassmorphism Popover**: Single-layer floating dialog with smooth spring animations.
- **Instant Fuzzy Search**: High-speed filtering by model name, provider, or capability with keyboard navigation.
- **Provider Accordions & Official Brand Icons**: Clean collapsible sections for OpenCode Free, DeepSeek, Anthropic Claude, OpenAI, Google Gemini, Groq, Mistral, Ollama, and WorkBuddy.
- **Rich Badges**: Prominent `FREE`, `LATEST`, and Context Window (`128K`, `1M`) pill badges.
- **Specs Hover Card**: Floating inspection card displaying context size, input/output pricing, and model capabilities.

<p align="center">
  <img src="assets/preview-selector.svg" alt="OpenCode Desktop Selector Architecture" width="100%" />
</p>

---

## ⚡ Features

### 1. OpenCode Composer Trigger Pill
* Replaces plain text with a modern, glass-styled chip in the composer toolbar.
* Dynamic brand icon matching the active provider (e.g., OpenCode glyph, DeepSeek whale, Claude spark).
* Embedded `FREE` badge for free-tier models (such as `GLM-5.3-Flash Free`).
* Smooth chevron rotation when opening and closing.

### 2. Collapsible Provider Accordions (`ProviderModelSections`)
* Group models logically under their respective providers.
* Smooth 180° rotating chevrons with model count badges.
* Keeps favorite or active providers pinned at the top.

### 3. Real-Time Fuzzy Search & Keyboard Navigation
* Auto-focuses on open.
* Instant query matching across provider names, model IDs, and descriptions.
* **Full keyboard accessibility**:
  * <kbd>↓</kbd> / <kbd>↑</kbd> to cycle highlighted models with automatic scroll-into-view.
  * <kbd>Enter</kbd> to select and activate the model.
  * <kbd>Esc</kbd> to dismiss.

### 4. Interactive Specs Tooltip (`ModelTooltip`)
* Hover over any model row or highlight it via keyboard to inspect:
  * **Context window** (e.g., 128,000 tokens, 200,000 tokens).
  * **Maximum output tokens** (e.g., 8,192 tokens).
  * **Pricing** (e.g., *100% Gratuito* or exact $/M token rates).
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

## 📦 Installation

### Option 1: 1-Click Automated Installer (Recommended)

#### Windows (PowerShell):
```powershell
irm https://raw.githubusercontent.com/Dreftian/Llm-provider-select/main/install.ps1 | iex
```
*(Or clone the repository and run `./install.ps1`)*

#### macOS / Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/Dreftian/Llm-provider-select/main/install.sh | bash
```

---

### Option 2: DeepSeek Harness Cordis Plugin Configuration

Add the plugin to your `~/.dsh/cordis.yml` (or your project's `cordis.yml`):

```yaml
plugins:
  - name: 'llm-provider-select'
    # Optional configurations:
    defaultProvider: 'opencode-free'
    enableFuzzySearch: true
    showPricingBadges: true
```

Or apply the bundle patch:
```yaml
- insert:
    - id: llm-provider-select
      name: 'llm-provider-select'
```

---

### Option 3: Direct Desktop App Patch (`client.js`)

If you are using the pre-packaged DeepSeek Harness Desktop application:
1. Locate your DeepSeek Harness desktop user scripts or preload folder (`~/.dsh/` or the app resources).
2. Copy `client.js` into your runtime directory.
3. Restart DeepSeek Harness Desktop.

---

## 🛠️ Project Structure

```text
Llm-provider-select/
├── assets/
│   ├── banner.svg               # High-resolution hero banner
│   ├── preview-selector.svg     # Architecture and UI breakdown diagram
│   └── icons/                   # Provider SVG brand icons
├── demo/
│   ├── index.html               # Live interactive simulator
│   ├── demo.css                 # OpenCode Desktop styling
│   └── demo.js                  # Search, navigation, and tooltip engine
├── src/
│   ├── index.ts                 # Cordis host plugin entrypoint
│   ├── cordis.d.ts              # Cordis context typings
│   ├── css-modules.d.ts         # Ambient CSS module declarations
│   └── client/
│       ├── index.ts             # Client plugin registration for conversation.input.model
│       ├── OpenCodeModelSelect.tsx  # React component matching OpenCode Desktop
│       ├── OpenCodeModelSelect.module.css
│       ├── ProviderIcons.tsx    # SVG brand icons renderer
│       ├── ModelTooltip.tsx     # Floating specs card component
│       ├── search.ts            # Fuzzy search and ranking algorithm
│       └── types.ts             # TypeScript definitions
├── dist/                        # Compiled production distribution
├── cordis.patch.yml             # DeepSeek Harness bundle patch
├── install.ps1                  # Windows automated installer
├── install.sh                   # Unix/macOS automated installer
├── package.json
├── tsconfig.json
├── README.md                    # English documentation
├── README.es.md                 # Spanish documentation
└── LICENSE                      # MIT License
```

---

## 🎨 Supported Providers & Brand Glyphs

| Provider | Brand Glyph | Supported Models |
|---|:---:|---|
| **OpenCode Free** | <img src="assets/icons/opencode.svg" width="18"/> | `GLM-5.3-Flash Free`, `GLM-5.2 · ZCode`, `GLM-5-Turbo` |
| **DeepSeek** | <img src="assets/icons/deepseek.svg" width="18"/> | `DeepSeek-V4.1-Flash`, `DeepSeek-V4-Pro`, `DeepSeek-V3`, `DeepSeek-R1` |
| **Anthropic** | <img src="assets/icons/anthropic.svg" width="18"/> | `Claude 3.7 Sonnet (Thinking)`, `Claude 3.5 Haiku` |
| **OpenAI** | <img src="assets/icons/openai.svg" width="18"/> | `GPT-6.1-Sol · Codex`, `GPT-6-Astra`, `GPT-5-Luna` |
| **Google** | <img src="assets/icons/google-gemini.svg" width="18"/> | `Gemini 2.5 Pro`, `Gemini 2.5 Flash` |
| **WorkBuddy AI** | <img src="assets/icons/workbuddy.svg" width="18"/> | `Auto`, `Fast · x0.34`, `Balanced · x0.59`, `Primary · x3.31` |
| **Groq / Mistral / Ollama** | <img src="assets/icons/groq.svg" width="18"/> | Local and cloud open-weights models |

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/Dreftian"><strong>Dreftian</strong></a>
</p>
