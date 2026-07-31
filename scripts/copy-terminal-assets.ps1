# Copy Terminal Trainer media from Laughing Dragons source folder into the site repo.
$ErrorActionPreference = "Stop"
$SiteRoot = Split-Path $PSScriptRoot -Parent
$Dest = Join-Path $SiteRoot "assets\kids\games\terminal"
$SourceDir = "G:\Laughing Dragons\Laughing-Dragons.com"

New-Item -ItemType Directory -Force -Path $Dest | Out-Null

$VideoSource = Join-Path $SourceDir "Sitting at PC.mp4"
$VideoDest = Join-Path $Dest "sitting-at-pc.mp4"
if (Test-Path $VideoSource) {
  Copy-Item $VideoSource $VideoDest -Force
  Write-Host "Copied video -> $VideoDest"
} else {
  Write-Warning "Video not found: $VideoSource"
}

# Desk frame: prefer PNG in repo; optional source override if you add a clean frame later.
$FrameCandidates = @(
  (Join-Path $SourceDir "desk-monitor-frame.png"),
  (Join-Path $SourceDir "DragonCLI.png")
)
$FrameDest = Join-Path $Dest "desk-monitor-frame.png"
$copied = $false
foreach ($candidate in $FrameCandidates) {
  if (Test-Path $candidate) {
    Copy-Item $candidate $FrameDest -Force
    Write-Host "Copied desk frame -> $FrameDest"
    $copied = $true
    break
  }
}
if (-not $copied -and -not (Test-Path $FrameDest)) {
  Write-Warning "Desk frame not found. Keep assets/kids/games/terminal/desk-monitor-frame.png in repo."
}

Write-Host "Done. Assets in $Dest"
