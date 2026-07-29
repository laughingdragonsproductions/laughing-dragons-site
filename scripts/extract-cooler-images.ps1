# Extract cooler preview images from .3mf files and regenerate assets/js/prints.js
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)
python (Join-Path $PSScriptRoot "extract-cooler-images.py")
exit $LASTEXITCODE
