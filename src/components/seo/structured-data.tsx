const SITE_URL = "https://bilderads.de";

const FAQS = [
  {
    q: "Funktioniert das auch für mein Business?",
    a: "Wenn du lokaler Dienstleister bist (Maler, Elektriker, Sanitär, Reinigung, Glaser, Entrümpelung, Schlüsseldienst, Dachdecker) – ja. Wir testen das im Erstgespräch in 5 Minuten.",
  },
  {
    q: "Für wen ist BilderAds geeignet?",
    a: "Inhaber lokaler Dienstleister, die mehr zahlende Kunden wollen, ohne selber Werbung machen zu müssen. Du musst die Aufträge nur abarbeiten können.",
  },
  {
    q: "Macht ihr nur Creatives oder auch Strategie?",
    a: "Beides. Werbeanzeigen, Website, Google Business Profil, Zielgruppen, Budget, Reporting. Komplettes Performance-Setup, nicht nur hübsche Bilder.",
  },
  {
    q: "Schaltet ihr auch die Ads (Media Buying)?",
    a: "Ja. Google Ads, optional Facebook und Instagram (Black Diamond). Du musst nichts selber klicken.",
  },
  {
    q: "Wie läuft die Zusammenarbeit ab?",
    a: "1. Erstgespräch. 2. Onboarding-Call (60 Min). 3. Wir bauen Ads + Website. 4. Anzeigen gehen live. 5. Wöchentlicher Performance-Bericht. Du musst nur dabei sein.",
  },
  {
    q: "Muss ich einen Call machen?",
    a: "Ja, einen kurzen. 30 Minuten. Wir gucken ob wir zusammen passen. Kein Verkaufsdruck, keine Folie.",
  },
  {
    q: "Was kostet BilderAds?",
    a: "Gold 3.000 € pro Monat, Black Diamond 5.000 € pro Monat. Dazu dein Google-Ads-Budget (zahlst direkt an Google). Mindestlaufzeit 3 Monate, danach monatlich kündbar.",
  },
  {
    q: "Arbeitet ihr mit jedem?",
    a: "Nein. Aktuell nehmen wir nur lokale Dienstleister, und auch nur wenn wir glauben, dass wir Ergebnisse liefern können. Nicht jede Branche, nicht jede Stadt.",
  },
];

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BilderAds",
    url: SITE_URL,
    logo: `${SITE_URL}/bilderads-logo.png`,
    email: "info@bilderads.de",
    founder: {
      "@type": "Person",
      name: "Kevin Zahn",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "An der Glasfachschule 44",
      postalCode: "53359",
      addressLocality: "Rheinbach",
      addressCountry: "DE",
    },
    vatID: "DE370110057",
    sameAs: [
      "https://www.instagram.com/bilderads/",
      "https://www.tiktok.com/@bilderads",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}#business`,
    name: "BilderAds",
    description:
      "Performance-Marketing-Agentur für lokale Dienstleister. Google Ads, Website & Anzeigen. Mehr zahlende Kunden, planbar jede Woche.",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/bilderads-logo.png`,
    email: "info@bilderads.de",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "An der Glasfachschule 44",
      postalCode: "53359",
      addressLocality: "Rheinbach",
      addressCountry: "DE",
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    knowsAbout: [
      "Google Ads",
      "Performance Marketing",
      "Website-Optimierung",
      "Lokales Marketing",
      "Lead-Generierung",
      "Google Business Profil",
      "Meta Ads",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "8",
      bestRating: "5",
      worstRating: "5",
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Performance Marketing für lokale Dienstleister",
    provider: { "@id": `${SITE_URL}#business` },
    serviceType: "Google Ads Management & Website-Bau",
    areaServed: { "@type": "Country", name: "Deutschland" },
    description:
      "Komplettes Performance-Setup: Google Ads, Landing Page, Google Business Profil Optimierung, wöchentliches Reporting. Speziell für lokale Dienstleister (Maler, Elektriker, Sanitär, Reinigung, Glaser, Schlüsseldienst, Dachdecker, Entrümpelung).",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BilderAds Pakete",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Gold",
          description:
            "Google Ads, Website inklusive, Google Business Profil, wöchentlicher Performance-Bericht, wöchentliche Update-Meetings.",
          price: "3000",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "3000",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
          eligibleRegion: { "@type": "Country", name: "DE" },
        },
        {
          "@type": "Offer",
          name: "Black Diamond",
          description:
            "Alles aus Gold plus Meta Ads (Facebook + Instagram), erweiterte Optimierung, schnellere Reporting-Zyklen.",
          price: "5000",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "5000",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
          eligibleRegion: { "@type": "Country", name: "DE" },
        },
      ],
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BilderAds",
    url: SITE_URL,
    inLanguage: "de-DE",
    publisher: { "@id": `${SITE_URL}#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
