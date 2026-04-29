function clicou(categoria) {
    alert("Você clicou em: " + categoria);
}

// Banner carousel
let currentBanner = 0;
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');

function showBanner(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentBanner = (index + slides.length) % slides.length;
    slides[currentBanner].classList.add('active');
    dots[currentBanner].classList.add('active');
}

function moveBanner(dir) {
    showBanner(currentBanner + dir);
}

function goToBanner(index) {
    showBanner(index);
}

setInterval(() => moveBanner(1), 5000);