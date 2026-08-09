# Launch Kids Terminal Trainer locally for development
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

$Port = 8080
$Url = "http://localhost:${Port}/games/terminal/"

function Test-PortOpen([int]$p) {
  $tcp = New-Object System.Net.Sockets.TcpClient
  try {
    $tcp.Connect("127.0.0.1", $p)
    $tcp.Close()
    return $true
  } catch {
    return $false
  }
}

if (-not (Test-PortOpen $Port)) {
  Write-Host "Starting local server on port $Port..."
  Start-Process python -ArgumentList "-m", "http.server", "$Port" -WorkingDirectory $Root
  Start-Sleep -Seconds 2
} else {
  Write-Host "Reusing existing server on port $Port"
}

Start-Process $Url
Write-Host ""
Write-Host "Terminal Trainer: $Url"
Write-Host "Edit files and refresh the browser. Close the Python server window to stop."
