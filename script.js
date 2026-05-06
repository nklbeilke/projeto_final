// ===== CALOPSITE - script.js =====

// ===== STATE =====
const state = {
  cart: [],
  currentPage: 'home',
  currentCategory: null,
  currentSubcategory: null,
  carouselIndex: 0,
  carouselTimer: null,
};

// ===== PRODUCTS DATA =====
const products = {
  cachorro: {
    racao: [
      { id: 1, name: 'Ração Special para Cães Adultos Sabor Frango..', price: 176.90, icon: '🐕', cat: 'cachorro', sub: 'racao' },
      { id: 2, name: 'Ração para Cães Filhotes de Porte Grande Sabor..', price: 274.90, icon: '🦮', cat: 'cachorro', sub: 'racao' },
      { id: 5, name: 'Ração Premium para Cães Adultos de Raças Médias..', price: 259.90, icon: '🐩', cat: 'cachorro', sub: 'racao' },
      { id: 6, name: 'Ração Sênior para Cães Grandes Sabor Carne..', price: 189.90, icon: '🐶', cat: 'cachorro', sub: 'racao' },
      { id: 7, name: 'Ração Standart para Cães de Todas as Raças...', price: 89.90, icon: '🐕‍🦺', cat: 'cachorro', sub: 'racao' },
      { id: 8, name: 'Ração High Premium Sabor Salmão para Cães...', price: 310.00, icon: '🦴', cat: 'cachorro', sub: 'racao' },
    ],
    petiscos: [
      { id: 9, name: 'Petisco Ossinho de Nylon para Cães Filhotes', price: 18.90, icon: '🦴', cat: 'cachorro', sub: 'petiscos' },
      { id: 10, name: 'Biscoito Natural Frango e Aveia para Cães', price: 24.50, icon: '🐾', cat: 'cachorro', sub: 'petiscos' },
    ],
    brinquedos: [
      { id: 11, name: 'Brinquedo Kit Bola de Tênis e Osso para Cães', price: 26.90, icon: '🎾', cat: 'cachorro', sub: 'brinquedos' },
      { id: 12, name: 'Brinquedo Corda com Bola Colorida para Cães', price: 14.90, icon: '🪢', cat: 'cachorro', sub: 'brinquedos' },
      { id: 13, name: 'Brinquedo Kit de Bolas para Cães', price: 9.90, icon: '⚽', cat: 'cachorro', sub: 'brinquedos' },
      { id: 14, name: 'Brinquedo Corda Infinito com Bola para Cães', price: 24.99, icon: '🔮', cat: 'cachorro', sub: 'brinquedos' },
      { id: 15, name: 'Brinquedo Mordedor de Borracha para Cães', price: 19.90, icon: '🦷', cat: 'cachorro', sub: 'brinquedos' },
      { id: 16, name: 'Brinquedo Pelúcia Ovelha para Cães', price: 34.90, icon: '🐑', cat: 'cachorro', sub: 'brinquedos' },
      { id: 17, name: 'Brinquedo Kong Recheável para Cães', price: 42.00, icon: '🏈', cat: 'cachorro', sub: 'brinquedos' },
      { id: 18, name: 'Brinquedo Puxador Duplo para Cães', price: 17.50, icon: '🎀', cat: 'cachorro', sub: 'brinquedos' },
    ],
    coleiras: [
      { id: 19, name: 'Coleira Ajustável para Cães Porte Médio', price: 35.90, icon: '📿', cat: 'cachorro', sub: 'coleiras' },
      { id: 20, name: 'Guia Retrátil 5m para Cães até 30kg', price: 68.00, icon: '🔗', cat: 'cachorro', sub: 'coleiras' },
    ],
    limpeza: [
      { id: 21, name: 'Shampoo Antipulgas para Cães 500ml', price: 29.90, icon: '🧴', cat: 'cachorro', sub: 'limpeza' },
      { id: 22, name: 'Lenço Umedecido para Cães 40un', price: 12.90, icon: '🧻', cat: 'cachorro', sub: 'limpeza' },
    ],
    camas: [
      { id: 23, name: 'Cama Redonda Premium para Cães Porte Grande', price: 149.90, icon: '🛏️', cat: 'cachorro', sub: 'camas' },
      { id: 24, name: 'Cobertor Soft para Cães e Gatos', price: 49.90, icon: '🧸', cat: 'cachorro', sub: 'camas' },
    ],
  },
  gato: {
    racao: [
      { id: 3, name: 'Ração Úmida Sachê para Gatos com Excesso de pe..', price: 16.90, icon: '🐱', cat: 'gato', sub: 'racao' },
      { id: 25, name: 'Ração Premium para Gatos Adultos Sabor Atum', price: 88.90, icon: '🐈', cat: 'gato', sub: 'racao' },
      { id: 26, name: 'Ração para Gatos Filhotes Sabor Frango', price: 72.00, icon: '🐾', cat: 'gato', sub: 'racao' },
    ],
    brinquedos: [
      { id: 27, name: 'Brinquedo Varinha com Penas e Guizo para Gatos', price: 6.99, icon: '🪄', cat: 'gato', sub: 'brinquedos' },
      { id: 28, name: 'Arranhador Torre com Bolinha para Gatos', price: 54.90, icon: '🗼', cat: 'gato', sub: 'brinquedos' },
    ],
  },
  aves: {
    racao: [
      { id: 29, name: 'Mistura de Sementes para Calopsita 500g', price: 19.90, icon: '🦜', cat: 'aves', sub: 'racao' },
      { id: 30, name: 'Ração Extrusada para Papagaios 1kg', price: 42.00, icon: '🐦', cat: 'aves', sub: 'racao' },
    ],
    brinquedos: [
      { id: 31, name: 'Brinquedo Balanço com Espelho para Aves', price: 15.90, icon: '🪞', cat: 'aves', sub: 'brinquedos' },
    ],
  },
};

