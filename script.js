let cart = [];

const products = [
  { id: 1, name: "Royal Ivory Ensemble", price: 24500, img: "https://images.unsplash.com/photo-1585487000160-6eb1f3f3c3e3?w=800", desc: "Pure ivory with intricate zari work." },
  { id: 2, name: "Noir Majesty", price: 27500, img: "https://images.unsplash.com/photo-1591343395084-9c4c5c8b5c5c?w=800", desc: "Regal black with golden accents." },
  { id: 3, name: "Golden Heritage", price: 28900, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800", desc: "Luxurious gold embroidered masterpiece." },
  { id: 4, name: "Empress Rose", price: 23900, img: "https://images.unsplash.com/photo-1610030469984-7c2c3e8f0b0a?w=800", desc: "Soft rose with delicate detailing." },
  { id: 5, name: "Midnight Sapphire", price: 26500, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c?w=800", desc: "Deep blue royal ensemble." },
  { id: 6, name: "Pearl Elegance", price: 25500, img: "https://images.unsplash.com/photo-1610030469984-7c2c3e8f0b0a?w=800", desc: "Cream pearl with silver work." },
  { id: 7, name: "Crimson Royalty", price: 29500, img: "https://images.unsplash.com/photo-1591343395084-9c4c5c8b5c5c?w=800", desc: "Bold red for grand occasions." },
  { id: 8, name: "Emerald Dream", price: 27900, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800", desc: "Rich emerald green elegance." },
  { id: 9, name: "Champagne Luxe", price: 25900, img: "https://images.unsplash.com/photo-1585487000160-6eb1f3f3c3e3?w=800", desc: "Champagne gold shimmer." },
  { id: 10, name: "Imperial Black", price: 31500, img: "https://images.unsplash.com/photo-1591343395084-9c4c5c8b5c5c?w=800", desc: "Ultimate luxury black suit." }
];

function navigateTo(page) {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  document.getElementById(page).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts() {
  const container = document.getElementById('productGrid');
  container.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = `luxury-card rounded-3xl overflow-hidden cursor-pointer glass`;
    card.innerHTML = `
      <div class="overflow-hidden">
        <img src="${product.img}" class="product-img w-full h-96 object-cover">
      </div>
      <div class="p-6">
        <h3 class="heading text-2xl text-[#5C3A21]">${product.name}</h3>
        <p class="text-[#C6A76A] text-xl font-medium mt-2">PKR ${product.price.toLocaleString()}</p>
        <button onclick="addToCart(${product.id}); event.stopImmediatePropagation()" 
          class="mt-5 w-full py-4 border border-[#C6A76A] hover:bg-[#C6A76A] hover:text-black transition-all text-sm tracking-widest">
          ADD TO CART
        </button>
      </div>
    `;
    card.onclick = () => showProductModal(product);
    container.appendChild(card);
  });
}

function showProductModal(product) {
  document.getElementById('modalContent').innerHTML = `
    <div class="grid md:grid-cols-2 gap-8 p-8">
      <div><img src="${product.img}" class="w-full rounded-2xl shadow-xl"></div>
      <div>
        <h2 class="heading text-4xl text-[#5C3A21]">${product.name}</h2>
        <p class="text-3xl text-[#C6A76A] mt-4">PKR ${product.price.toLocaleString()}</p>
        <p class="mt-6 text-gray-600">${product.desc}</p>
        
        <div class="mt-8 flex gap-4">
          <button onclick="addToCart(${product.id}); closeModal()" 
            class="flex-1 py-6 bg-[#5C3A21] text-white hover:bg-[#C6A76A] hover:text-black transition-all">ADD TO CART</button>
          <button onclick="closeModal()" 
            class="flex-1 py-6 border-2 border-[#C6A76A] text-[#C6A76A] hover:bg-[#C6A76A] hover:text-black">BUY NOW</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('productModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('productModal').classList.add('hidden');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cartCount').textContent = cart.length;
  
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed; bottom:30px; right:30px; background:#C6A76A; color:#111; padding:18px 32px; border-radius:9999px; z-index:9999;`;
  toast.textContent = `${product.name} added to cart`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function toggleCart() {
  alert("🛍️ Full Cart Coming Soon");
}

// Initialize
window.onload = () => {
  renderProducts();
  document.getElementById('home').style.display = 'flex';
  
  // Hero Animation
  gsap.from("#mainTitle", { y: 50, opacity: 0, duration: 1.2 });
  gsap.from("#legacy", { y: 60, opacity: 0, duration: 1.4, delay: 0.3 });
};
