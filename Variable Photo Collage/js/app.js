document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('product-track');
    const klasorYolu = "images/"; 

    // --- 1. DIŞARIDAKİ DOSYAYI OKUMA (FETCH) İŞLEMİ ---
    async function projeyiBaslat() {
        let urunBilgileri = [];
        try {
            // veri.json dosyasını bul ve oku
            const cevap = await fetch('veri.json');
            urunBilgileri = await cevap.json(); // Metni JavaScript'in anlayacağı listeye çevir
        } catch (hata) {
            console.warn("veri.json okunamadı. Yollar veya sunucu kaynaklı bir sorun olabilir.", hata);
        }

        // Dosya okunduktan sonra resimleri ve kartları oluşturmaya başla
        urunleriOtomatikYukle(klasorYolu, urunBilgileri);
    }

    // --- 2. OTOMATİK KART OLUŞTURMA ---
    function urunleriOtomatikYukle(yol, veriler) {
        if (!track) return;
        track.innerHTML = ""; 
        
        let i = 1; 

        function siradakiResmiDene() {
            const imgUrl = `${yol}${i}.jpg`;
            const img = new Image(); 
            
            img.onload = function() {
                // veri.json'daki sıraya göre yazıyı al. Eğer json'da eksik satır varsa varsayılanı kullan
                const bilgi = veriler[i - 1] || { 
                    marka: "Markasız", 
                    baslik: `Yeni Ürün ${i}`, 
                    indirim: "%0", 
                    fiyat: "0,000" 
                };

                const cardHTML = `
                    <div class="product-card">
                        <div class="img-wrapper">
                            <img src="${imgUrl}" alt="${bilgi.baslik}"> 
                        </div>
                        <div class="brand-row">
                            <div class="brand">${bilgi.marka}</div>
                            <button class="heart-btn">&#9825;</button> 
                        </div>
                        <div class="title">${bilgi.baslik}</div>
                        <div class="price-row"><span class="discount">${bilgi.indirim}</span><span class="price">${bilgi.fiyat}</span></div>
                    </div>
                `;
                
                track.insertAdjacentHTML('beforeend', cardHTML); 
                i++; 
                siradakiResmiDene(); 
            };
            
            img.onerror = function() {
                // Resimler bittiğinde kalan işlemleri yap
                setTimeout(alignButtonsToImageCenter, 50); 
                kalpButonlariniAktifEt();
                updateButtonVisibility(); 
            };
            
            img.src = imgUrl; 
        }
        
        siradakiResmiDene(); 
    }

    // Sistemi tetikliyoruz
    projeyiBaslat();


    // --- 3. MEVCUT SLIDER VE BUTON İŞLEMLERİ (Aynı Kalıyor) ---
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
        if (track.scrollLeft <= 0) prevBtn.style.display = 'none';
        else prevBtn.style.display = 'flex';
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) nextBtn.style.display = 'none';
        else nextBtn.style.display = 'flex';
    }

    track.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);

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