const subcategoryLabels = {
  racao: 'Ração',
  petiscos: 'Petiscos e Ossos',
  brinquedos: 'Brinquedos',
  coleiras: 'Coleiras, Guias, Peitorais',
  limpeza: 'Limpeza',
  camas: 'Camas e Cobertores',
};

// Sidebar filters by subcategory
const filtersBySubcat = {
  racao: { Linha: ['Super Premium', 'Premium', 'Prescrita', 'Premium Especial', 'High Premium', 'Standart'], Idade: ['Filhote', 'Adulto', 'Sênior'] },
  petiscos: { Tipo: ['Natural', 'Industrializado', 'Dental'], Sabor: ['Frango', 'Carne', 'Peixe'] },
  brinquedos: { Tipo: ['Morder e Roer', 'Pelúcia', 'Rechear', 'Jogar e Pegar', 'Puxar', 'Acessórios'], Idade: ['Filhote', 'Adulto', 'Sênior'] },
  coleiras: { Material: ['Couro', 'Nylon', 'Elástico'], Porte: ['Pequeno', 'Médio', 'Grande'] },
  limpeza: { Tipo: ['Shampoo', 'Condicionador', 'Lenços', 'Higiene Bucal'], Aplicação: ['Pelo', 'Orelha', 'Olho'] },
  camas: { Tamanho: ['P', 'M', 'G', 'GG'], Material: ['Pelúcia', 'Tecido', 'Oxford'] },
};

// ===== DOM HELPERS =====
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function show(el) { el && el.classList.add('active'); }
function hide(el) { el && el.classList.remove('active'); }

// ===== NAVIGATION =====
function navigateTo(page, category, subcategory) {
  state.currentPage = page;
  state.currentCategory = category || null;
  state.currentSubcategory = subcategory || null;

  $$('.page').forEach(p => p.classList.remove('active'));
  const target = $(`#page-${page}`);
  if (target) target.classList.add('active');

  // Show/hide main nav header
  const mainHeader = $('#main-header');
  const mainNav = $('#main-nav');
  const checkoutHeader = $('#checkout-header');
  const mainBanner = $('#main-banner');
  const checkoutBanner = $('#checkout-banner');

  if (page === 'home' || page === 'listing' || page === 'contact') {
    mainHeader && (mainHeader.style.display = '');
    mainNav && (mainNav.style.display = '');
    checkoutHeader && (checkoutHeader.style.display = 'none');
    mainBanner && (mainBanner.style.display = '');
    checkoutBanner && (checkoutBanner.style.display = 'none');
  } else if (page === 'cart' || page === 'checkout' || page === 'login' || page === 'register') {
    mainHeader && (mainHeader.style.display = 'none');
    mainNav && (mainNav.style.display = 'none');
    checkoutHeader && (checkoutHeader.style.display = '');
    mainBanner && (mainBanner.style.display = 'none');
    if (page === 'login' || page === 'register') {
      checkoutHeader.style.display = '';
      checkoutBanner && (checkoutBanner.style.display = 'none');
    } else {
      checkoutBanner && (checkoutBanner.style.display = '');
    }
  }

  if (page === 'listing') renderListing(category, subcategory);
  if (page === 'cart') renderCartPage();
  if (page === 'checkout') renderCheckoutPage();

  window.scrollTo(0, 0);
}

