# Local preview — Laughing Dragons (port 8081; Lit Printz uses 8080)
param([int]$Port = 8081)

$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

function Stop-PortListener([int]$ListenPort) {
  $conns = Get-NetTCPConnection -LocalPort $ListenPort -State Listen -ErrorAction SilentlyContinue
  foreach ($c in $conns) {
    $proc = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
    if ($proc -and $proc.ProcessName -match 'python|py') {
      Write-Host "Stopping $($proc.ProcessName) (PID $($proc.Id)) on port $ListenPort"
      Stop-Process -Id $proc.Id -Force
    }
  }
}

Stop-PortListener -ListenPort $Port
Write-Host "Preview at http://127.0.0.1:$Port/  (Ctrl+C to stop)"
python -m http.server $Port
