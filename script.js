const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const quoteForm = document.querySelector("[data-quote-form]");
const statusNode = document.querySelector("[data-form-status]");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  });
}

if (quoteForm && statusNode) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(quoteForm);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const details = String(data.get("details") || "").trim();

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Service needed: ${service}`,
      "",
      "Project details:",
      details || "Not provided",
    ].join("\n");

    const subject = encodeURIComponent(`Free estimate request from ${name || "website visitor"}`);
    const mailBody = encodeURIComponent(body);

    statusNode.textContent = "Opening your email app with the request filled in.";
    window.location.href = `mailto:jcsjunkremoval02@gmail.com?subject=${subject}&body=${mailBody}`;
  });
}
