const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
// Project Image Gallery

const projectImages = [
    {
        src: "images/hardware-home.png",
        caption: "Asif Hardware - Homepage"
    },
    {
        src: "images/hardware-products.png",
        caption: "Asif Hardware - Products Section"
    },
    {
        src: "images/hardware-admin.png",
        caption: "Asif Hardware - Admin Dashboard"
    }
];

let currentProjectImage = 0;

function openProjectGallery() {
    currentProjectImage = 0;
    showProjectImage();

    document.getElementById("projectLightbox").classList.add("active");
}

function closeProjectGallery() {
    document.getElementById("projectLightbox").classList.remove("active");
}

function changeProjectImage(direction) {
    currentProjectImage += direction;

    if (currentProjectImage >= projectImages.length) {
        currentProjectImage = 0;
    }

    if (currentProjectImage < 0) {
        currentProjectImage = projectImages.length - 1;
    }

    showProjectImage();
}

function showProjectImage() {
    document.getElementById("lightboxImage").src =
        projectImages[currentProjectImage].src;

    document.getElementById("lightboxCaption").textContent =
        projectImages[currentProjectImage].caption;
}