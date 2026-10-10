const carouselVerileri = {
    baslik: "오늘의 발견 (Günün Keşfi)",
    dahaFazlaYazi: "더보기 (Daha Fazla)",
    dahaFazlaLink: "#",

    // Kategori Butonları (Klasör isimleriyle eşleşen 'id' değerleri çok önemli)
    kategoriler: [
        { id: "instagram", ad: "Instagram" },
        { id: "youtube", ad: "YouTube" },
        { id: "tiktok", ad: "TikTok" }
    ],

    // Platformlara göre kart yazıları
    kartlar: {
        instagram: [
            { etiket: "• IG Reels", baslik: "Instagram İçerik 1", altBaslik: "10/12(월)" },
            { etiket: "• IG Reels", baslik: "Instagram İçerik 2", altBaslik: "@티메이커" },
            { etiket: "• IG Reels", baslik: "Instagram İçerik 3", altBaslik: "" },
            { etiket: "• IG Reels", baslik: "Instagram İçerik 4", altBaslik: "Koleksiyon" },
            { etiket: "• IG Reels", baslik: "Instagram İçerik 5", altBaslik: "Ekstra" }
        ],
        youtube: [
            { etiket: "• YT Shorts", baslik: "YouTube Shorts 1", altBaslik: "Kanal Adı" },
            { etiket: "• YT Shorts", baslik: "YouTube Shorts 2", altBaslik: "Vlog" },
            { etiket: "• YT Shorts", baslik: "YouTube Shorts 3", altBaslik: "İnceleme" },
            { etiket: "• YT Shorts", baslik: "YouTube Shorts 4", altBaslik: "" }
        ],
        tiktok: [
            { etiket: "• TikTok", baslik: "TikTok Trend 1", altBaslik: "Dans" },
            { etiket: "• TikTok", baslik: "TikTok Trend 2", altBaslik: "Müzik" },
            { etiket: "• TikTok", baslik: "TikTok Trend 3", altBaslik: "Challenge" }
        ]
    }
};