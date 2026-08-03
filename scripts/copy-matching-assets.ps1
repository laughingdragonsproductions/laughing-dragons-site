# Copy Memory Matching maps + dragon tiles from the work folder into the site repo.
$ErrorActionPreference = "Stop"
$SiteRoot = Split-Path $PSScriptRoot -Parent
$Dest = Join-Path $SiteRoot "assets\kids\games\memory-matching"
$SourceDir = "G:\Laughing Dragons\Laughing-Dragons.com\Laughing dragons matching game"

$MapsDest = Join-Path $Dest "maps"
$TilesDest = Join-Path $Dest "tiles"
New-Item -ItemType Directory -Force -Path $MapsDest | Out-Null
New-Item -ItemType Directory -Force -Path $TilesDest | Out-Null

$mapMap = @{
  "Map.png"  = "map-1.png"
  "Map2.png" = "map-2.png"
  "Map3.png" = "map-3.png"
}

foreach ($pair in $mapMap.GetEnumerator()) {
  $from = Join-Path $SourceDir "maps\$($pair.Key)"
  $to = Join-Path $MapsDest $pair.Value
  if (Test-Path -LiteralPath $from) {
    Copy-Item -LiteralPath $from -Destination $to -Force
    Write-Host "Copied map $($pair.Key) -> $($pair.Value)"
  } else {
    Write-Warning "Missing map: $from"
  }
}

$tilesSrc = Join-Path $SourceDir "Tile sprites"
Get-ChildItem -Path $tilesSrc -Filter *.png | ForEach-Object {
  Copy-Item $_.FullName (Join-Path $TilesDest $_.Name) -Force
  Write-Host "Copied tile $($_.Name)"
}

$sum = (Get-ChildItem -Path $Dest -Recurse -File | Measure-Object Length -Sum).Sum
Write-Host ("Done. Assets in {0} ({1:N2} MB)" -f $Dest, ($sum / 1MB))
