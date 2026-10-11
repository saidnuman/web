document.addEventListener("DOMContentLoaded", function() {
    // 1. Yılı Güncelleme
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // siteVerileri değişkeni veri.js'den başarıyla yüklendiyse işlemleri yap
    if (typeof siteVerileri !== "undefined") {
        
        // 2. Paragrafları (Açıklama Kısmını) Yazdırma
        const footerTextContainer = document.getElementById("footer-text-container");
        if (footerTextContainer) {
            // Dizideki cümleleri aralarına <br> (alt satıra geçme) koyarak birleştiriyoruz
            footerTextContainer.innerHTML = siteVerileri.footerAciklama.join("<br>");
        }

        // 3. Sosyal Medya Linklerini Oluşturma
        const socialLinksContainer = document.getElementById("social-links-container");
        if (socialLinksContainer) {
            siteVerileri.sosyalMedya.forEach(item => {
                // List item (li) oluştur
                const li = document.createElement("li");
                
                // Link (a) oluştur
                const a = document.createElement("a");
                a.href = item.url;
                a.target = "_blank"; // Tıklanınca yeni sekmede açılması için
                a.rel = "noopener noreferrer"; // Yeni sekmede açılırken güvenlik sağlaması için
                
                // İkonu ve ismi linkin içine ekle
                a.innerHTML = `${item.ikon} <span>${item.isim}</span>`;
                
                // Linki listeye, listeyi de HTML konteynerine ekle
                li.appendChild(a);
                socialLinksContainer.appendChild(li);
            });
        }
    }
});