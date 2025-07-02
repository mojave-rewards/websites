document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Minecraft Legends ', points: 30, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4v2s.webp' },
        { id: 2, name: 'Wolfenstein the Old Blood', points: 30, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co21et.webp' },
        { id: 3, name: 'Fallout 76 Xbox One', points: 30, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1yc4.webp' },
        { id: 4, name: 'Assassin\'s Creed Unity Xbox One', points: 30, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xiq.webp' },
        { id: 5, name: 'Apple Music 1 Month', points: 30, category: 'services', type: 'key', image: 'https://www.apple.com/newsroom/images/product/apple-music/apple_music-update_hero_08242021.jpg.news_app_ed.jpg' },
        { id: 7, name: 'Battlefield Hardline', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nmg.webp' },
        { id: 8, name: 'Battlefield 1 Revolution', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2n9d.webp' },
        { id: 10, name: 'Battlefield V', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xbv.webp' },
        { id: 9, name: 'Wolfstein the New Collosus Deluxe', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co21c5.webp' },
        { id: 11, name: 'Sonic Mania', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1obi.webp' },
        { id: 12, name: 'Dead Island Definitive Edition', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6o7n.webp' },
        { id: 13, name: 'MXGP3', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3pia.webp' },
        { id: 14, name: 'Dragon Ball The Breakers', points: 50, category: 'games', type: 'key', image: 'https://cdn.cdkeys.com/496x700/media/catalog/product/s/a/samurai-maiden-ann-official_08-03-22_1__1.jpg' },
        { id: 15, name: 'Bleeding Edge Xbox Windows 10', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xak.webp' },
        { id: 16, name: 'Killing Floor 2', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2coc.webp' },
        { id: 17, name: 'Plants vs Zombies GW2', points: 50, category: 'games', type: 'key', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3xur.webp' },
        { id: 18, name: 'Mortal Kombat 11 (XBOX SERIES S/X ONLY)', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co20mh.webp' },
        { id: 23, name: 'Steep', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2jpb.webp' },
        { id: 20, name: 'Terraria', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbo.webp' },
        { id: 21, name: 'Five Nights at Freddys 1-4', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co68yd.webp' },
        { id: 22, name: '7 Days to Die', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co49r0.webp' },
        { id: 19, name: 'Raft (XBOX SERIES S/X ONLY)', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xdc.webp' },
        { id: 24, name: 'Cuphead & The Delicious Last Course Bundle', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co9kwv.webp' },
        { id: 25, name: 'Crash Bandicoot N. Sane Trilogy', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v62.webp' },
        { id: 26, name: 'Skate 3', points: 50, category: 'games', type: 'account', image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1o4l.webp' },
        { id: 27, name: 'Apple Music 2 Months', points: 50, category: 'services', type: 'key', image: 'https://www.apple.com/newsroom/images/product/apple-music/apple_music-update_hero_08242021.jpg.news_app_ed.jpg' },
        { id: 6, name: 'Apple Arcade 2 Months', points: 50, category: 'services', type: 'key', image: 'https://images.g2a.com/300x400/1x1x1/apple-arcade-membership-3-months-apple-key-united-states-i10000500509002/83fdd6d7c29642a9bafdcbcd' }
    ];

    const productGrid = document.getElementById('product-grid');
    const navButtons = document.querySelectorAll('.nav-btn');
    const sortSelect = document.getElementById('sort-by');

    let currentFilter = 'all';
    let currentSort = 'default';

    function renderProducts() {
        productGrid.innerHTML = '';

        let filteredProducts = products;
        if (currentFilter !== 'all') {
            filteredProducts = products.filter(p => p.category === currentFilter);
        }

        let sortedProducts = [...filteredProducts];
        if (currentSort === 'points-asc') {
            sortedProducts.sort((a, b) => a.points - b.points);
        } else if (currentSort === 'points-desc') {
            sortedProducts.sort((a, b) => b.points - a.points);
        }

        sortedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <div class="product-meta">
                        <div class="product-points">${product.points} Points</div>
                        <div class="product-type type-${product.type}">${product.type}</div>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.category;
            renderProducts();
        });
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Initial render
    renderProducts();
});