// ===== CAROUSEL =====
function initCarousel() {
  const slides = $$('.carousel-slide');
  const dots = $$('.carousel-dots .dot');
  const total = slides.length;

  function goTo(i) {
    state.carouselIndex = (i + total) % total;
    const track = $('.carousel-slides');
    if (track) track.style.transform = `translateX(-${state.carouselIndex * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === state.carouselIndex));
  }

  $('.carousel-btn.prev')?.addEventListener('click', () => { goTo(state.carouselIndex - 1); resetTimer(); });
  $('.carousel-btn.next')?.addEventListener('click', () => { goTo(state.carouselIndex + 1); resetTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetTimer(); }));

  function resetTimer() {
    clearInterval(state.carouselTimer);
    state.carouselTimer = setInterval(() => goTo(state.carouselIndex + 1), 4000);
  }

  goTo(0);
  resetTimer();
}

// ===== LISTING RENDER =====
function getProductsForCategorySubcat(cat, sub) {
  if (!cat) return [];
  const catData = products[cat];
  if (!catData) return [];
  if (sub && catData[sub]) return catData[sub];
  // Return all subcategories
  return Object.values(catData).flat();
}

function renderListing(cat, sub) {
  const page = $('#page-listing');
  if (!page) return;

  const catData = products[cat] || {};
  const subs = Object.keys(catData);
  const currentSub = sub || subs[0];
  const prods = getProductsForCategorySubcat(cat, currentSub);
  const filters = filtersBySubcat[currentSub] || {};
  const subLabel = subcategoryLabels[currentSub] || currentSub;

  // Build sidebar category links
  const sidebarCatHTML = subs.map(s =>
    `<li class="${s === currentSub ? 'active' : ''}" onclick="navigateTo('listing','${cat}','${s}')">${subcategoryLabels[s] || s}</li>`
  ).join('');

  // Build filter groups
  let filterHTML = '';
  for (const [groupName, options] of Object.entries(filters)) {
    filterHTML += `<div class="filter-section">
      <h4>${groupName}</h4>
      ${options.map(o => `<label><input type="checkbox"> ${o}</label>`).join('')}
    </div>`;
  }

  // Build product cards
  const productHTML = prods.map(p => `
    <div class="product-card" onclick="addToCart(${p.id})">
      <div style="font-size:72px;text-align:center;margin-bottom:12px;line-height:1">${p.icon}</div>
      <h4>${p.name}</h4>
      <div class="price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
    </div>
  `).join('');

  page.innerHTML = `
    <div class="listing-layout">
      <aside class="sidebar">
        <h3>Categorias</h3>
        <ul class="sidebar-cats">${sidebarCatHTML}</ul>
        ${filterHTML}
      </aside>
      <div class="product-area">
        <div class="product-header">
          <h2>${subLabel}</h2>
          <div class="sort-wrap">
            Ordenar por:
            <select>
              <option>Maior relevância</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Mais vendidos</option>
            </select>
          </div>
        </div>
        <div class="all-items">Todos os itens</div>
        <div class="product-grid">${productHTML}</div>
      </div>
    </div>
  `;
}

// ===== CART =====
function findProduct(id) {
  for (const cat of Object.values(products)) {
    for (const subs of Object.values(cat)) {
      const found = subs.find(p => p.id === id);
      if (found) return found;
    }
  }
  return null;
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  updateCartBadge();
  showCartPanel();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  updateCartBadge();
  renderCartSidebar();
  if (state.currentPage === 'cart') renderCartPage();
}

function updateQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  renderCartSidebar();
  if (state.currentPage === 'cart') renderCartPage();
}

function updateCartBadge() {
  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  const badge = $('#cart-badge');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

function getCartTotal() {
  return state.cart.reduce((s, i) => s + i.price * i.qty, 0);
}

// ===== CART SIDEBAR (flyout) =====
function showCartPanel() {
  const overlay = $('#cart-overlay');
  if (overlay) overlay.classList.add('open');
  renderCartSidebar();
}

function hideCartPanel() {
  const overlay = $('#cart-overlay');
  if (overlay) overlay.classList.remove('open');
}

function renderCartSidebar() {
  const panel = $('#cart-panel');
  if (!panel) return;

  if (state.cart.length === 0) {
    panel.innerHTML = `
      <h2>Carrinho de Compras</h2>
      <p style="color:var(--text-mid);text-align:center;padding:40px 0">Seu carrinho está vazio.</p>
      <button class="btn-continue" onclick="hideCartPanel()">Continuar Comprando</button>
    `;
    return;
  }

  const itemsHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="item-img">${item.icon}</div>
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
        <div class="qty-label">Quantidade</div>
        <div class="qty-controls">
          <button onclick="updateQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑</button>
    </div>
  `).join('');

  const total = getCartTotal();

  panel.innerHTML = `
    <h2>Carrinho de Compras</h2>
    <div class="cart-items">${itemsHTML}</div>
    <div class="cart-footer">
      <div class="subtotal">
        <span>Subtotal</span>
        <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
      </div>
      <button class="btn-checkout" onclick="hideCartPanel(); navigateTo('cart')">Ir para o Check-out</button>
      <button class="btn-continue" onclick="hideCartPanel()">Continuar Comprando</button>
    </div>
  `;
}

