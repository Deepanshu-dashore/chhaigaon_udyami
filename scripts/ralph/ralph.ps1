# Ralph Wiggum - Autonomous AI Agent Loop for Windows PowerShell
# Usage: .\scripts\ralph\ralph.ps1 [-Tool claude|amp] [-MaxIterations 10]

param(
    [ValidateSet("claude", "amp")]
    [string]$Tool = "claude",
    [int]$MaxIterations = 10
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PrdFile = Join-Path $ScriptDir "prd.json"
$ProgressFile = Join-Path $ScriptDir "progress.txt"
$ClaudePrompt = Join-Path $ScriptDir "CLAUDE.md"
$AmpPrompt = Join-Path $ScriptDir "prompt.md"

if (-not (Test-Path $ProgressFile)) {
    @"
# Ralph Progress Log
Started: $(Get-Date)
---
## Codebase Patterns
- Next.js 16 App Router with React 19.
- Prisma 7 + Supabase Postgres with RLS policies.
- Razorpay for payments; VdoCipher for DRM protected videos.
---
"@ | Out-File -FilePath $ProgressFile -Encoding utf8
}

Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "  Starting Ralph Loop on Windows (PowerShell)" -ForegroundColor Cyan
Write-Host "  Tool: $Tool | Max Iterations: $MaxIterations" -ForegroundColor Cyan
Write-Host "===============================================================" -ForegroundColor Cyan

for ($i = 1; $i -le $MaxIterations; $i++) {
    Write-Host "`n===============================================================" -ForegroundColor Yellow
    Write-Host "  Ralph Iteration $i of $MaxIterations ($Tool)" -ForegroundColor Yellow
    Write-Host "===============================================================" -ForegroundColor Yellow

    $output = ""
    if ($Tool -eq "claude") {
        if (-not (Get-Command "claude" -ErrorAction SilentlyContinue)) {
            Write-Error "Claude CLI not found. Install via: npm install -g @anthropic-ai/claude-code"
            exit 1
        }
        $promptContent = Get-Content $ClaudePrompt -Raw
        $output = $promptContent | claude --dangerously-skip-permissions --print 2>&1
    } elseif ($Tool -eq "amp") {
        if (-not (Get-Command "amp" -ErrorAction SilentlyContinue)) {
            Write-Error "Amp CLI not found."
            exit 1
        }
        $promptContent = Get-Content $AmpPrompt -Raw
        $output = $promptContent | amp --dangerously-allow-all 2>&1
    }

    Write-Host $output

    if ($output -match "<promise>COMPLETE</promise>") {
        Write-Host "`n🎉 Ralph completed all tasks in iteration $i!" -ForegroundColor Green
        exit 0
    }

    Write-Host "`nIteration $i finished. Pausing briefly before next iteration..." -ForegroundColor DarkGray
    Start-Sleep -Seconds 2
}

Write-Host "`n⚠️ Ralph reached max iterations ($MaxIterations) without completing all tasks." -ForegroundColor Yellow
Write-Host "Check $ProgressFile for details." -ForegroundColor DarkGray
exit 1
