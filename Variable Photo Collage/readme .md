# Dinamik Yatay Ürün Slider'ı (JSON Destekli)

Bu proje, modern e-ticaret sitelerinde sıkça görülen yatay kaydırılabilir (horizontal scroll) ürün satırlarının gelişmiş ve tamamen dinamik bir versiyonudur. HTML, CSS ve JavaScript kullanılarak tasarlanmıştır. 

En büyük avantajı, kodun içine girip sayı veya metin değiştirmenize gerek kalmadan, klasördeki içeriğe göre kendi kendini şekillendirmesidir.

## Öne Çıkan Özellikler

* **Değişken Fotoğraf Sayısı (Otomatik Algılama):** Projenin en güçlü özelliğidir. Sisteme kaç adet ürün gireceğinizi kod tarafında belirtmenize gerek yoktur. JavaScript, `images` klasöründeki fotoğrafları sırasıyla tarar ve resimler bitene kadar yatay satıra yeni ürün kartları eklemeye devam eder. 5 resim de koysanız, 50 resim de koysanız sistem hatasız çalışır.
* **Yatay Ürün Satırı (Horizontal Carousel):** Ürünler dikey değil, yan yana sonsuz bir satır şeklinde dizilir. Fareyle veya akıllı yön oklarıyla pürüzsüz bir kaydırma (smooth scroll) deneyimi sunar.
* **JSON ile Dışarıdan Veri Yönetimi:** Ürünlerin marka, başlık, fiyat ve indirim gibi metin bilgileri kodun içine gömülmez. `veri.json` isimli harici bir dosyadan çekilerek fotoğraflarla eşleştirilir. Bu sayede içerik yönetimi çok daha profesyonel ve kolaydır.
* **Akıllı Yön Okları:** Kullanıcı yatay satırın en başına veya en sonuna geldiğinde ok butonları otomatik olarak gizlenir. Ayrıca her zaman ürün fotoğraflarının dikey merkezine kendilerini hizalarlar.

## Kurulum ve Klasör Yapısı

Projeyi kullanabilmek için dosyalarınızın aşağıdaki yapıda olması gerekmektedir:

```
proje-klasoru/
│
├── index.html
├── veri.json         <-- Ürün bilgilerinin (fiyat, isim vb.) bulunduğu dosya
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/           
    ├── 1.jpg         <-- Fotoğraf isimleri sırayla gitmelidir
    ├── 2.jpg
    ├── 3.jpg
    └── ...
```

## Nasıl Kullanılır?

1. **Fotoğrafları Ekleyin:** Sergilemek istediğiniz ürün fotoğraflarını `images/` klasörüne `1.jpg`, `2.jpg` şeklinde numaralandırarak kopyalayın.
2. **Verileri Girin:** `veri.json` dosyasını açıp her bir fotoğraf sırasına denk gelecek şekilde ürün bilgilerini girin. (Örn: 1. sıradaki veri 1.jpg ile eşleşir). Eğer JSON dosyasında eksik veri varsa, sistem otomatik olarak "Varsayılan Ürün" yedeğini devreye sokar.
3. **Projeyi Çalıştırın:** Proje artık dışarıdan bir dosya (`veri.json`) okuduğu için tarayıcı güvenliği (CORS) kurallarına tabidir. Dosyaları doğrudan çift tıklayarak açmak yerine bir yerel sunucu (Örn: VS Code "Live Server" eklentisi) kullanarak çalıştırmanız gerekmektedir.
