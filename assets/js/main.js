const btn = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", open);
  nav.classList.toggle("open", open);
});

nav.addEventListener("click", ({ target }) => {
  if (target.tagName !== "A") return;
  btn.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
});

const links = [...nav.querySelectorAll("a")];
const io = new IntersectionObserver(
  (entries) => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      links.forEach((a) =>
        a.toggleAttribute("aria-current", a.hash === `#${target.id}`),
      );
    }
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));

const form = document.querySelector(".msg-form");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button");
  button.disabled = true;
  status.textContent = "Enviando…";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    });
    const { ok } = await res.json();
    if (!ok) throw new Error();
    form.reset();
    status.textContent = "Gracias por tu mensaje!";
  } catch {
    status.textContent = "No se pudo enviar. Probá de nuevo en un rato.";
  } finally {
    button.disabled = false;
  }
});
