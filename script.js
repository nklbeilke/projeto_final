// ===== CALOPSITE - script.js =====

// ===== STATE =====
const state = {
  cart: [],
  currentPage: 'home',
  currentCategory: null,
  currentSubcategory: null,
  carouselIndex: 0,
  carouselTimer: null,
  loggedUser: null,
};

// ===== AUTH HELPERS =====
function getUsers() {
  try { return JSON.parse(localStorage.getItem('calopsite_users') || '[]'); }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem('calopsite_users', JSON.stringify(users));
}
function getLoggedUser() {
  try { return JSON.parse(localStorage.getItem('calopsite_logged') || 'null'); }
  catch { return null; }
}
function setLoggedUser(user) {
  state.loggedUser = user;
  if (user) localStorage.setItem('calopsite_logged', JSON.stringify(user));
  else localStorage.removeItem('calopsite_logged');
  updateAuthButton();
}
function updateAuthButton() {
  const btn = document.querySelector('.btn-entrar');
  if (!btn) return;
  const user = state.loggedUser;
  if (user) {
    btn.textContent = 'Olá, ' + user.name.split(' ')[0];
    btn.onclick = showUserMenu;
  } else {
    btn.textContent = 'Entrar/Cadastrar';
    btn.onclick = () => navigateTo('login');
  }
}
function showUserMenu() {
  const existing = document.getElementById('user-menu-popup');
  if (existing) { existing.remove(); return; }
  const menu = document.createElement('div');
  menu.id = 'user-menu-popup';
  menu.style.cssText = 'position:fixed;top:80px;right:64px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:9999;min-width:160px;overflow:hidden;border:1px solid #E8D8C0;';
  menu.innerHTML = '<div class="user-menu-item" onclick="navigateTo(\'home\');document.getElementById(\'user-menu-popup\').remove()">Minha Conta</div><div class="user-menu-item logout" onclick="doLogout()">Sair</div>';
  document.body.appendChild(menu);
  setTimeout(() => document.addEventListener('click', function h(e){ if(!menu.contains(e.target)){menu.remove();document.removeEventListener('click',h);} }), 50);
}
function doLogout() {
  setLoggedUser(null);
  const m = document.getElementById('user-menu-popup');
  if (m) m.remove();
  showToast('Você saiu da conta.');
  navigateTo('home');
}

// ===== TOAST =====
function showToast(msg, isSuccess) {
  const t = document.createElement('div');
  t.className = 'toast-notification' + (isSuccess ? ' toast-success' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('toast-show'), 10);
  setTimeout(() => { t.classList.remove('toast-show'); setTimeout(()=>t.remove(), 300); }, 2800);
}

