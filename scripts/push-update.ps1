param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Message
)

Set-Location (Split-Path $PSScriptRoot -Parent)

git add .
git status

if (-not (git diff --cached --quiet)) {
  git -c user.name="Brandon Sparks" -c user.email="laughingdragonsproductions@gmail.com" commit -m $Message
  git push origin main
  Write-Host "Pushed to main. Cloudflare Pages will redeploy in 1-3 minutes."
} else {
  Write-Host "Nothing to commit."
}
