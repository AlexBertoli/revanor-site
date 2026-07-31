(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const languageLinks = document.querySelectorAll("[data-language-link]");
  const sectionLinks = document.querySelectorAll('[data-menu] a[href^="#"]');
  const sections = [...document.querySelectorAll("main section[id]")];

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  languageLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const hash = window.location.hash;
      if (hash) link.href = `${link.href.split("#")[0]}${hash}`;
    });
  });

  if ("IntersectionObserver" in window && sectionLinks.length) {
    const linkBySection = new Map(
      [...sectionLinks].map((link) => [link.getAttribute("href")?.slice(1), link])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        sectionLinks.forEach((link) => link.removeAttribute("aria-current"));
        linkBySection.get(visible.target.id)?.setAttribute("aria-current", "location");
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.1, 0.25] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
