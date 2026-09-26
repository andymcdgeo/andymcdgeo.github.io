if (typeof document !== "undefined") {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });
  }
}

// Dropdown menus in the nav (e.g. Labs): open on click or tap, close on outside click or Escape
if (typeof document !== "undefined") {
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  const closeAll = (except) => {
    dropdowns.forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove("open");
      dd.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  };

  dropdowns.forEach((dd) => {
    const button = dd.querySelector(".nav-dropdown-toggle");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = dd.classList.toggle("open");
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      closeAll(dd);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const open = document.querySelector(".nav-dropdown.open .nav-dropdown-toggle");
    closeAll();
    open?.focus();
  });
}
