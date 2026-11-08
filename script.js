const navLinks = document.querySelectorAll(".nav a");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const eventForm = document.querySelector("#eventForm");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }

      if (navMenu) {
        navMenu.classList.remove("active");
      }
    }
  });
});

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");

  if (nav) {
    nav.style.boxShadow =
      window.scrollY > 50
        ? "0 8px 25px rgba(0,0,0,0.06)"
        : "none";
  }
});

if (eventForm) {
  eventForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(eventForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        alert("Thank you! Your SIP event inquiry has been submitted.");
        eventForm.reset();
      })
      .catch(() => {
        alert("Thank you! Your SIP event inquiry has been submitted.");
        eventForm.reset();
      });
  });
}

// Menu tabs
const menuTabs = document.querySelectorAll(".menu-tab");
const menuPanels = document.querySelectorAll(".menu-panel");

menuTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    menuTabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    menuPanels.forEach(p => {
      p.classList.remove("active");
      p.hidden = true;
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const panel = document.getElementById(tab.dataset.target);
    panel.hidden = false;
    panel.classList.add("active");
  });
});
