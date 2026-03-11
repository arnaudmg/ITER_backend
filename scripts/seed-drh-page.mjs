#!/usr/bin/env node
/**
 * Seed the DRH Externalise Page single type with the 45 HR services.
 *
 * Usage:
 *   STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=your-api-token node scripts/seed-drh-page.mjs
 *
 * Or with locale:
 *   STRAPI_URL=... STRAPI_TOKEN=... LOCALE=fr node scripts/seed-drh-page.mjs
 *
 * STRAPI_TOKEN: API token with put permission on drh-externalise-page (or full access).
 * STRAPI_URL: Strapi base URL (no trailing slash), e.g. http://localhost:1337 or https://your-strapi.cloud
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const LOCALE = process.env.LOCALE || 'fr';

if (!STRAPI_TOKEN) {
  console.error('Missing STRAPI_TOKEN. Set it in the environment.');
  process.exit(1);
}

// Inline the 45 services (single source: keep in sync with iter-front lib/content/drh-services-data.ts if you change there)
const serviceCategories = [
  {
    categoryName: "Audit RH initial & diagnostic",
    services: [
      { title: "Audit RH initial & diagnostic", description: "État des lieux complet : contrats, paie, conformité, organigramme et risques sociaux.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Gestion administrative du personnel", description: "Gestion des contrats, avenants, DPAE, registre du personnel et dossiers des salariés.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Veille réglementaire & conformité", description: "Suivi du droit du travail (FRIES), conventions collectives, RGPD et affichages obligatoires.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Gestion des temps & absences", description: "Suivi des congés, RTT, arrêts maladie, mise en place d'outils de suivi.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Relations avec organismes sociaux", description: "Gestion URSSAF, mutuelle, prévoyance, médecine du travail et OPCO.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Coordination paie (avec cabinet comptable)", description: "Interface avec la gestion de la paie, variables mensuelles et contrôle de paie.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Rédaction règlement intérieur & chartes", description: "Rédaction du règlement intérieur, charte télétravail, charte informatique et politique de déplacements.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Recrutement & talent acquisition",
    services: [
      { title: "Définition des besoins & fiches de poste", description: "Cadrage des besoins avec les managers, rédaction des fiches de poste.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Sourcing & diffusion d'offres", description: "Multiposting, LinkedIn, job boards spécialisés, cooptation.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Pré-sélection & entretiens", description: "Analyse des CV, entretiens structurés, grilles d'évaluation et shortlist.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Mise en place ATS", description: "Déploiement et paramétrage d'un outil de recrutement (ATS).", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Employer branding", description: "Page carrières, contenu marque employeur, présence LinkedIn.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
      { title: "Coordination cabinets de recrutement", description: "Briefing, suivi, négociation des honoraires et relation avec les cabinets.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Onboarding & offboarding",
    services: [
      { title: "Parcours d'intégration structuré", description: "Pack d'accueil, planning d'onboarding, points de suivi J+30 / J+90.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Livret d'accueil & documentation", description: "Création du livret d'accueil, processus d'onboarding, mise en place du mentorat.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Gestion des départs", description: "Procédures de départ, entretiens de sortie, solde de tout compte, restitution du matériel.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Exit interviews & analyse turnover", description: "Entretiens structurés, analyse des causes de départ et recommandations de rétention.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Rémunération & avantages sociaux",
    services: [
      { title: "Benchmark salarial & grille de rémunération", description: "Étude de marché, construction de grilles par niveau / métier, équité interne.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Politique de variable & bonus", description: "Conception des dispositifs variables, OKRs liés à la rémunération.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Avantages sociaux & BSI", description: "Mutuelle, prévoyance, titres-restaurant, BSI (bilan social individuel).", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Plans de stock-options / BSPCE / SAR", description: "Conseil sur les mécanismes d'intéressement (startups).", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
      { title: "Optimisation coût employeur", description: "Analyse du coût total, leviers d'optimisation des charges sociales.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Développement RH & performance",
    services: [
      { title: "Entretiens annuels & professionnels", description: "Conception du processus, modèles, formation des managers, suivi.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Plan de formation & développement", description: "Identification des besoins, plan de formation, relation OPCO.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Gestion des carrières & mobilité", description: "Parcours carrière, matrice des compétences, plans de succession.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
      { title: "People review & talent mapping", description: "Cartographie des talents, grille 9-box, plans de développement individuels.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
      { title: "Enquêtes engagement & climat social", description: "Baromètre interne, eNPS, analyse et plan d'action.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Organisation & culture",
    services: [
      { title: "Design organisationnel", description: "Organigramme, définition des rôles, matrice RACI, structuration des équipes.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Culture d'entreprise & valeurs", description: "Formalisation des valeurs, rituels d'équipe, culture code.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
      { title: "Politique de télétravail & flexibilité", description: "Cadre juridique et organisationnel du télétravail et du travail hybride.", tier1: true, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "QVT & bien-être au travail", description: "Prévention des RPS, actions bien-être, conformité DUERP.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Coaching managérial", description: "Coaching individuel et collectif des managers.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Relations sociales & juridique RH",
    services: [
      { title: "Mise en place & animation CSE", description: "Organisation des élections, réunions, PV, relations avec les IRP.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Gestion des conflits & disciplinaire", description: "Médiation, procédures disciplinaires, sanctions, licenciements.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Accompagnement restructuration", description: "PSE, PDV, licenciements économiques, ruptures conventionnelles collectives.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
      { title: "Contentieux prud'homal (coordination)", description: "Interface avec les avocats, préparation des dossiers, stratégie contentieuse.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "SIRH & digitalisation RH",
    services: [
      { title: "Sélection & déploiement SIRH", description: "Cahier des charges, benchmark d'outils, déploiement (Factorial, Personio, etc.).", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Digitalisation des process RH", description: "Dématérialisation, workflows, signatures électroniques.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "KPIs RH & tableaux de bord", description: "Tableau de bord turnover, absentéisme, coût par recrutement, eNPS.", tier1: false, tier2: true, tier3: true, tier4: true, isAddOn: false },
      { title: "Data RH & reporting direction", description: "Reporting RH mensuel pour le CODIR, audits sociaux, analytics.", tier1: false, tier2: false, tier3: true, tier4: true, isAddOn: false },
    ],
  },
  {
    categoryName: "Missions ponctuelles (add-ons)",
    services: [
      { title: "Audit RH flash (one-shot)", description: "Diagnostic express en 2–3 jours, rapport et recommandations prioritaires.", tier1: false, tier2: false, tier3: false, tier4: false, isAddOn: true },
      { title: "Due diligence RH (M&A / fundraising)", description: "Revue des risques sociaux, conformité et coûts cachés pour les investisseurs.", tier1: false, tier2: false, tier3: false, tier4: false, isAddOn: true },
      { title: "Accompagnement levée de fonds (volet RH)", description: "Deck RH investisseurs, plan d'organisation, plan de recrutement, projections de coûts.", tier1: false, tier2: false, tier3: false, tier4: false, isAddOn: true },
      { title: "Transition / remplacement DRH", description: "Intérim de la fonction DRH pendant un recrutement ou une absence.", tier1: false, tier2: false, tier3: false, tier4: false, isAddOn: true },
      { title: "Formation équipe RH interne", description: "Montée en compétences des collaborateurs RH juniors.", tier1: false, tier2: false, tier3: false, tier4: false, isAddOn: true },
    ],
  },
];

const payload = {
  data: {
    heroTitle: "DRH externalisé : une direction RH flexible et experte",
    heroSubtitle: "Pour les PME et startups en croissance, la fonction RH est un levier stratégique. Le DRH externalisé vous apporte l'expertise et la structuration nécessaires sans le coût d'un poste à temps plein.",
    serviceCategories,
  },
};

const url = `${STRAPI_URL.replace(/\/$/, '')}/api/drh-externalise-page?locale=${LOCALE}`;

console.log(`Putting drh-externalise-page for locale=${LOCALE} to ${url} ...`);

const res = await fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
  },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  const text = await res.text();
  console.error(`Strapi responded ${res.status}: ${text}`);
  process.exit(1);
}

const json = await res.json();
console.log('Done. Document id:', json.data?.documentId ?? json.data?.id ?? 'ok');