// ===== SVG ICONS for products =====
const productIcons = {
  racao_cachorro: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="20" y="8" width="40" height="52" rx="8" stroke="#2C2C2C" stroke-width="3"/><circle cx="40" cy="28" r="10" stroke="#2C2C2C" stroke-width="3"/><path d="M30 50h20M28 58h24" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/><path d="M14 36h8M58 36h8" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/></svg>`,
  racao_gato: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="22" y="10" width="36" height="50" rx="8" stroke="#2C2C2C" stroke-width="3"/><circle cx="40" cy="30" r="9" stroke="#2C2C2C" stroke-width="3"/><path d="M22 10 L14 2M58 10 L66 2" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/><path d="M32 50h16" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/></svg>`,
  petiscos: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><ellipse cx="40" cy="40" rx="18" ry="12" stroke="#2C2C2C" stroke-width="3"/><circle cx="22" cy="26" r="6" stroke="#2C2C2C" stroke-width="3"/><circle cx="58" cy="26" r="6" stroke="#2C2C2C" stroke-width="3"/><circle cx="22" cy="54" r="6" stroke="#2C2C2C" stroke-width="3"/><circle cx="58" cy="54" r="6" stroke="#2C2C2C" stroke-width="3"/></svg>`,
  brinquedo_bola: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><circle cx="30" cy="50" r="18" stroke="#2C2C2C" stroke-width="3"/><circle cx="54" cy="26" r="14" stroke="#2C2C2C" stroke-width="3"/><path d="M16 44 Q24 36 36 40" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  brinquedo_corda: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><circle cx="60" cy="24" r="12" stroke="#2C2C2C" stroke-width="3"/><path d="M48 24 C38 24 28 34 28 44 C28 54 38 58 30 66" stroke="#2C2C2C" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="24" cy="70" rx="8" ry="5" stroke="#2C2C2C" stroke-width="3"/></svg>`,
  brinquedo_varinha: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><line x1="16" y1="64" x2="52" y2="20" stroke="#2C2C2C" stroke-width="3.5" stroke-linecap="round"/><path d="M52 20 L58 8 M58 8 L62 18 M58 8 L68 12 M58 8 L56 20" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="52" cy="28" rx="6" ry="4" transform="rotate(-30 52 28)" stroke="#2C2C2C" stroke-width="2"/></svg>`,
  brinquedo_kit: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><circle cx="32" cy="44" r="18" stroke="#2C2C2C" stroke-width="3"/><circle cx="56" cy="28" r="12" stroke="#2C2C2C" stroke-width="3"/><path d="M20 42 Q28 34 38 40" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><path d="M48 26 Q52 22 60 26" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  brinquedo_mordedor: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="18" y="32" width="44" height="20" rx="10" stroke="#2C2C2C" stroke-width="3"/><path d="M28 32 L28 20 M40 32 L40 16 M52 32 L52 20" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/><path d="M28 52 L28 64 M52 52 L52 64" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/></svg>`,
  brinquedo_pelucia: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><circle cx="40" cy="46" r="22" stroke="#2C2C2C" stroke-width="3"/><circle cx="28" cy="28" r="10" stroke="#2C2C2C" stroke-width="3"/><circle cx="52" cy="28" r="10" stroke="#2C2C2C" stroke-width="3"/><circle cx="33" cy="44" r="3" fill="#2C2C2C"/><circle cx="47" cy="44" r="3" fill="#2C2C2C"/><path d="M33 54 Q40 60 47 54" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  brinquedo_kong: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><ellipse cx="40" cy="52" rx="22" ry="16" stroke="#2C2C2C" stroke-width="3"/><path d="M18 52 C18 30 30 16 40 14 C50 16 62 30 62 52" stroke="#2C2C2C" stroke-width="3"/><circle cx="40" cy="14" r="6" stroke="#2C2C2C" stroke-width="2.5"/></svg>`,
  brinquedo_puxador: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><path d="M16 40 C16 28 24 20 32 20 C40 20 48 28 48 40 C48 52 56 60 64 60" stroke="#2C2C2C" stroke-width="4" stroke-linecap="round"/><circle cx="64" cy="60" r="8" stroke="#2C2C2C" stroke-width="3"/><circle cx="16" cy="40" r="8" stroke="#2C2C2C" stroke-width="3"/></svg>`,
  coleira: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><ellipse cx="40" cy="40" rx="28" ry="18" stroke="#2C2C2C" stroke-width="3"/><circle cx="40" cy="58" r="6" stroke="#2C2C2C" stroke-width="2.5"/><rect x="36" y="30" width="8" height="6" rx="2" stroke="#2C2C2C" stroke-width="2.5"/></svg>`,
  guia: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><circle cx="32" cy="40" r="18" stroke="#2C2C2C" stroke-width="3"/><path d="M32 22 L32 8 M32 8 L50 8 Q58 8 58 20 L58 36" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="54" y="32" width="10" height="14" rx="3" stroke="#2C2C2C" stroke-width="2.5"/></svg>`,
  shampoo: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="24" y="24" width="32" height="44" rx="8" stroke="#2C2C2C" stroke-width="3"/><path d="M34 24 L34 14 L46 14 L46 24" stroke="#2C2C2C" stroke-width="3"/><path d="M46 10 L52 4" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/><path d="M32 40 Q40 36 48 40 Q40 44 32 40Z" fill="#2C2C2C"/></svg>`,
  lencinho: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="14" y="20" width="52" height="40" rx="8" stroke="#2C2C2C" stroke-width="3"/><path d="M14 34 Q30 28 46 34 Q62 40 66 34" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><path d="M14 48 Q30 42 46 48 Q62 54 66 48" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  cama: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><ellipse cx="40" cy="50" rx="30" ry="18" stroke="#2C2C2C" stroke-width="3"/><ellipse cx="40" cy="42" rx="22" ry="12" stroke="#2C2C2C" stroke-width="2.5"/><path d="M14 50 L14 62 M66 50 L66 62" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/></svg>`,
  cobertor: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="12" y="20" width="56" height="42" rx="6" stroke="#2C2C2C" stroke-width="3"/><path d="M20 30 Q30 24 40 30 Q50 36 60 30" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><path d="M20 42 Q30 36 40 42 Q50 48 60 42" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><path d="M20 54 Q30 48 40 54 Q50 60 60 54" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  arranhador: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect x="34" y="18" width="12" height="44" rx="6" stroke="#2C2C2C" stroke-width="3"/><ellipse cx="40" cy="14" rx="16" ry="8" stroke="#2C2C2C" stroke-width="3"/><ellipse cx="40" cy="66" rx="16" ry="8" stroke="#2C2C2C" stroke-width="3"/><circle cx="40" cy="14" r="4" stroke="#2C2C2C" stroke-width="2"/></svg>`,
  sementes: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><path d="M20 60 C20 38 36 16 40 10 C44 16 60 38 60 60 Z" stroke="#2C2C2C" stroke-width="3" stroke-linejoin="round"/><path d="M40 10 L40 60" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><path d="M40 28 C34 28 28 32 26 38" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  balanco: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72"><path d="M20 16 L60 16" stroke="#2C2C2C" stroke-width="3" stroke-linecap="round"/><path d="M28 16 L28 44 M52 16 L52 44" stroke="#2C2C2C" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="40" cy="48" rx="14" ry="6" stroke="#2C2C2C" stroke-width="3"/><circle cx="60" cy="36" r="10" stroke="#2C2C2C" stroke-width="3"/><path d="M56 34 L60 30 L64 34 M60 30 L60 42" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

function getProductIcon(p) {
  if (p.sub === 'racao' && p.cat === 'cachorro') return productIcons.racao_cachorro;
  if (p.sub === 'racao' && p.cat === 'gato') return productIcons.racao_gato;
  if (p.sub === 'racao' && p.cat === 'aves') return productIcons.sementes;
  if (p.sub === 'petiscos') return productIcons.petiscos;
  if (p.sub === 'coleiras') {
    if (p.id === 19) return productIcons.coleira;
    return productIcons.guia;
  }
  if (p.sub === 'limpeza') {
    if (p.id === 21) return productIcons.shampoo;
    return productIcons.lencinho;
  }
  if (p.sub === 'camas') {
    if (p.id === 23) return productIcons.cama;
    return productIcons.cobertor;
  }
  if (p.sub === 'brinquedos') {
    const bmap = {
      11: productIcons.brinquedo_bola,
      12: productIcons.brinquedo_corda,
      13: productIcons.brinquedo_kit,
      14: productIcons.brinquedo_puxador,
      15: productIcons.brinquedo_mordedor,
      16: productIcons.brinquedo_pelucia,
      17: productIcons.brinquedo_kong,
      18: productIcons.brinquedo_puxador,
      27: productIcons.brinquedo_varinha,
      28: productIcons.arranhador,
      31: productIcons.balanco,
    };
    return bmap[p.id] || productIcons.brinquedo_bola;
  }
  return productIcons.racao_cachorro;
}

// ===== PRODUCTS DATA =====
const products = {
  cachorro: {
    racao: [
      { id: 1, name: 'Ração Special para Cães Adultos Sabor Frango..', price: 176.90, cat: 'cachorro', sub: 'racao' },
      { id: 2, name: 'Ração para Cães Filhotes de Porte Grande Sabor..', price: 274.90, cat: 'cachorro', sub: 'racao' },
      { id: 5, name: 'Ração Premium para Cães Adultos de Raças Médias..', price: 259.90, cat: 'cachorro', sub: 'racao' },
      { id: 6, name: 'Ração Sênior para Cães Grandes Sabor Carne..', price: 189.90, cat: 'cachorro', sub: 'racao' },
      { id: 7, name: 'Ração Standart para Cães de Todas as Raças...', price: 89.90, cat: 'cachorro', sub: 'racao' },
      { id: 8, name: 'Ração High Premium Sabor Salmão para Cães...', price: 310.00, cat: 'cachorro', sub: 'racao' },
    ],
    petiscos: [
      { id: 9, name: 'Petisco Ossinho de Nylon para Cães Filhotes', price: 18.90, cat: 'cachorro', sub: 'petiscos' },
      { id: 10, name: 'Biscoito Natural Frango e Aveia para Cães', price: 24.50, cat: 'cachorro', sub: 'petiscos' },
    ],
    brinquedos: [
      { id: 11, name: 'Brinquedo Kit Bola de Tênis e Osso para Cães', price: 26.90, cat: 'cachorro', sub: 'brinquedos' },
      { id: 12, name: 'Brinquedo Corda com Bola Colorida para Cães', price: 14.90, cat: 'cachorro', sub: 'brinquedos' },
      { id: 13, name: 'Brinquedo Kit de Bolas para Cães', price: 9.90, cat: 'cachorro', sub: 'brinquedos' },
      { id: 14, name: 'Brinquedo Corda Infinito com Bola para Cães', price: 24.99, cat: 'cachorro', sub: 'brinquedos' },
      { id: 15, name: 'Brinquedo Mordedor de Borracha para Cães', price: 19.90, cat: 'cachorro', sub: 'brinquedos' },
      { id: 16, name: 'Brinquedo Pelúcia Ovelha para Cães', price: 34.90, cat: 'cachorro', sub: 'brinquedos' },
      { id: 17, name: 'Brinquedo Kong Recheável para Cães', price: 42.00, cat: 'cachorro', sub: 'brinquedos' },
      { id: 18, name: 'Brinquedo Puxador Duplo para Cães', price: 17.50, cat: 'cachorro', sub: 'brinquedos' },
    ],
    coleiras: [
      { id: 19, name: 'Coleira Ajustável para Cães Porte Médio', price: 35.90, cat: 'cachorro', sub: 'coleiras' },
      { id: 20, name: 'Guia Retrátil 5m para Cães até 30kg', price: 68.00, cat: 'cachorro', sub: 'coleiras' },
    ],
    limpeza: [
      { id: 21, name: 'Shampoo Antipulgas para Cães 500ml', price: 29.90, cat: 'cachorro', sub: 'limpeza' },
      { id: 22, name: 'Lenço Umedecido para Cães 40un', price: 12.90, cat: 'cachorro', sub: 'limpeza' },
    ],
    camas: [
      { id: 23, name: 'Cama Redonda Premium para Cães Porte Grande', price: 149.90, cat: 'cachorro', sub: 'camas' },
      { id: 24, name: 'Cobertor Soft para Cães e Gatos', price: 49.90, cat: 'cachorro', sub: 'camas' },
    ],
  },
  gato: {
    racao: [
      { id: 3, name: 'Ração Úmida Sachê para Gatos com Excesso de pe..', price: 16.90, cat: 'gato', sub: 'racao' },
      { id: 25, name: 'Ração Premium para Gatos Adultos Sabor Atum', price: 88.90, cat: 'gato', sub: 'racao' },
      { id: 26, name: 'Ração para Gatos Filhotes Sabor Frango', price: 72.00, cat: 'gato', sub: 'racao' },
    ],
    brinquedos: [
      { id: 27, name: 'Brinquedo Varinha com Penas e Guizo para Gatos', price: 6.99, cat: 'gato', sub: 'brinquedos' },
      { id: 28, name: 'Arranhador Torre com Bolinha para Gatos', price: 54.90, cat: 'gato', sub: 'brinquedos' },
    ],
  },
  aves: {
    racao: [
      { id: 29, name: 'Mistura de Sementes para Calopsita 500g', price: 19.90, cat: 'aves', sub: 'racao' },
      { id: 30, name: 'Ração Extrusada para Papagaios 1kg', price: 42.00, cat: 'aves', sub: 'racao' },
    ],
    brinquedos: [
      { id: 31, name: 'Brinquedo Balanço com Espelho para Aves', price: 15.90, cat: 'aves', sub: 'brinquedos' },
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

// ===== NAVIGATION =====
function navigateTo(page, category, subcategory) {
  state.currentPage = page;
  state.currentCategory = category || null;
  state.currentSubcategory = subcategory || null;

  $$('.page').forEach(p => p.classList.remove('active'));
  const target = $(`#page-${page}`);
  if (target) target.classList.add('active');

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
  } else {
    mainHeader && (mainHeader.style.display = 'none');
    mainNav && (mainNav.style.display = 'none');
    checkoutHeader && (checkoutHeader.style.display = '');
    mainBanner && (mainBanner.style.display = 'none');
    if (page === 'login' || page === 'register') {
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

// ===== LISTING =====
function getProductsForCategorySubcat(cat, sub) {
  if (!cat) return [];
  const catData = products[cat];
  if (!catData) return [];
  if (sub && catData[sub]) return catData[sub];
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

  const sidebarCatHTML = subs.map(s =>
    `<li class="${s === currentSub ? 'active' : ''}" onclick="navigateTo('listing','${cat}','${s}')">${subcategoryLabels[s] || s}</li>`
  ).join('');

  let filterHTML = '';
  for (const [groupName, options] of Object.entries(filters)) {
    filterHTML += `<div class="filter-section">
      <h4>${groupName}</h4>
      ${options.map(o => `<label><input type="checkbox"> ${o}</label>`).join('')}
    </div>`;
  }

  const productHTML = prods.map(p => `
    <div class="product-card" onclick="addToCart(${p.id}, this)">
      <div class="prod-icon">${getProductIcon(p)}</div>
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

function addToCart(productId, cardEl) {
  // toggle selected visual
  if (cardEl) {
    const wasSelected = cardEl.classList.contains("in-cart");
    if (wasSelected) { return; }
    cardEl.classList.add("in-cart");
  }
  const product = findProduct(productId);
  if (!product) return;
  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  updateCartBadge();
  showToast('Produto adicionado ao carrinho! 🛒', true);
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

// ===== CART SIDEBAR =====
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
      <p style="color:var(--text-mid);text-align:center;padding:48px 0;font-size:15px;font-weight:600">Seu carrinho está vazio.</p>
      <button class="btn-continue" onclick="hideCartPanel()">Continuar Comprando</button>
    `;
    return;
  }

  const itemsHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="item-img">${getProductIcon(item)}</div>
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
      <button class="remove-btn" onclick="removeFromCart(${item.id})">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
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
      <button class="btn-checkout" onclick="goToCart()">Ir para o Check-out</button>
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
        <p style="color:var(--text-mid);text-align:center;padding:60px 0;font-size:16px;font-weight:600">Seu carrinho está vazio.</p>
        <div style="text-align:center">
          <button class="btn-fazer-pedido" style="width:auto;padding:14px 40px" onclick="navigateTo('home')">Escolher Produtos</button>
        </div>
      </div>
    `;
    return;
  }

  const deleteSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" stroke-width="2"/></svg>`;

  const itemsHTML = state.cart.map(item => `
    <div class="cart-page-item">
      <div class="cart-page-item-top">
        <div class="item-img">${getProductIcon(item)}</div>
        <div class="item-name">${item.name}</div>
        <div class="qty-controls">
          <button onclick="updateQty(${item.id},-1);renderCartPage()">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id},1);renderCartPage()">+</button>
        </div>
        <div class="item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        <button class="delete-btn" onclick="removeFromCart(${item.id})">${deleteSVG}</button>
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
            <span style="color:var(--orange);font-weight:800">R$ ${total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="summary-row">
            <span>Descontos</span>
            <span>R$ 0,00</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button class="btn-fazer-pedido" onclick="goToCheckout()">Fazer Pedido</button>
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

// ===== CHECKOUT pagina de pagamento  =====
function renderCheckoutPage() {
  const page = $('#page-checkout');
  if (!page) return;

  const total = getCartTotal();
  const itemCount = state.cart.reduce((s,i)=>s+i.qty,0);

  page.innerHTML = `
    <div class="checkout-page-body">
      <div class="checkout-col">
        <div class="checkout-card">
          <div class="checkout-card-header">
            <span class="icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
            Endereço
          </div>
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
          <div class="checkout-card-header">
            <span class="icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
            Pagamento
          </div>
          <div class="payment-tabs">
            <button class="payment-tab" onclick="setPayTab(this,'pix')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Pix
            </button>
            <button class="payment-tab active" onclick="setPayTab(this,'card')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="4" width="22" height="16" rx="3" stroke="currentColor" stroke-width="2"/><line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" stroke-width="2"/></svg>
              Cartão de Crédito
            </button>
            <button class="payment-tab" onclick="setPayTab(this,'boleto')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 7v10M10 7v10M14 7v10M17 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              Boleto
            </button>
          </div>
          <div class="payment-fields" id="payment-fields">
            <input type="text" placeholder="Número do Cartão*">
            <input type="text" placeholder="Nome Impresso no Cartão*">
            <input type="text" placeholder="Vencimento*">
            <input type="text" placeholder="CVV*">
          </div>
          <div class="checkout-buttons" style="justify-content:flex-start;margin-top:12px">
            <button class="btn-cancel">Cancelar</button>
          </div>
        </div>
      </div>

      <div class="checkout-summary">
        <div class="summary-box">
          <h3>Resumo do Pedido</h3>
          <div class="summary-row">
            <span>Valor dos Produtos (${itemCount} itens)</span>
            <span style="color:var(--orange);font-weight:800">R$ ${total.toFixed(2).replace('.', ',')}</span>
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
    fields.innerHTML = `<p style="grid-column:1/-1;color:var(--text-mid);font-size:14px;padding:16px 0;font-weight:600">Após confirmar o pedido, você receberá o QR Code do Pix para pagamento.</p>`;
  } else if (type === 'boleto') {
    fields.innerHTML = `<p style="grid-column:1/-1;color:var(--text-mid);font-size:14px;padding:16px 0;font-weight:600">O boleto será gerado após a confirmação do pedido. Prazo de compensação: até 3 dias úteis.</p>`;
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Restore logged user from localStorage
  const savedUser = getLoggedUser();
  if (savedUser) {
    state.loggedUser = savedUser;
    updateAuthButton();
  }

  initCarousel();
  updateCartBadge();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideCartPanel();
  });

  const cartOverlay = $('#cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (!$('#cart-panel').contains(e.target)) hideCartPanel();
    });
  }

  $('#cart-panel')?.addEventListener('click', (e) => e.stopPropagation());

  // Wire up login button
  const loginBtn = document.querySelector('#page-login .btn-auth');
  if (loginBtn) loginBtn.addEventListener('click', handleLogin);

  // Wire up register button
  const registerBtn = document.querySelector('.btn-cadastrar');
  if (registerBtn) registerBtn.addEventListener('click', handleRegister);

  // Wire up eye toggle buttons
  document.querySelectorAll('.eye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.input-pw-wrap');
      if (!wrap) return;
      const inp = wrap.querySelector('input');
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  });

  // Cart icon also checks auth
  const cartIconBtn = document.querySelector('.icon-btn[title="Carrinho"]');
  if (cartIconBtn) {
    cartIconBtn.onclick = showCartPanel;
  }
});
// ===== AREA DE FAZER LOGIN=====
function handleLogin() {
  const emailEl = document.querySelector('#page-login input[type="email"]');
  const pwEl = document.querySelector('#page-login input[type="password"]');
  if (!emailEl || !pwEl) return;
  const email = emailEl.value.trim();
  const pw = pwEl.value;
  if (!email || !pw) { showToast('Preencha email e senha.'); return; }
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === pw);
  if (!user) { showToast('Email ou senha incorretos.'); return; }
  setLoggedUser(user);
  showToast('Bem-vindo(a), ' + user.name.split(' ')[0] + '! 🐾', true);
  if (state._pendingCart) {
    state._pendingCart = false;
    navigateTo('cart');
  } else {
    navigateTo('home');
  }
}

