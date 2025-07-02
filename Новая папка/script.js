document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const gallery = document.getElementById('gallery');
    const categoriesContainer = document.getElementById('categories');
    const searchInput = document.getElementById('search');
    const sortDefaultBtn = document.getElementById('sort-default');
    const sortRatingBtn = document.getElementById('sort-rating');
    const countSpan = document.getElementById('count');
    const avgSpan = document.getElementById('avg');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    
const images = [
    {
        id: 1,
        title: "Горный закат",
        category: "Природа",
        rating: 4.7,
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Ночной город",
        category: "Города",
        rating: 4.5,
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Лесной водопад",
        category: "Природа",
        rating: 4.9,
        url: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Современная архитектура",
        category: "Города",
        rating: 4.2,
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Океанские волны",
        category: "Природа",
        rating: 4.8,
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Уличное кафе",
        category: "Города",
        rating: 3.9,
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        title: "Пустынный пейзаж",
        category: "Природа",
        rating: 4.3,
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        title: "Городской мост",
        category: "Города",
        rating: 4.1,
        url: "https://images.unsplash.com/photo-1500316124030-4cffa46f10f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
];
    
    let currentImages = [];
    let currentSort = 'default';
    let currentCategory = 'all';
    
   
    function init() {
        renderCategories();
        filterAndRender();
        setupEventListeners();
    }
    
  
    function renderCategories() {
        const categories = ['all', ...new Set(images.map(img => img.category))];
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            if (cat === 'all') btn.classList.add('active');
            btn.textContent = cat === 'all' ? 'Все' : cat;
            btn.dataset.category = cat;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = cat;
                filterAndRender();
            });
            categoriesContainer.appendChild(btn);
        });
    }
    
    function filterAndRender() {

        let filtered = currentCategory === 'all' 
            ? [...images] 
            : images.filter(img => img.category === currentCategory);
        

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(img => 
                img.title.toLowerCase().includes(searchTerm) || 
                img.category.toLowerCase().includes(searchTerm)
            );
        }
        

        if (currentSort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else {
            filtered.sort((a, b) => a.id - b.id);
        }
        
        currentImages = filtered;
        renderGallery();
        updateStats();
    }
    

    function renderGallery() {
        gallery.innerHTML = '';
        
        if (currentImages.length === 0) {
            gallery.innerHTML = '<div class="empty">Изображения не найдены</div>';
            return;
        }
        
        currentImages.forEach(img => {
            const card = document.createElement('div');
            card.className = 'image-card';
            card.innerHTML = `
                <img src="${img.url}" alt="${img.title}">
                <div class="image-info">
                    <div class="image-title">${img.title}</div>
                    <div class="image-meta">
                        <span class="category-badge">${img.category}</span>
                        <div class="rating">
                            ${img.rating.toFixed(1)}
                            <div class="stars">${getStars(img.rating)}</div>
                        </div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openModal(img));
            gallery.appendChild(card);
        });
    }
    

    function getStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        return '★'.repeat(fullStars) + '☆'.repeat(halfStar) + '☆'.repeat(emptyStars);
    }
    
    function updateStats() {
        countSpan.textContent = currentImages.length;
        const avg = currentImages.length > 0 
            ? currentImages.reduce((sum, img) => sum + img.rating, 0) / currentImages.length 
            : 0;
        avgSpan.textContent = avg.toFixed(1);
    }
    
    function openModal(image) {
        document.getElementById('modal-title').textContent = image.title;
        document.getElementById('modal-image').src = image.url;
        document.getElementById('modal-category').textContent = image.category;
        document.getElementById('modal-rating').textContent = image.rating.toFixed(1);
        document.getElementById('modal-stars').innerHTML = getStars(image.rating);
        document.getElementById('modal-url').href = image.url;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function setupEventListeners() {
    
        searchInput.addEventListener('input', debounce(filterAndRender, 300));
        
 
        sortDefaultBtn.addEventListener('click', () => {
            currentSort = 'default';
            sortDefaultBtn.classList.add('active');
            sortRatingBtn.classList.remove('active');
            filterAndRender();
        });
        
        sortRatingBtn.addEventListener('click', () => {
            currentSort = 'rating';
            sortRatingBtn.classList.add('active');
            sortDefaultBtn.classList.remove('active');
            filterAndRender();
        });
        
    
        closeModal.addEventListener('click', closeModalHandler);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModalHandler();
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    

    init();
});