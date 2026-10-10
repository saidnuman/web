document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ana-baslik').textContent = carouselVerileri.baslik;
    const dahaFazlaBtn = document.getElementById('daha-fazla-btn');
    dahaFazlaBtn.textContent = carouselVerileri.dahaFazlaYazi;
    dahaFazlaBtn.href = carouselVerileri.dahaFazlaLink;

    const kategoriContainer = document.getElementById('kategori-container');
    const track = document.getElementById('track');
    
    // Global Carousel Değişkenleri (Temizleme ve sıfırlama işlemleri için)
    let playSequenceTimeout = null;
    let activeVideoIndexInGroup = 0; 
    let currentPage = 0;
    let currentFetchId = 0; // Hızlı buton tıklamalarında karışıklığı önlemek için

    // 1. Kategorileri Oluştur
    if (carouselVerileri.kategoriler && carouselVerileri.kategoriler.length > 0) {
        carouselVerileri.kategoriler.forEach((kategori, index) => {
            const btn = document.createElement('div');
            btn.className = `category-tab ${index === 0 ? 'active' : ''}`; 
            btn.textContent = kategori.ad;
            
            btn.addEventListener('click', () => {
                // Eğer zaten aktif olan sekmeye tıklandıysa hiçbir şey yapma
                if (btn.classList.contains('active')) return;

                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                
                // Tıklanan platformun id'sine göre videoları getir
                loadVideosDynamically(kategori.id);
            });
            
            kategoriContainer.appendChild(btn);
        });

        // Sayfa ilk açıldığında ilk kategorinin videolarını yükle
        loadVideosDynamically(carouselVerileri.kategoriler[0].id);
    }

    // Tüm videoları ve zamanlayıcıyı durduran yardımcı fonksiyon
    function stopAllVideos() {
        clearTimeout(playSequenceTimeout);
        document.querySelectorAll('.card').forEach(card => {
            const vid = card.querySelector('video');
            if (vid) {
                vid.pause();
                vid.currentTime = 0;
            }
            card.classList.remove('is-playing');
        });
    }

    // 2. Videoları Dinamik Olarak Klasörden Çekme
    async function loadVideosDynamically(platformId) {
        currentFetchId++; 
        const myFetchId = currentFetchId; 
        
        // YENİ EKLENEN KISIM: İçi boşaldığında sayfanın zıplamasını engellemek için yüksekliği sabitle!
        const wrapper = document.querySelector('.carousel-wrapper');
        if (wrapper.offsetHeight > 0) {
            wrapper.style.minHeight = wrapper.offsetHeight + 'px';
        }

        stopAllVideos(); 
        
        track.style.transition = 'none'; 
        track.style.transform = `translateX(0px)`; 
        track.innerHTML = ''; 
        currentPage = 0;
        
        void track.offsetWidth; 
        track.style.transition = 'transform 0.5s ease-in-out';
        
        const folderName = `videos/${platformId}`;
        let videoIndex = 1;
        let hasMore = true;

        while (hasMore) {
            if (myFetchId !== currentFetchId) return; 

            const videoUrl = `${folderName}/${videoIndex}.mp4`;
            
            try {
                const response = await fetch(videoUrl, { method: 'HEAD' });
                
                if (response.ok) {
                    const platformVerileri = carouselVerileri.kartlar[platformId] || [];
                    const kartVerisi = platformVerileri[videoIndex - 1] || { 
                        etiket: "• Video", 
                        baslik: `İçerik ${videoIndex}`, 
                        altBaslik: "" 
                    };

                    createCardHTML(videoUrl, kartVerisi);
                    videoIndex++;
                } else {
                    hasMore = false; 
                }
            } catch (error) {
                hasMore = false;
            }
        }
        
        if (myFetchId === currentFetchId) {
            initCarousel();
            // Yeni videolar başarıyla yüklendikten sonra yükseklik kilidini kaldır
            wrapper.style.minHeight = ''; 
        }
    }

    // 3. HTML içine Video Kartı Ekleme
    function createCardHTML(src, veri) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const altBaslikHTML = veri.altBaslik ? `<p>${veri.altBaslik}</p>` : '';

        card.innerHTML = `
            <video src="${src}" muted loop playsinline preload="metadata"></video>
            <div class="badge">${veri.etiket}</div>
            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
            <div class="card-info">
                <h3>${veri.baslik}</h3>
                ${altBaslikHTML}
            </div>
        `;
        
        track.appendChild(card);
    }

    // 4. Carousel (Kaydırma ve 5 Sn Oynatma) Mekanizması
    function initCarousel() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const paginationText = document.getElementById('pagination');
        const cards = document.querySelectorAll('.card');

        if (cards.length === 0) {
            track.innerHTML = '<p style="color:#888; padding:20px;">Bu kategoriye ait video bulunamadı.</p>';
            paginationText.textContent = "0 / 0";
            return;
        }
        
        function getItemsPerView() {
            if (window.innerWidth <= 450) return 1;
            if (window.innerWidth <= 600) return 2;
            if (window.innerWidth <= 900) return 3;
            return 4;
        }

        let itemsPerView = getItemsPerView();
        let totalItems = cards.length;
        let totalPages = Math.ceil(totalItems / itemsPerView);
        let maxIndex = Math.max(0, totalItems - itemsPerView);

        function startGroupSequence() {
            stopAllVideos(); 

            let startIndex = currentPage * itemsPerView;
            if (startIndex > maxIndex) {
                startIndex = maxIndex;
            }

            const itemsInThisPage = Math.min(itemsPerView, totalItems);
            if (itemsInThisPage <= 0) return;

            const activeCardIndex = startIndex + activeVideoIndexInGroup;
            const activeCard = cards[activeCardIndex];

            if (activeCard) {
                const vid = activeCard.querySelector('video');
                
                activeCard.classList.add('is-playing'); 
                if (vid) {
                    let playPromise = vid.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {});
                    }
                }

                playSequenceTimeout = setTimeout(() => {
                    activeVideoIndexInGroup++;
                    
                    if (activeVideoIndexInGroup >= itemsInThisPage) {
                        activeVideoIndexInGroup = 0; 
                    }
                    
                    startGroupSequence(); 
                }, 5000); 
            }
        }

        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth;
            const gap = 20; 
            
            let targetIndex = currentPage * itemsPerView;
            if (targetIndex > maxIndex) targetIndex = maxIndex;

            const moveAmount = (cardWidth + gap) * targetIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;

            paginationText.textContent = `${currentPage + 1} / ${totalPages || 1}`;

            prevBtn.disabled = currentPage === 0;
            nextBtn.disabled = currentPage >= totalPages - 1;

            activeVideoIndexInGroup = 0;
            startGroupSequence();
        }

        // Tıklama eventlerini temizleyip yeniden atamak için onclick kullanıyoruz
        nextBtn.onclick = () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateCarousel();
            }
        };

        prevBtn.onclick = () => {
            if (currentPage > 0) {
                currentPage--;
                updateCarousel();
            }
        };

        window.onresize = () => {
            itemsPerView = getItemsPerView();
            totalPages = Math.ceil(totalItems / itemsPerView);
            maxIndex = Math.max(0, totalItems - itemsPerView);
            
            if (currentPage >= totalPages) {
                currentPage = Math.max(0, totalPages - 1);
            }
            updateCarousel();
        };

        updateCarousel();
    }
});