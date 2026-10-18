# ==============================================================================
# LLM Provider Select - Instalador automático para DeepSeek Harness (Windows)
# ==============================================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   LLM Provider Select — Instalador para DeepSeek Harness" -ForegroundColor Cyan
Write-Host "   Diseño idéntico a OpenCode Desktop v2" -ForegroundColor DarkCyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$CurrentDir = $PSScriptRoot
$DshConfigDir = Join-Path $env:USERPROFILE ".dsh"
$DshPluginsDir = Join-Path $DshConfigDir "plugins"

# 1. Crear directorios si no existen
if (-not (Test-Path $DshPluginsDir)) {
    Write-Host "[+] Creando directorio de complementos en: $DshPluginsDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $DshPluginsDir | Out-Null
}

# 2. Registrar el plugin como enlace simbólico o copia local
$TargetPluginDir = Join-Path $DshPluginsDir "llm-provider-select"
if (Test-Path $TargetPluginDir) {
    Write-Host "[*] Actualizando instalación existente en $TargetPluginDir..." -ForegroundColor DarkYellow
    Remove-Item -Recurse -Force $TargetPluginDir
}

Write-Host "[+] Instalando archivos del plugin..." -ForegroundColor Yellow
Copy-Item -Path $CurrentDir -Destination $TargetPluginDir -Recurse -Force

# 3. Registrar en cordis.yml si existe
$CordisConfig = Join-Path $DshConfigDir "cordis.yml"
$PluginEntry = "- name: 'llm-provider-select'"

if (Test-Path $CordisConfig) {
    $Content = Get-Content $CordisConfig -Raw
    if ($Content -notmatch "llm-provider-select") {
        Write-Host "[+] Añadiendo plugin a $CordisConfig..." -ForegroundColor Yellow
        Add-Content -Path $CordisConfig -Value "`n$PluginEntry"
    } else {
        Write-Host "[*] El plugin ya se encuentra registrado en $CordisConfig." -ForegroundColor Green
    }
} else {
    Write-Host "[+] Creando configuración cordis.yml con llm-provider-select..." -ForegroundColor Yellow
    Set-Content -Path $CordisConfig -Value "plugins:`n  $PluginEntry"
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   ¡INSTALACIÓN COMPLETADA CON ÉXITO!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para disfrutar del nuevo selector OpenCode Desktop:" -ForegroundColor White
Write-Host "  1. Reinicia tu aplicación DeepSeek Harness Desktop o ejecuta 'dsh web'." -ForegroundColor Gray
Write-Host "  2. Haz clic en el selector de modelo en la barra inferior (composer)." -ForegroundColor Gray
Write-Host "  3. ¡Disfruta de la búsqueda en tiempo real, acordeones e iconos de marca!" -ForegroundColor Gray
Write-Host ""
