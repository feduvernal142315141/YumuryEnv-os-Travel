import type { Metadata } from "next";

const SITE_NAME = "Yumury Envíos & Travel";
const BASE_URL = "https://yumuryenvios.com";

export function createMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export function createProductJsonLd(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  slug: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency ?? "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/producto/${product.slug}`,
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 0,
      },
    }),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Marketplace premium de envíos desde Miami a la provincia de Matanzas, Cuba.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1234 SW 8th Street",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33135",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-786-555-0100",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [],
};
