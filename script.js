"use strict";

const header = document.querySelector("#site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navLinks = [...document.querySelectorAll(".nav-link")];
const toast = document.querySelector("#toast");
const consultationForm = document.querySelector("#consultation-form");
const matterSelect = document.querySelector("#matter");

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 28);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("open");
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation");
  navigation.classList.add("open");
  header.classList.add("menu-active");
  document.body.classList.add("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("revealed"));
}

const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleSections.length) return;

      const activeId = `#${visibleSections[0].target.id}`;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === activeId;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { threshold: [0.18, 0.35, 0.6], rootMargin: "-22% 0px -58%" }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
}

const practiceMatterMap = {
  "Criminal Law": "Criminal Law",
  "Civil Litigation": "Civil Litigation",
  "Family Law": "Family Law",
  "Intellectual Property": "Intellectual Property",
  "NCCI & FIA Matters": "NCCI & FIA Matter",
  "Regulatory Counsel": "PEMRA / Regulatory Matter"
};

document.querySelectorAll(".practice-card > a").forEach((link) => {
  link.addEventListener("click", () => {
    const practiceName = link.closest(".practice-card").querySelector("h3").textContent.trim();
    const matchingMatter = practiceMatterMap[practiceName];
    if (matchingMatter) {
      matterSelect.value = matchingMatter;
    }
  });
});

function showToast() {
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 4200);
}

consultationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!consultationForm.checkValidity()) {
    consultationForm.reportValidity();
    return;
  }

  const formData = new FormData(consultationForm);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const matter = formData.get("matter").trim();
  const message = formData.get("message").trim();

  const subject = `Consultation request: ${matter}`;
  const body = [
    "Assalam o Alaikum,",
    "",
    "I would like to request a legal consultation.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Matter: ${matter}`,
    "",
    "Brief details:",
    message,
    "",
    "Regards,",
    name
  ].join("\n");

  showToast();

  const mailtoUrl = `mailto:asadullahmalik405@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 180);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
