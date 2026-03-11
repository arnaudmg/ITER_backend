# Seed de la page DRH Externalisé

Ce script remplit le single type **drh-externalise-page** avec les 45 services RH (grille) pour une locale donnée.

## Prérequis

1. **Strapi doit être démarré** (au moins une fois) pour que les types `drh-externalise-page` et `drh-temps-partage-page` soient créés (les schémas sont dans `src/api/` et `src/components/drh/`).
2. **Créer un API Token** dans l’admin Strapi : Settings → API Tokens → Create new API Token, avec au minimum les permissions **put** sur `drh-externalise-page`.
3. Les **locales** (fr, en, es) doivent exister dans Strapi (Settings → Internationalization).

## Utilisation

```bash
# Depuis la racine du projet backend (backendIter)
STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=xxx npm run seed:drh
```

Variables d’environnement :

- **STRAPI_URL** (optionnel) : URL de base de Strapi, sans slash final. Défaut : `http://localhost:1337`.
- **STRAPI_TOKEN** (obligatoire) : token API avec droit d’écriture sur `drh-externalise-page`.
- **LOCALE** (optionnel) : locale à remplir. Défaut : `fr`.

Exemple pour la locale anglaise :

```bash
STRAPI_URL=https://mon-strapi.cloud STRAPI_TOKEN=xxx LOCALE=en npm run seed:drh
```

## Ordre recommandé

1. Démarrer Strapi une fois : `npm run dev` (les nouveaux types et composants DRH sont créés).
2. Créer un API Token avec permission **put** sur `drh-externalise-page`.
3. Lancer le seed : `STRAPI_TOKEN=xxx npm run seed:drh`.
4. Pour EN/ES : soit relancer le script avec `LOCALE=en` puis `LOCALE=es` (le script envoie pour l’instant les libellés FR ; tu pourras adapter les textes dans l’admin), soit remplir les traductions à la main dans l’admin.

## Contenu envoyé

- **heroTitle** et **heroSubtitle** (FR) pour la locale demandée.
- **serviceCategories** : les 9 catégories et 45 lignes de services (titres, descriptions, tier1–tier4, isAddOn).

Les autres champs (content blocks, subPages, faq, seo) restent vides ; tu peux les compléter dans l’admin ou les laisser vides (le front utilise le fallback statique si besoin).
