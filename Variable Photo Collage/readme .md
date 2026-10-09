# Dinamik Ürün Slider'ı (W Concept Tarzı)

Bu proje, HTML, CSS ve JavaScript kullanılarak geliştirilmiş, modern, yatay kaydırılabilir (carousel/slider) bir ürün sergileme arayüzüdür. Hiçbir arka plan (backend) teknolojisine ihtiyaç duymadan, belirtilen klasördeki resimleri otomatik olarak sayar ve ekrana yansıtır.

## Özellikler

- **Dinamik Görsel Yükleme:** Javascript, `images` klasöründeki fotoğrafları (`1.jpg`, `2.jpg`...) dener ve hata alana kadar (resimler bitene kadar) otomatik olarak ürün kartlarını oluşturur. Dosya sayısını manuel olarak girmenize gerek yoktur.
- **Duyarlı (Responsive) Tasarım:** Ekran boyutuna göre yan yana gösterilen ürün sayısı otomatik olarak ayarlanır (Masaüstünde 6, tablette 4/3, mobilde 2 ürün).
- **Akıllı Ok Butonları:** Slider'ın başına veya sonuna gelindiğinde yönlendirme okları otomatik olarak gizlenir/gösterilir. Oklar, görsellerin tam merkezine dikey olarak hizalanır.
- **Etkileşimli Beğeni Butonu:** Tıklandığında renk değiştiren ve hafifçe büyüyen (pop efekti) dinamik kalp butonları içerir.
- **Pürüzsüz Kaydırma (Smooth Scrolling):** Hem fare ile hem de ok butonları ile yumuşak bir kaydırma deneyimi sunar. (CSS `scroll-snap` kullanılarak hizalama desteklenir).

## Kurulum ve Kullanım

Projeyi çalıştırmak için herhangi bir sunucu kurmanıza (Node.js, PHP vb.) gerek yoktur. Sadece dosyaları doğru klasör yapısında organize etmeniz yeterlidir.

### 1. Klasör Yapısı
Proje dizininiz aşağıdaki gibi görünmelidir:

```text
proje-klasoru/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/           <-- Resimlerinizi bu klasöre koymalısınız
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    └── ...
```

### 2. Resim İsimlendirme Kuralı
Sistemin otomatik sayım yapabilmesi için `images/` klasörü içindeki resimlerin adları sırasıyla **1.jpg, 2.jpg, 3.jpg** şeklinde rakamlarla isimlendirilmelidir. 
*(Eğer farklı bir uzantı kullanmak isterseniz -örn: .png- `app.js` dosyasındaki uzantı bölümünü değiştirmeniz gerekir).*

### 3. Çalıştırma
Sadece `index.html` dosyasına çift tıklayarak varsayılan tarayıcınızda açmanız yeterlidir. JavaScript kodu otomatik olarak resimleri tarayacak ve slider'ı oluşturacaktır.

## Özelleştirme

- **Fiyat, Marka veya Başlıkları Değiştirmek:** `app.js` dosyası içindeki `const cardHTML = ...` yazan bölümdeki HTML şablonunu düzenleyerek kartların içindeki varsayılan metinleri değiştirebilirsiniz.
- **Klasör Adını Değiştirmek:** Eğer resimlerinizi farklı bir klasörde tutmak isterseniz, `app.js` dosyasındaki `const klasorYolu = "images/";` değişkenini yeni klasör yolunuzla güncelleyebilirsiniz.