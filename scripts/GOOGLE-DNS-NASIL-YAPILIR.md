# Google DNS Nasıl Ayarlanır (Windows)

MongoDB Atlas veya diğer bulut DB bağlantılarında `ECONNREFUSED` / DNS hatası alıyorsanız, ağınızda Google DNS kullanmak işe yarayabilir.

---

## Yöntem 1: Script ile (önerilen)

1. **Dosya Gezgini**nde şu klasöre gidin:  
   `C:\Users\lanetteke\Documents\GitHub\ticketing-app\scripts\`
2. **Google-DNS-Yonetici-olarak-calistir.bat** dosyasına **sağ tıklayın**.
3. **"Yönetici olarak çalıştır"** seçin.
4. UAC (izin) penceresinde **Evet** deyin.
5. Pencerede "Tamamlandi" mesajını gördükten sonra **Enter** ile kapatın.

---

## Yöntem 2: Elle Windows ayarları

1. **Windows tuşu + R** → `ncpa.cpl` yazıp Enter (Ağ Bağlantıları açılır).
2. Kullandığınız bağlantıya sağ tıklayın (örn. **Wi-Fi**) → **Özellikler**.
3. **İnternet Protokolü Sürüm 4 (TCP/IPv4)** seçin → **Özellikler**.
4. **"Aşağıdaki DNS sunucu adreslerini kullan"** seçin.
5. Şunları yazın:
   - **Tercih edilen DNS sunucusu:** `8.8.8.8`
   - **Diğer DNS sunucusu:** `8.8.4.4`
6. **Tamam** → **Tamam**.
7. İsterseniz Wi-Fi’yi kapatıp açın veya bilgisayarı yeniden başlatın.

---

## DNS’i tekrar otomatik yapmak

- Aynı pencerede (TCP/IPv4 Özellikleri) **"DNS sunucu adresini otomatik olarak al"** seçeneğine dönün.

---

## 0.0.0.0 hakkında

MongoDB Atlas’ta **Network Access**’e `0.0.0.0/0` eklemeniz **erişime izin verilen IP’ler** içindir (güvenlik duvarı tarafı).  
`ECONNREFUSED` / `querySrv` hatası ise **DNS çözümlemesi** (bilgisayarınızın `_mongodb._tcp....mongodb.net` adresini bulamaması) ile ilgilidir. Bu yüzden Google DNS (8.8.8.8) kullanmak faydalı olur; 0.0.0.0 eklemek bu DNS hatasını değiştirmez.
