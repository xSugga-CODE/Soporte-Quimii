// Quimii — Centro de Ayuda
// JS mínimo a propósito: sin build, sin dependencias, para poder alojarlo
// en cualquier hosting estático junto al resto de los sitios de Quimii.

// ---- Buscador del hub: sugiere a qué sub-centro conviene ir ----
const SEARCH_ROUTES = [
  { keys: ["clima", "tiempo", "lluvia", "temperatura", "pronostico", "pronóstico", "alerta", "viento", "aire", "aqi", "radar", "mapa", "astronomia", "astronomía", "comunidad", "reporte"], url: "soporte-meteoquimii.html", label: "Centro de Ayuda de MeteoQuimii" },
  { keys: ["cuenta", "contraseña", "password", "mensaje", "chat", "perfil", "suscripcion", "suscripción", "pago", "quimii app", "plataforma"], url: "#quimii-plataforma", label: "Soporte Quimii (Plataforma)" },
];

function initHubSearch() {
  const form = document.getElementById("help-search-form");
  const input = document.getElementById("help-search-input");
  const resultEl = document.getElementById("search-result");
  if (!form || !input || !resultEl) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) {
      resultEl.textContent = "Escribí una palabra clave, por ejemplo: alertas, cuenta, mapa.";
      return;
    }
    const match = SEARCH_ROUTES.find((r) => r.keys.some((k) => q.includes(k)));
    if (match) {
      resultEl.innerHTML = `Esto suena a algo de <a href="${match.url}">${match.label} →</a>`;
    } else {
      resultEl.textContent = "No encontramos una coincidencia exacta. Elegí el proyecto correspondiente más abajo, o escribinos directamente.";
    }
  });
}

// ---- Formulario de soporte: arma un mailto: con lo que completó el usuario ----
function initSupportForm() {
  const form = document.getElementById("support-form");
  if (!form) return;
  const statusEl = document.getElementById("support-form-status");
  const SUPPORT_EMAIL = form.dataset.supportEmail || "soporte@quimii.com";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#f-name").value.trim();
    const email = form.querySelector("#f-email").value.trim();
    const device = form.querySelector("#f-device").value;
    const category = form.querySelector("#f-category").value;
    const message = form.querySelector("#f-message").value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Completá al menos tu nombre, email y la descripción.";
      statusEl.className = "form-status";
      return;
    }

    const subject = encodeURIComponent(`[MeteoQuimii Soporte] ${category} — ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nDispositivo: ${device}\nCategoría: ${category}\n\nDescripción:\n${message}`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    statusEl.textContent = "Abrimos tu app de correo con el mensaje listo para enviar.";
    statusEl.className = "form-status ok";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHubSearch();
  initSupportForm();
});
