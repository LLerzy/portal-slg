/**
 * ============================================================
 * SERVICE WORKER — Portal SLG
 * ------------------------------------------------------------
 * Deliberadamente NO cachea nada: ni el HTML del portal, ni las
 * respuestas de los Apps Script (notas, simulacros, boletines).
 * Su único propósito es cumplir el requisito técnico de Chrome
 * para permitir "Instalar" / "Agregar a pantalla de inicio"
 * (necesita un service worker activo con un manejador de fetch).
 *
 * Cachear aquí sería peligroso: mostraría datos académicos
 * desactualizados o de otro estudiante si el dispositivo se
 * comparte, y el portal ya depende de sessionStorage (que se
 * limpia al cerrar sesión) como mecanismo de control de acceso.
 * Por eso todo pasa directo a la red, sin interceptar contenido.
 * ============================================================ */

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  self.clients.claim();
});

// Passthrough puro: deja que cada solicitud vaya normal a la red.
self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
});
