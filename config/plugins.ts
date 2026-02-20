export default ({ env }) => ({
  // i18n plugin (included by default in Strapi v5)
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'fr',
      locales: ['fr', 'en', 'es'],
    },
  },
  // Local upload (default) - Cloudinary disabled for now
  // To re-enable Cloudinary, uncomment the upload config below and set env vars
  // upload: {
  //   config: {
  //     provider: '@strapi/provider-upload-cloudinary',
  //     providerOptions: {
  //       cloud_name: env('CLOUDINARY_NAME'),
  //       api_key: env('CLOUDINARY_KEY'),
  //       api_secret: env('CLOUDINARY_SECRET'),
  //     },
  //     actionOptions: {
  //       upload: {},
  //       uploadStream: {},
  //       delete: {},
  //     },
  //   },
  // },
  // SEO plugin
  seo: {
    enabled: true,
  },
});
