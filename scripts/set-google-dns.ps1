# Google DNS ayarlama scripti (8.8.8.8, 8.8.4.4)
# Yonetici olarak calistirin: Google-DNS-Yonetici-olarak-calistir.bat (sag tik -> Yonetici olarak calistir)

$googleDNS = @("8.8.8.8", "8.8.4.4")

# Aktif ag bagdastiricilarini bul (Wi-Fi, Ethernet vb.)
$adapters = $null
try {
    $adapters = Get-NetAdapter -ErrorAction Stop | Where-Object { $_.Status -eq "Up" }
} catch {
    Write-Host "EROR: Yonetici yetkisi gerekli. 'Google-DNS-Yonetici-olarak-calistir.bat' dosyasina sag tik -> Yonetici olarak calistir" -ForegroundColor Red
    exit 1
}

if (-not $adapters -or $adapters.Count -eq 0) {
    Write-Host "Aktif ag bagdastiricisi bulunamadi." -ForegroundColor Red
    exit 1
}

foreach ($adapter in $adapters) {
    $name = $adapter.InterfaceAlias
    Write-Host "DNS ayarlaniyor: $name -> Google DNS (8.8.8.8, 8.8.4.4)" -ForegroundColor Cyan
    try {
        Set-DnsClientServerAddress -InterfaceAlias $name -ServerAddresses $googleDNS
        Write-Host "  OK: $name" -ForegroundColor Green
    } catch {
        Write-Host "  HATA: $name - $_" -ForegroundColor Red
    }
}

Write-Host "`nTamamlandi. MongoDB/Atlas baglantisi icin tarayici veya uygulamayi yeniden baslatin." -ForegroundColor Yellow
Write-Host "DNS'i eski haline getirmek icin ag ayarlarindan 'DNS sunucusunu otomatik al' secin." -ForegroundColor Gray
