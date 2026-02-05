@echo off
:: Google DNS ayarlamak icin bu dosyaya SAG TIK -> "Yonetici olarak calistir" yapin
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0set-google-dns.ps1"
pause
