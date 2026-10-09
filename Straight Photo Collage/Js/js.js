// js/js.js dosyası
document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('product-grid');
    
    if (gridContainer) { 
        let cardsHTML = '';

        // urunler listesindeki (data.js'den gelen) her bir eleman için döngü çalışır
        urunler.forEach(function(urun) {
            cardsHTML += `
            <div class="card">
                <div class="image-box">
                    <!-- urun.id değeri fotoğrafın ismini belirler (1.jpg, 2.jpg vb.) -->
                    <img src="image/${urun.id}.jpg" alt="${urun.marka}">   
                </div>
                <div class="text-box">
                    <div class="brand-row">
                        <span class="brand-name">${urun.marka}</span>
                    </div>
                    <p class="product-title">${urun.baslik}</p>
                    <p class="price"><strong>${urun.fiyat}</strong></p>
                </div>
            </div>
            `;
        });

        gridContainer.innerHTML = cardsHTML;
    } else {
        console.error("product-grid ID'sine sahip element bulunamadı!");
    }
});