/* ==========================================================
   Portfolio scripts - Muhammad Usama
   ========================================================== */

/* ---------- Appearance settings ---------- */
function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
}

function visualmode() {
    document.body.classList.toggle("light-mode");
    document.querySelectorAll(".needtobeinvert").forEach((el) => el.classList.toggle("invertapplied"));
}

document.getElementById("switchforsetting").addEventListener("change", settingtoggle);
document.getElementById("switchforvisualmode").addEventListener("change", visualmode);

// Labels act as the visible toggles: make them work from the keyboard (Enter / Space).
["labelforsetting", "labelforvisualmode"].forEach((id) => {
    const label = document.getElementById(id);
    label.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            label.click();
        }
    });
});

/* ---------- Contact button ---------- */
const letsTalkBtn = document.getElementById("letsTalkBtn");
letsTalkBtn.addEventListener("click", () => {
    window.location.href = letsTalkBtn.dataset.mailto;
});

/* ---------- Mobile menu ---------- */
const hamburgerButton = document.getElementById("hamburger-button");
const mobileMenu = document.getElementById("mobiletogglemenu");
const burgerBars = [1, 2, 3].map((n) => document.getElementById(`burger-bar${n}`));

function setMenuOpen(open) {
    document.body.classList.toggle("stopscrolling", open);
    mobileMenu.classList.toggle("show-toggle-menu", open);
    burgerBars.forEach((bar, i) => bar.classList.toggle(`hamburger-animation${i + 1}`, open));
    hamburgerButton.setAttribute("aria-expanded", String(open));
    hamburgerButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

function isMenuOpen() {
    return mobileMenu.classList.contains("show-toggle-menu");
}

hamburgerButton.addEventListener("click", () => setMenuOpen(!isMenuOpen()));
document.querySelectorAll("#mobile-ul li").forEach((li) => li.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen()) setMenuOpen(false);
});

/* ---------- Active nav tab on scroll + back-to-top ---------- */
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobileNavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");
const backToTopButton = document.getElementById("backtotopbutton");

function onScroll() {
    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) current = section.id;
    });

    mobileNavLi.forEach((li) => li.classList.toggle("activeThismobiletab", li.classList.contains(current)));
    navLi.forEach((li) => {
        const active = li.classList.contains(current);
        li.classList.toggle("activeThistab", active);
        const link = li.querySelector("a");
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });

    backToTopButton.style.display = window.scrollY > 400 ? "block" : "none";
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Custom cursor (mouse / trackpad only) ---------- */
const cursorInner = document.getElementById("cursor-inner");
const cursorOuter = document.getElementById("cursor-outer");

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
        const x = `${e.clientX}px`;
        const y = `${e.clientY}px`;
        cursorInner.style.left = x;
        cursorInner.style.top = y;
        cursorOuter.animate({ left: x, top: y }, { duration: 500, fill: "forwards" });
    });

    // Attach hover listeners ONCE (previously re-attached on every mousemove).
    document.querySelectorAll("a, label, button").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursorInner.classList.add("hover");
            cursorOuter.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
            cursorInner.classList.remove("hover");
            cursorOuter.classList.remove("hover");
        });
    });
} else {
    cursorInner.style.display = "none";
    cursorOuter.style.display = "none";
}

/* ---------- Certificate lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
let lightboxOpener = null;

function openLightbox(link) {
    lightboxOpener = link;
    lightboxImg.src = link.getAttribute("href");
    lightboxImg.alt = link.querySelector("img")?.alt || "";
    lightboxCaption.textContent = link.dataset.title || "";
    lightbox.hidden = false;
    document.body.classList.add("stopscrolling");
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.classList.remove("stopscrolling");
    if (lightboxOpener) lightboxOpener.focus();
}

document.querySelectorAll("a[data-lightbox]").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(link);
    });
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Scroll animations (don't break the page if the CDN is down) ---------- */
if (window.AOS) {
    // once: animate each element the first time only, so sections don't
    // re-fade (and look half-transparent) every time you scroll back
    AOS.init({ once: true, duration: 700, offset: 80 });
} else {
    document.querySelectorAll("[data-aos]").forEach((el) => el.removeAttribute("data-aos"));
}