// REGISTRO PARA CRIAR CONTAS =====
function handleRegister() {
  const inputs = document.querySelectorAll('#page-register .form-grid input[type="text"], #page-register .form-grid input[type="email"], #page-register .form-grid input[type="tel"], #page-register .form-grid input[type="password"]');
  const arr = Array.from(inputs);
  const name = (arr[0]?.value || '').trim();
  const email = (arr[1]?.value || '').trim();
  const phone = (arr[2]?.value || '').trim();
  const cpf = (arr[4]?.value || '').trim();
  const pw = arr[5]?.value || '';
  const pw2 = arr[6]?.value || '';
  const agreed = document.querySelector('#page-register .agree-label input');

  if (!name || !email || !cpf || !pw) { showToast('Preencha todos os campos obrigatórios.'); return; }
  if (pw.length < 8) { showToast('Senha deve ter no mínimo 8 caracteres.'); return; }
  if (pw !== pw2) { showToast('As senhas não coincidem.'); return; }
  if (agreed && !agreed.checked) { showToast('Aceite os Termos e Condições.'); return; }

  const users = getUsers();
  if (users.find(u => u.email === email)) { showToast('Esse email já está cadastrado.'); return; }
  const newUser = { name, email, password: pw, cpf, phone };
  users.push(newUser);
  saveUsers(users);
  setLoggedUser(newUser);
  showToast('Cadastro realizado! Bem-vindo(a) 🎉', true);
  if (state._pendingCart) {
    state._pendingCart = false;
    navigateTo('cart');
  } else {
    navigateTo('home');
  }
}

