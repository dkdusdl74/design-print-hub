$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Url = "http://localhost:3000/partner-workspace"
$LogPath = Join-Path $env:TEMP "design-print-hub-local-server.log"

function Write-HealthLog {
  param([string]$Message)

  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Add-Content -LiteralPath $LogPath -Value "[$timestamp] $Message"
}

function Test-PartnerWorkspace {
  try {
    $page = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 8
    if ($page.StatusCode -ne 200) {
      return $false
    }

    $cssMatch = [regex]::Match($page.Content, '<link[^>]+href="([^"]+\.css[^"]*)"')
    if (-not $cssMatch.Success) {
      return $false
    }

    $cssUri = [Uri]::new([Uri]"http://localhost:3000", $cssMatch.Groups[1].Value)
    $css = Invoke-WebRequest -Uri $cssUri.AbsoluteUri -UseBasicParsing -TimeoutSec 8
    return $css.StatusCode -eq 200 -and $css.Content.Contains("porta-shell")
  } catch {
    return $false
  }
}

function Stop-Port3000 {
  $listeners = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique

  foreach ($processId in $listeners) {
    if ($processId -and $processId -ne 0) {
      Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
      Write-HealthLog "Stopped process $processId on port 3000."
    }
  }
}

if (Test-PartnerWorkspace) {
  Write-HealthLog "Partner workspace is healthy."
  exit 0
}

Write-HealthLog "Partner workspace is not healthy. Restarting local server."
Stop-Port3000
Start-Sleep -Seconds 2

$startScript = Join-Path $ProjectRoot "start-windows.cmd"
Start-Process -FilePath $startScript -WorkingDirectory $ProjectRoot -WindowStyle Hidden

for ($attempt = 1; $attempt -le 12; $attempt++) {
  Start-Sleep -Seconds 5
  if (Test-PartnerWorkspace) {
    Write-HealthLog "Partner workspace recovered after restart."
    exit 0
  }
}

Write-HealthLog "Partner workspace did not recover after restart."
exit 1