// ===== CART PAGE =====
function renderCartPage() {
  const page = $('#page-cart');
  if (!page) return;

  if (state.cart.length === 0) {
    page.innerHTML = `
      <div class="cart-page">
        <h2>Meu Carrinho</h2>
        <p style="color:var(--text-mid);text-align:center;padding:60px 0;font-size:16px">Seu carrinho está vazio.</p>
        <div style="text-align:center">
          <button class="btn-fazer-pedido" style="width:auto;padding:14px 40px" onclick="navigateTo('home')">Escolher Produtos</button>
        </div>
      </div>
    `;
    return;
  }

  const itemsHTML = state.cart.map(item => `
    <div class="cart-page-item">
      <div class="cart-page-item-top">
        <div class="item-img">${item.icon}</div>
        <div class="item-name">${item.name}</div>
        <div class="qty-controls">
          <button onclick="updateQty(${item.id},-1);renderCartPage()">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id},1);renderCartPage()">+</button>
        </div>
        <div class="item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <button class="delete-btn" onclick="removeFromCart(${item.id})">🗑</button>
      </div>
      <div class="frequency-row">
        <label class="toggle"><input type="checkbox" ${item.frequency ? 'checked' : ''} onchange="toggleFrequency(${item.id})"><span class="toggle-slider"></span></label>
        <span class="frequency-label">Comprar com Frequência</span>
        ${item.frequency ? `<select class="frequency-select"><option>Selecionar Frequência</option><option>Semanal</option><option>Quinzenal</option><option>Mensal</option></select>` : ''}
      </div>
    </div>
  `).join('');

  const total = getCartTotal();

  page.innerHTML = `
    <div class="cart-page">
      <h2>Meu Carrinho</h2>
      <div class="cart-page-layout">
        <div class="cart-items-col">
          ${itemsHTML}
          <div class="cart-extras">
            <div class="cart-extra-box">
              <h4>Prazo de Entrega</h4>
              <div class="cep-row">
                <input type="text" placeholder="Insira o CEP">
                <button class="btn-cep">BUSCAR</button>
              </div>
              <a class="cep-link">Não sei meu CEP</a>
            </div>
            <div class="cart-extra-box">
              <h4>Cupom de Desconto</h4>
              <div class="coupon-row">
                <input type="text" placeholder="Insira seu Cupom">
                <button class="btn-coupon">APLICAR</button>
              </div>
            </div>
          </div>
        </div>
        <div class="summary-box">
          <h3>Resumo do Pedido</h3>
          <div class="summary-row">
            <span>Valor dos Produtos (${state.cart.reduce((s,i)=>s+i.qty,0)} itens)</span>
            <span style="color:var(--orange);font-weight:700">R$ ${total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="summary-row">
            <span>Descontos</span>
            <span>R$ 0,00</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button class="btn-fazer-pedido" onclick="navigateTo('checkout')">Fazer Pedido</button>
          <button class="btn-mais-produtos" onclick="navigateTo('home')">Escolher mais Produtos</button>
        </div>
      </div>
    </div>
  `;
}