// ===== EYE TOGGLE PASSWORD =====
function togglePw(btn) {
  const input = btn.previousElementSibling || btn.closest('.input-pw-wrap').querySelector('input');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ===== CART AUTH GUARD =====
function goToCart() {
  hideCartPanel();
  if (!state.loggedUser) {
    state._pendingCart = true;
    showLoginRequired();
    return;
  }
  navigateTo('cart');
}

function goToCheckout() {
  if (!state.loggedUser) {
    state._pendingCart = true;
    showLoginRequired();
    return;
  }
  navigateTo('checkout');
}

function showLoginRequired() {
  // parte do login
  const modal = document.createElement('div');
  modal.id = 'login-required-modal';
  modal.innerHTML = `
    <div class="lrm-backdrop" onclick="closeLoginRequired()"></div>
    <div class="lrm-box">
      <div class="lrm-logo">🐾</div>
      <h3>Entre na sua conta</h3>
      <p>Para acessar o carrinho, faça login ou cadastre-se.</p>
      <button class="btn-auth lrm-btn" onclick="closeLoginRequired(); navigateTo('login')">Entrar</button>
      <button class="btn-auth lrm-btn lrm-outline" onclick="closeLoginRequired(); navigateTo('register')">Criar Conta</button>
      <div class="lrm-cancel" onclick="closeLoginRequired()">Cancelar</div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeLoginRequired() {
  const m = document.getElementById('login-required-modal');
  if (m) m.remove();
  state._pendingCart = false;
}