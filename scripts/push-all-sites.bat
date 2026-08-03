@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0push-all-sites.ps1" %*
