document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HTML Elemanlarını Yakala
    const bigImage = document.getElementById('main-big-img');
    const smallImages = document.querySelectorAll('.small-grid-img');
    const dynamicTitle = document.getElementById('dynamic-grid-title');
    const dynamicSubtitle = document.getElementById('dynamic-grid-subtitle');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const pageCount = document.querySelector('.page-count');
    const slidingArea = document.getElementById('sliding-area'); 

    // --- SİSTEM AYARLARI ---
    const anaKlasor = "ek1_image/bolum_1/"; 
    const uzanti = ".jpg"; 
    
    // Dışarıdaki data.js dosyasından verileri alıyoruz (Dosya yoksa boş dizi ata)
    const pageData = typeof sliderVerileri !== 'undefined' ? sliderVerileri : [];

    let totalPages = 0; 
    let currentPage = 0; 
    let isAnimating = false; 

    const dummyImg = "https://dummyimage.com/600x800/f5f5f5/ccc&text=YAKINDA";
    bigImage.onerror = function() { this.src = dummyImg; };
    smallImages.forEach(img => { img.onerror = function() { this.src = dummyImg; }; });

    // ========================================================
    // OTOMATİK KLASÖR SAYMA MOTORU
    // ========================================================
    function klasorSayisiniBul(index) {
        const testImg = new Image();
        
        testImg.onload = function() {
            klasorSayisiniBul(index + 1);
        };
        
        testImg.onerror = function() {
            totalPages = index - 1; 
            
            if (totalPages > 0) {
                slideriBaslat(); 
            } else {
                if (slidingArea) slidingArea.innerHTML = "<h3 style='text-align:center; width:100%; margin:50px 0;'>Fotoğraf bulunamadı. Lütfen klasörleri kontrol edin.</h3>";
                if (pageCount) pageCount.textContent = "0 / 0";
            }
        };
        
        testImg.src = `${anaKlasor}${index}/1${uzanti}`; 
    }

    // ========================================================
    // SLIDER SİSTEMİNİ BAŞLATMA VE YÖNETME
    // ========================================================
    function slideriBaslat() {
        updatePagination();
        resimleriGuncelle(); 

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                if(currentPage < totalPages - 1 && !isAnimating) {
                    currentPage++; 
                    sayfaDegistir('next');
                }
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                if(currentPage > 0 && !isAnimating) {
                    currentPage--; 
                    sayfaDegistir('prev');
                }
            });
        }
    }

    function updatePagination() {
        if (pageCount) pageCount.textContent = (currentPage + 1) + " / " + totalPages;
        if (prevBtn) prevBtn.disabled = (currentPage === 0);
        if (nextBtn) nextBtn.disabled = (currentPage === totalPages - 1);
    }

    function resimleriGuncelle() {
        const klasorNo = currentPage + 1;
        
        bigImage.src = `${anaKlasor}${klasorNo}/1${uzanti}`;
        smallImages[0].src = `${anaKlasor}${klasorNo}/2${uzanti}`;
        smallImages[1].src = `${anaKlasor}${klasorNo}/3${uzanti}`;
        smallImages[2].src = `${anaKlasor}${klasorNo}/4${uzanti}`;

        // Veri dosyasından ilgili klasörün başlıklarını çek
        if (pageData[currentPage]) {
            dynamicTitle.textContent = pageData[currentPage].title;
            dynamicSubtitle.textContent = pageData[currentPage].subtitle;
        } else {
            dynamicTitle.textContent = `Koleksiyon ${klasorNo}`;
            dynamicSubtitle.textContent = "Detaylar Hazırlanıyor";
        }
    }

    function sayfaDegistir(direction) {
        isAnimating = true; 
        const outClass = direction === 'next' ? 'grup-kaybol-sol' : 'grup-kaybol-sag';
        const inClass = direction === 'next' ? 'grup-gel-sag' : 'grup-gel-sol';

        slidingArea.classList.add(outClass);

        setTimeout(() => {
            resimleriGuncelle();
            updatePagination();

            slidingArea.classList.remove(outClass);
            slidingArea.classList.add(inClass);

            setTimeout(() => {
                slidingArea.classList.remove(inClass);
                isAnimating = false;
            }, 300);
        }, 300); 
    }

    // Sistemi ateşle
    klasorSayisiniBul(1);
});