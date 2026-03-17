#!/usr/bin/env node
/**
 * Seed Strapi Global navigation from frontend nav config (FR/EN/ES).
 *
 * Usage:
 *   STRAPI_URL=https://your-strapi STRAPI_TOKEN=xxx node scripts/seed-global-navigation.mjs
 *
 * Optional:
 *   TARGET_LOCALES=fr,en,es   # default
 *
 * Notes:
 * - Updates only `Global.navigation` for each locale.
 * - Keeps the CTA as the last item ("Contact"/"contact"/"Contacto"), matching current frontend behavior.
 */

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const TARGET_LOCALES = (process.env.TARGET_LOCALES || "fr,en,es")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!STRAPI_TOKEN) {
  console.error("Missing STRAPI_TOKEN. Set it in environment variables.");
  process.exit(1);
}

const NAV_BY_LOCALE = {
  fr: [
    {
      label: "DAF Externalisé",
      url: "/daf-externalise",
      children: [
        { label: "DAF à Temps Partagé", url: "/daf-externalise/temps-partage" },
        { label: "DAF de Transition", url: "/daf-externalise/transition" },
        { label: "DAF : Métier", url: "/daf-externalise/metier" },
      ],
    },
    {
      label: "DRH Externalisé",
      url: "/drh-externalise",
      children: [{ label: "DRH à Temps Partagé", url: "/drh-externalise/temps-partage" }],
    },
    {
      label: "Services",
      url: "/services",
      children: [
        { label: "Prévisionnel de trésorerie", url: "/services/previsionnel-tresorerie" },
        { label: "Gestion financière externalisée", url: "/services/gestion-financiere-externalisee" },
        { label: "Accompagnement levée de fonds", url: "/services/accompagnement-levee-de-fond" },
        { label: "Externaliser sa comptabilité", url: "/services/comptabilite-externalisation" },
        { label: "Contrôle de gestion", url: "/services/controle-de-gestion-externalise" },
      ],
    },
    {
      label: "Ressources",
      url: "/ressources",
      children: [
        { label: "Cas clients", url: "/ressources/testimonials" },
        { label: "Actualités", url: "/ressources/blog" },
        { label: "Fiches métier", url: "/ressources/fiche-metier" },
        { label: "Glossaire", url: "/ressources/glossaire" },
      ],
    },
    { label: "A propos", url: "/a-propos" },
    { label: "Jobs", url: "/jobs" },
    { label: "Contact", url: "/contact" },
  ],
  en: [
    {
      label: "CFO Outsourced",
      url: "/en/daf-outsourcing",
      children: [
        { label: "Shared-time CFO", url: "/en/daf-outsourcing/shared-time" },
        { label: "Transitional CFO", url: "/en/daf-outsourcing/transition" },
        { label: "CFO : The Mission", url: "/en/daf-outsourcing/metier" },
      ],
    },
    {
      label: "HR Outsourced",
      url: "/en/hr-outsourcing",
      children: [{ label: "Shared-time HR", url: "/en/hr-outsourcing/shared-time" }],
    },
    {
      label: "Services",
      url: "/en/services",
      children: [
        { label: "Cash flow forecast", url: "/en/services/cash-flow-forecast" },
        { label: "Outsourced financial management", url: "/en/services/outsourced-financial-management" },
        { label: "Fund raising support", url: "/en/services/fund-raising-support" },
        { label: "Outsource your accounting", url: "/en/services/outsource-your-accounting" },
        { label: "Outsourced management control", url: "/en/services/outsourced-management-control" },
      ],
    },
    {
      label: "Resources",
      url: "/en/ressources",
      children: [
        { label: "Case studies", url: "/en/ressources/testimonials" },
        { label: "Blog", url: "/en/ressources/blog" },
        { label: "Job descriptions", url: "/en/ressources/fiche-metier" },
        { label: "Glossary", url: "/en/ressources/glossaire" },
      ],
    },
    { label: "About us", url: "/en/a-propos" },
    { label: "Jobs", url: "/en/jobs" },
    { label: "contact", url: "/en/contact" },
  ],
  es: [
    {
      label: "CFO externo",
      url: "/es/externalizacion-daf",
      children: [
        { label: "CFO a Tiempo Compartido", url: "/es/externalizacion-daf/multipropiedad" },
        { label: "CFO de transición", url: "/es/externalizacion-daf/transition" },
        { label: "CFO : Perfil profesional", url: "/es/externalizacion-daf/metier" },
      ],
    },
    {
      label: "RRHH externalizado",
      url: "/es/externalizacion-rrhh",
      children: [{ label: "RRHH a tiempo compartido", url: "/es/externalizacion-rrhh/tiempo-compartido" }],
    },
    {
      label: "Servicios",
      url: "/es/services",
      children: [
        { label: "Previsión de tesorería", url: "/es/services/prevision-tesoreria" },
        { label: "Gestión financiera externalizada", url: "/es/services/gestion-financiera-externalizada" },
        { label: "Soporte a la financiación", url: "/es/services/soporte-financiacion" },
        { label: "Externalizar la contabilidad", url: "/es/services/externalizar-contabilidad" },
        { label: "Control de gestión externalizado", url: "/es/services/control-gestion-externalizado" },
      ],
    },
    {
      label: "Recursos",
      url: "/es/ressources",
      children: [
        { label: "Casos prácticos", url: "/es/ressources/testimonials" },
        { label: "Blog", url: "/es/ressources/blog" },
        { label: "Perfiles profesionales", url: "/es/ressources/fiche-metier" },
        { label: "Glosario", url: "/es/ressources/glossaire" },
      ],
    },
    { label: "Quiénes somos", url: "/es/quienes-somos" },
    { label: "Empleo", url: "/es/jobs" },
    { label: "Contacto", url: "/es/contact" },
  ],
};

async function strapiFetch(path, options = {}) {
  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      ...(options.headers || {}),
    },
  });
  return response;
}

async function getAvailableLocales() {
  const res = await strapiFetch("/api/i18n/locales");
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map((item) => String(item.code)).filter(Boolean);
}

function resolveLocaleCode(canonicalLocale, availableLocales) {
  if (availableLocales.includes(canonicalLocale)) return canonicalLocale;
  const prefixMatch = availableLocales.find((code) => code.toLowerCase().startsWith(`${canonicalLocale}-`));
  return prefixMatch || canonicalLocale;
}

async function seedLocale(canonicalLocale, availableLocales) {
  const navigation = NAV_BY_LOCALE[canonicalLocale];
  if (!navigation) {
    console.warn(`Skipping unsupported locale "${canonicalLocale}".`);
    return;
  }

  const localeCode = resolveLocaleCode(canonicalLocale, availableLocales);
  const endpoint = `/api/global?locale=${encodeURIComponent(localeCode)}`;
  const payload = { data: { navigation } };

  const res = await strapiFetch(endpoint, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed locale ${canonicalLocale} (${localeCode}): ${res.status} ${text}`);
  }

  const json = await res.json();
  const id = json?.data?.documentId || json?.data?.id || "ok";
  console.log(`Locale ${canonicalLocale} (${localeCode}) seeded. id=${id}`);
}

async function main() {
  console.log(`Seeding Global.navigation on ${STRAPI_URL}`);
  const availableLocales = await getAvailableLocales();
  if (availableLocales.length > 0) {
    console.log(`Detected Strapi locales: ${availableLocales.join(", ")}`);
  } else {
    console.log("Could not detect locales from Strapi; using canonical locale codes directly.");
  }

  for (const locale of TARGET_LOCALES) {
    await seedLocale(locale, availableLocales);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
