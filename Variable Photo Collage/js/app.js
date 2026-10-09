document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('product-track');
    
    // --- 1. OTOMATİK KART OLUŞTURMA (HATA ALANA KADAR DENE YÖNTEMİ) ---
    
    const klasorYolu = "images/"; // Fotoğrafların klasörü (Örn: 'images/')
    
    function urunleriOtomatikYukle(yol) {
        if (!track) return;
        track.innerHTML = ""; // Önce içini temizle
        
        let i = 1; // 1.jpg'den başlıyoruz

        function siradakiResmiDene() {
            const imgUrl = `${yol}${i}.jpg`;
            const img = new Image(); // Sanal bir resim objesi oluşturuyoruz
            
            // Eğer resim klasörde VARSA bu blok çalışır:
            img.onload = function() {
                const cardHTML = `
                    <div class="product-card">
                        <div class="img-wrapper">
                            <img src="${imgUrl}" alt="Ürün ${i}"> 
                        </div>
                        <div class="brand-row">
                            <div class="brand">Marka Adı ${i}</div>
                            <button class="heart-btn">&#9825;</button> 
                        </div>
                        <div class="title">Örnek Ürün Başlığı ${i}</div>
                        <div class="price-row"><span class="discount">%20</span><span class="price">100,000</span></div>
                    </div>
                `;
                track.insertAdjacentHTML('beforeend', cardHTML); // Kartı ekle
                i++; // Sıradaki numaraya geç
                siradakiResmiDene(); // Fonksiyonu tekrar çağırıp bir sonrakini dene
            };
            
            // Eğer resim klasörde YOKSA (Klasördeki son resme ulaştıysak) bu blok çalışır:
            img.onerror = function() {
                console.log(`Arama bitti! Toplam ${i - 1} adet fotoğraf bulundu.`);
                // Resimlerin hepsi yüklendiği için butonları ve kalp özelliklerini şimdi aktifleştirebiliriz
                setTimeout(alignButtonsToImageCenter, 50); 
                kalpButonlariniAktifEt();
                updateButtonVisibility(); // Slider oklarını kontrol et
            };
            
            // Tetikleyici: Sanal resmin kaynağına adresi ver
            img.src = imgUrl; 
        }
        
        siradakiResmiDene(); // Döngüyü başlat
    }

    // Fonksiyonu çalıştır
    urunleriOtomatikYukle(klasorYolu);


    // --- 2. MEVCUT SLIDER VE OK BUTONU İŞLEMLERİ ---
    
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    let isButtonClicked = false; 
    let clickTimeout;

    function getScrollAmount() {
        const card = track.querySelector('.product-card');
        if (!card) return 0;
        const cardWidth = card.getBoundingClientRect().width; 
        const gap = 16; 
        return (cardWidth + gap) * 6; 
    }

    nextBtn.addEventListener('click', () => {
        const amount = getScrollAmount();
        isButtonClicked = true;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => { isButtonClicked = false; }, 600);

        track.scrollBy({ left: amount, behavior: 'smooth' });

        if (track.scrollLeft + amount + track.clientWidth >= track.scrollWidth - 10) {
            nextBtn.style.display = 'none'; 
        }
        prevBtn.style.display = 'flex';
    });

    prevBtn.addEventListener('click', () => {
        const amount = getScrollAmount();
        isButtonClicked = true;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => { isButtonClicked = false; }, 600);

        track.scrollBy({ left: -amount, behavior: 'smooth' });

        if (track.scrollLeft - amount <= 10) {
            prevBtn.style.display = 'none'; 
        }
        nextBtn.style.display = 'flex';
    });

    function alignButtonsToImageCenter() {
        const imgWrapper = track.querySelector('.img-wrapper');
        if (imgWrapper) {
            const imgHeight = imgWrapper.getBoundingClientRect().height;
            const centerPosition = 50 + (imgHeight / 2);
            prevBtn.style.top = `${centerPosition}px`;
            nextBtn.style.top = `${centerPosition}px`;
        }
    }

    window.addEventListener('load', alignButtonsToImageCenter);
    window.addEventListener('resize', alignButtonsToImageCenter);

    function updateButtonVisibility() {
        if (isButtonClicked) return; 

        if (track.scrollLeft <= 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }

        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
        }
    }

    track.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);

    // --- 3. KALP BUTONU FONKSİYONLARI ---
    // Resimler sonradan yüklendiği için kalp fonksiyonunu dışarı aldık ve resimler bitince çağırıyoruz
    function kalpButonlariniAktifEt() {
        const heartButtons = document.querySelectorAll('.heart-btn');

        heartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                btn.classList.toggle('liked');
                
                if (btn.classList.contains('liked')) {
                    btn.innerHTML = '&#9829;'; 
                } else {
                    btn.innerHTML = '&#9825;'; 
                    btn.style.transform = 'scale(1)'; 
                }
            });
        });
    }
});