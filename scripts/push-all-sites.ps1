param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Message,
  [switch]$Force,
  [switch]$HubOnly,
  [switch]$ChittinOnly,
  [switch]$ReptoolsOnly,
  [switch]$DryRun,
  [switch]$SkipAiMarksFilter
)

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "git-author.ps1")

$AiMarksFilter = "G:\LocalAIagent\desktop-agent\scripts\filter-ai-marks.ps1"

$Sites = @(
  @{
    Id = "hub"
    Name = "Laughing Dragons Hub"
    Path = "G:\LocalAIagent\laughing-dragons-site"
    Branch = "main"
    LiveUrl = "https://laughing-dragons.com"
  },
  @{
    Id = "chittin"
    Name = "Chittinn Chattin"
    Path = "G:\Laughing Dragons\Chittinnchattin.com"
    Branch = "main"
    LiveUrl = "https://chittinnchattin.com"
  },
  @{
    Id = "reptools"
    Name = "Reptools"
    Path = "G:\LocalAIagent\reptools-site"
    Branch = "main"
    LiveUrl = "https://reptools.pages.dev"
  }
)

function Push-SiteRepo {
  param(
    [hashtable]$Site,
    [string]$Message,
    [switch]$Force,
    [switch]$DryRun
  )

  $root = $Site.Path
  if (-not (Test-Path $root)) {
    Write-Warning "Skipping $($Site.Name): path not found - $root"
    return [PSCustomObject]@{ Site = $Site.Name; Status = "skipped"; Detail = "path missing" }
  }

  if (-not (Test-Path (Join-Path $root ".git"))) {
    Write-Warning "Skipping $($Site.Name): not a git repo - $root"
    return [PSCustomObject]@{ Site = $Site.Name; Status = "skipped"; Detail = "not a git repo" }
  }

  Write-Host ""
  Write-Host "=== $($Site.Name) ===" -ForegroundColor Cyan
    Write-Host "Path: $root"
    Push-Location $root

    try {
      if (-not $SkipAiMarksFilter -and (Test-Path $AiMarksFilter) -and $Site.Id -in @("hub", "chittin")) {
        Write-Host "AI marks filter (websites)..." -ForegroundColor DarkGray
        & $AiMarksFilter -Scope websites -WebsitePath $root -Quiet
        if ($LASTEXITCODE -ne 0) {
          Write-Host "AI marks filter reported errors for $($Site.Name)." -ForegroundColor Yellow
        }
      }

      $sizeScript = Join-Path $root "scripts\check-site-size.ps1"
    if (Test-Path $sizeScript) {
      $sizeArgs = @()
      if ($Force) { $sizeArgs += "-Force" }
      & $sizeScript @sizeArgs
      if ($LASTEXITCODE -eq 2 -and -not $Force) {
        Write-Host "Push aborted for $($Site.Name) - site size over critical limit (use -Force to override)." -ForegroundColor Red
        return [PSCustomObject]@{ Site = $Site.Name; Status = "aborted"; Detail = "size limit" }
      }
    }

    git add .
    git status -sb

    $hasChanges = -not (git diff --cached --quiet 2>$null)
    if (-not $hasChanges) {
      $ahead = git rev-list --count "origin/$($Site.Branch)..HEAD" 2>$null
      if ($ahead -and [int]$ahead -gt 0) {
        Write-Host "No new changes to commit, but $ahead commit(s) ahead of origin - pushing..."
        if (-not $DryRun) {
          git push origin $Site.Branch
        }
        return [PSCustomObject]@{ Site = $Site.Name; Status = "pushed"; Detail = "unpushed commits only" }
      }
      Write-Host "Nothing to commit for $($Site.Name)."
      return [PSCustomObject]@{ Site = $Site.Name; Status = "clean"; Detail = "no changes" }
    }

    if ($DryRun) {
      Write-Host "[DryRun] Would commit and push to $($Site.Branch)." -ForegroundColor Yellow
      git diff --cached --stat
      return [PSCustomObject]@{ Site = $Site.Name; Status = "dry-run"; Detail = "would commit" }
    }

    $commitExit = Invoke-GitCommitWithAuthor -Message $Message
    if ($commitExit -ne 0) {
      throw "git commit failed (exit $commitExit)"
    }

    git push origin $Site.Branch
    if ($LASTEXITCODE -ne 0) {
      throw "git push failed (exit $LASTEXITCODE)"
    }

    Write-Host "Pushed $($Site.Name). Redeploy in ~1-3 min: $($Site.LiveUrl)" -ForegroundColor Green
    return [PSCustomObject]@{ Site = $Site.Name; Status = "pushed"; Detail = "committed and pushed" }
  }
  catch {
    Write-Host "ERROR for $($Site.Name): $_" -ForegroundColor Red
    return [PSCustomObject]@{ Site = $Site.Name; Status = "error"; Detail = $_.Exception.Message }
  }
  finally {
    Pop-Location
  }
}

$selected = @($Sites)
if ($HubOnly) {
  $selected = @($Sites | Where-Object { $_.Id -eq "hub" })
}
elseif ($ChittinOnly) {
  $selected = @($Sites | Where-Object { $_.Id -eq "chittin" })
}
elseif ($ReptoolsOnly) {
  $selected = @($Sites | Where-Object { $_.Id -eq "reptools" })
}

Write-Host "Push all sites - $Message"
if ($DryRun) { Write-Host "(dry run - no commit or push)" -ForegroundColor Yellow }

$results = @()
foreach ($site in $selected) {
  $results += Push-SiteRepo -Site $site -Message $Message -Force:$Force -DryRun:$DryRun
  if ($results[-1].Status -eq "error" -or $results[-1].Status -eq "aborted") {
    break
  }
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
$results | ForEach-Object { Write-Host ("  {0,-22} {1,-10} {2}" -f $_.Site, $_.Status, $_.Detail) }

$failed = @($results | Where-Object { $_.Status -in @("error", "aborted") })
if ($failed.Count -gt 0) { exit 1 }
exit 0