function toggleFrequency(id) {
  const item = state.cart.find(i => i.id === id);
  if (item) item.frequency = !item.frequency;
  renderCartPage();
}

// ===== CHECKOUT PAGE =====
function renderCheckoutPage() {
  const page = $('#page-checkout');
  if (!page) return;

  const total = getCartTotal();

  page.innerHTML = `
    <div class="checkout-page-body">
      <div class="checkout-col">
        <div class="checkout-card">
          <div class="checkout-card-header"><span class="icon">📍</span> Endereço</div>
          <div class="address-grid">
            <input type="text" placeholder="CEP*">
            <input type="text" placeholder="Estado*">
            <input type="text" placeholder="Cidade*">
            <input type="text" placeholder="Bairro*">
            <input type="text" placeholder="Logradouro*">
            <input type="text" placeholder="Número*">
            <input type="text" placeholder="Complemento">
            <input type="text" placeholder="Ponto de Referência">
            <input type="text" placeholder="Destinatário*">
          </div>
          <div class="address-row-check">
            <input type="checkbox" id="main-address">
            <label for="main-address">Esse é meu endereço principal</label>
          </div>
          <div class="checkout-buttons">
            <button class="btn-cancel" onclick="navigateTo('cart')">Cancelar</button>
            <button class="btn-continuar">Continuar</button>
          </div>
        </div>

        <div class="checkout-card">
          <div class="checkout-card-header"><span class="icon">💰</span> Pagamento</div>
          <div class="payment-tabs">
            <button class="payment-tab" onclick="setPayTab(this,'pix')">🔷 Pix</button>
            <button class="payment-tab active" onclick="setPayTab(this,'card')">💳 Cartão de Crédito</button>
            <button class="payment-tab" onclick="setPayTab(this,'boleto')">📄 Boleto</button>
          </div>
          <div class="payment-fields" id="payment-fields">
            <input type="text" placeholder="Número do Cartão*">
            <input type="text" placeholder="Nome Impresso no Cartão*">
            <input type="text" placeholder="Vencimento*">
            <input type="text" placeholder="CVV*">
          </div>
          <div class="checkout-buttons">
            <button class="btn-cancel" style="visibility:hidden">Cancelar</button>
          </div>
        </div>
      </div>

      <div class="checkout-summary">
        <div class="summary-box">
          <h3>Resumo do Pedido</h3>
          <div class="summary-row">
            <span>Valor dos Produtos (${state.cart.reduce((s,i)=>s+i.qty,0)} itens)</span>
            <span style="color:var(--orange);font-weight:700">R$ ${total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="summary-row">
            <span>Descontos</span>
            <span>R$ 0,00</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button class="btn-finalizar" onclick="alert('Pedido realizado com sucesso! 🎉')">Finalizar Pedido</button>
        </div>
      </div>
    </div>
  `;
}

function setPayTab(btn, type) {
  $$('.payment-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const fields = $('#payment-fields');
  if (!fields) return;

  if (type === 'card') {
    fields.innerHTML = `
      <input type="text" placeholder="Número do Cartão*">
      <input type="text" placeholder="Nome Impresso no Cartão*">
      <input type="text" placeholder="Vencimento*">
      <input type="text" placeholder="CVV*">
    `;
  } else if (type === 'pix') {
    fields.innerHTML = `<p style="grid-column:1/-1;color:var(--text-mid);font-size:14px;padding:12px 0">Após confirmar o pedido, você receberá o QR Code do Pix para pagamento.</p>`;
  } else if (type === 'boleto') {
    fields.innerHTML = `<p style="grid-column:1/-1;color:var(--text-mid);font-size:14px;padding:12px 0">O boleto será gerado após a confirmação do pedido. Prazo de compensação: até 3 dias úteis.</p>`;
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  updateCartBadge();

  // Nav dropdown keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideCartPanel();
  });

  // Cart overlay click outside
  const cartOverlay = $('#cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (!$('#cart-panel').contains(e.target)) hideCartPanel();
    });
  }

  // Prevent cart panel click from closing
  $('#cart-panel')?.addEventListener('click', (e) => e.stopPropagation());
});