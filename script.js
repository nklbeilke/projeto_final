let currentBanner = 0;

const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');

function showBanner(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function moveBanner(direction) {
    currentBanner += direction;

    if (currentBanner < 0) currentBanner = slides.length - 1;
    if (currentBanner >= slides.length) currentBanner = 0;

    showBanner(currentBanner);
}


function goToBanner(index) {
    currentBanner = index;
    showBanner(currentBanner);
}


setInterval(() => {
    moveBanner(1);
}, 5000);


function clicou(item) {
    alert("Você clicou em: " + item);
}