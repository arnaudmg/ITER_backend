import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    style: Schema.Attribute.Enumeration<['primary', 'secondary', 'link']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.faq-item', true>;
  };
}

export interface BlocksFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    question: Schema.Attribute.String;
  };
}

export interface BlocksFormEmbed extends Struct.ComponentSchema {
  collectionName: 'components_blocks_form_embeds';
  info: {
    displayName: 'Form Embed';
    icon: 'paper-plane';
  };
  attributes: {
    embedCode: Schema.Attribute.Text;
    notes: Schema.Attribute.String;
    provider: Schema.Attribute.Enumeration<
      ['gravityforms', 'hubspot', 'typeform', 'other']
    > &
      Schema.Attribute.DefaultTo<'other'>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
    icon: 'star';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'blocks.cta', false>;
    secondaryCta: Schema.Attribute.Component<'blocks.cta', false>;
    subheading: Schema.Attribute.Text;
  };
}

export interface BlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_images';
  info: {
    displayName: 'Image';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksLogo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logos';
  info: {
    displayName: 'Logo';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksLogoCloud extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_clouds';
  info: {
    displayName: 'Logo Cloud';
    icon: 'apps';
  };
  attributes: {
    logos: Schema.Attribute.Component<'blocks.logo', true>;
  };
}

export interface BlocksPricingTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_tables';
  info: {
    displayName: 'Pricing Table';
    icon: 'dollar-sign';
  };
  attributes: {
    plans: Schema.Attribute.JSON;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'align-left';
  };
  attributes: {
    html: Schema.Attribute.RichText;
    source: Schema.Attribute.Enumeration<['wp_html', 'manual']> &
      Schema.Attribute.DefaultTo<'wp_html'>;
  };
}

export interface BlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats';
  info: {
    displayName: 'Stats';
    icon: 'chart-bar';
  };
  attributes: {
    items: Schema.Attribute.JSON;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'quote-right';
  };
  attributes: {
    authorImage: Schema.Attribute.Media<'images'>;
    authorName: Schema.Attribute.String;
    authorTitle: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
  };
}

export interface ContactOffice extends Struct.ComponentSchema {
  collectionName: 'components_contact_offices';
  info: {
    description: 'Office location';
    displayName: 'Office';
    icon: 'pinMap';
  };
  attributes: {
    address: Schema.Attribute.Text;
    city: Schema.Attribute.String;
    email: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface DrhServiceCategory extends Struct.ComponentSchema {
  collectionName: 'components_drh_service_categories';
  info: {
    description: 'Category of HR services (e.g. Audit RH, Recrutement) with a list of service rows';
    displayName: 'DRH Service Category';
    icon: 'folder';
  };
  attributes: {
    categoryName: Schema.Attribute.String & Schema.Attribute.Required;
    services: Schema.Attribute.Component<'drh.service-row', true>;
  };
}

export interface DrhServiceRow extends Struct.ComponentSchema {
  collectionName: 'components_drh_service_rows';
  info: {
    description: 'One service line in the DRH services grid (title, description, tier flags, add-on)';
    displayName: 'DRH Service Row';
    icon: 'file';
  };
  attributes: {
    description: Schema.Attribute.Text;
    isAddOn: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tier1: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tier2: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tier3: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tier4: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    description: 'Footer content';
    displayName: 'Footer';
    icon: 'apps';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

export interface GlobalNavItem extends Struct.ComponentSchema {
  collectionName: 'components_global_nav_items';
  info: {
    description: 'Navigation menu item';
    displayName: 'Navigation Item';
    icon: 'layer';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.cta-link', true>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GlobalRating extends Struct.ComponentSchema {
  collectionName: 'components_global_ratings';
  info: {
    description: 'Aggregate rating (e.g. Trustfolio)';
    displayName: 'Aggregate Rating';
    icon: 'star';
  };
  attributes: {
    count: Schema.Attribute.Integer;
    platform: Schema.Attribute.String;
    score: Schema.Attribute.String;
  };
}

export interface GlobalSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_global_social_links';
  info: {
    description: 'Social media link';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HomepageStatistic extends Struct.ComponentSchema {
  collectionName: 'components_homepage_statistics';
  info: {
    description: 'Statistic counter';
    displayName: 'Statistic';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface HomepageValueProp extends Struct.ComponentSchema {
  collectionName: 'components_homepage_value_props';
  info: {
    description: 'Value proposition item';
    displayName: 'Value Proposition';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface HomepageWhyChoose extends Struct.ComponentSchema {
  collectionName: 'components_homepage_why_chooses';
  info: {
    description: 'Reason to choose us';
    displayName: 'Why Choose Us';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedCtaLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_links';
  info: {
    description: 'Call-to-action link';
    displayName: 'CTA Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    description: 'Question/Answer pair';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata component';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogImage: Schema.Attribute.Media<'images'>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSubPageCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_sub_page_cards';
  info: {
    description: 'Card linking to a sub-page';
    displayName: 'Sub Page Card';
    icon: 'layout';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface TestimonialResult extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_results';
  info: {
    description: 'Key result metric';
    displayName: 'Result';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.Text;
    metric: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.cta': BlocksCta;
      'blocks.faq': BlocksFaq;
      'blocks.faq-item': BlocksFaqItem;
      'blocks.form-embed': BlocksFormEmbed;
      'blocks.hero': BlocksHero;
      'blocks.image': BlocksImage;
      'blocks.logo': BlocksLogo;
      'blocks.logo-cloud': BlocksLogoCloud;
      'blocks.pricing-table': BlocksPricingTable;
      'blocks.rich-text': BlocksRichText;
      'blocks.stats': BlocksStats;
      'blocks.testimonial': BlocksTestimonial;
      'contact.office': ContactOffice;
      'drh.service-category': DrhServiceCategory;
      'drh.service-row': DrhServiceRow;
      'global.footer': GlobalFooter;
      'global.nav-item': GlobalNavItem;
      'global.rating': GlobalRating;
      'global.social-link': GlobalSocialLink;
      'homepage.statistic': HomepageStatistic;
      'homepage.value-prop': HomepageValueProp;
      'homepage.why-choose': HomepageWhyChoose;
      'shared.cta-link': SharedCtaLink;
      'shared.faq-item': SharedFaqItem;
      'shared.seo': SharedSeo;
      'shared.sub-page-card': SharedSubPageCard;
      'testimonial.result': TestimonialResult;
    }
  }
}
