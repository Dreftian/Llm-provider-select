#!/usr/bin/env bash
# ==============================================================================
# LLM Provider Select - Auto Installer for DeepSeek Harness (macOS / Linux)
# ==============================================================================

set -e

echo ""
echo "=========================================================="
echo "   LLM Provider Select — Installer for DeepSeek Harness"
echo "   Identical to OpenCode Desktop v2 Design"
echo "=========================================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DSH_DIR="$HOME/.dsh"
PLUGINS_DIR="$DSH_DIR/plugins"
TARGET_DIR="$PLUGINS_DIR/llm-provider-select"

mkdir -p "$PLUGINS_DIR"

if [ -d "$TARGET_DIR" ]; then
    echo "[*] Updating existing plugin at $TARGET_DIR..."
    rm -rf "$TARGET_DIR"
fi

echo "[+] Copying plugin files to $TARGET_DIR..."
cp -R "$SCRIPT_DIR" "$TARGET_DIR"

CORDIS_CONFIG="$DSH_DIR/cordis.yml"
PLUGIN_ENTRY="- name: 'llm-provider-select'"

if [ -f "$CORDIS_CONFIG" ]; then
    if ! grep -q "llm-provider-select" "$CORDIS_CONFIG"; then
        echo "[+] Adding plugin entry to $CORDIS_CONFIG..."
        echo "$PLUGIN_ENTRY" >> "$CORDIS_CONFIG"
    else
        echo "[*] Plugin already registered in $CORDIS_CONFIG."
    fi
else
    echo "[+] Creating $CORDIS_CONFIG with llm-provider-select..."
    printf "plugins:\n  %s\n" "$PLUGIN_ENTRY" > "$CORDIS_CONFIG"
fi

echo ""
echo "=========================================================="
echo "   INSTALLATION COMPLETED SUCCESSFULLY!"
echo "=========================================================="
echo ""
echo "Restart DeepSeek Harness Desktop or run 'dsh web' to enjoy the new selector."
echo ""
