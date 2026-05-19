import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalShell } from "@/components/sections/legal-shell";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      title: "Imprint | BilderAds",
      description: "Legal imprint and provider information for BilderAds.",
    };
  }
  return {
    title: "Impressum | BilderAds",
    description: "Impressum und Anbieterkennzeichnung der BilderAds.",
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations();

  if (locale === "en") {
    return <ImprintEN />;
  }
  return <ImpressumDE />;
}

function ImpressumDE() {
  return (
    <LegalShell title="Impressum" kicker="Über BilderAds" updated="15. Februar 2026">
      <h2>Angaben gemäß §5 TMG</h2>
      <p>
        BilderAds
        <br />
        Kevin Zahn
        <br />
        An der Glasfachschule 44
        <br />
        53359 Rheinbach
        <br />
        Deutschland, DE
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:info@bilderads.de">info@bilderads.de</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE
        370 110 057
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        BilderAds
        <br />
        Kevin Zahn
        <br />
        An der Glasfachschule 44
        <br />
        53359 Rheinbach
        <br />
        Deutschland, DE
      </p>

      <h2>Webdesign &amp; Entwicklung</h2>
      <p>
        HORUS Studios
        <br />
        Boschstraße 12
        <br />
        53359 Rheinbach
      </p>
      <p>
        Website:{" "}
        <a href="https://www.horus-studios.com" target="_blank" rel="noopener noreferrer">
          www.horus-studios.com
        </a>
        <br />
        E-Mail: <a href="mailto:info@horus-studios.com">info@horus-studios.com</a>
        <br />
        Telefon: +49 2226 89 229 13
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
        (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
        einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
      <p>
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
        werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
        Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Inhalte umgehend entfernen.
      </p>
    </LegalShell>
  );
}

function ImprintEN() {
  return (
    <LegalShell title="Imprint" kicker="About BilderAds" updated="February 15, 2026">
      <p>
        <em>
          Note: BilderAds is a German business. The legally binding imprint
          information follows German law (§5 TMG). This English version is
          provided for your convenience.
        </em>
      </p>

      <h2>Information according to §5 TMG</h2>
      <p>
        BilderAds
        <br />
        Kevin Zahn
        <br />
        An der Glasfachschule 44
        <br />
        53359 Rheinbach
        <br />
        Germany, DE
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:info@bilderads.de">info@bilderads.de</a>
      </p>

      <h2>VAT ID</h2>
      <p>
        VAT identification number according to §27a German VAT Act: DE 370 110 057
      </p>

      <h2>Editorially responsible</h2>
      <p>
        BilderAds
        <br />
        Kevin Zahn
        <br />
        An der Glasfachschule 44
        <br />
        53359 Rheinbach
        <br />
        Germany, DE
      </p>

      <h2>Web design and development</h2>
      <p>
        HORUS Studios
        <br />
        Boschstraße 12
        <br />
        53359 Rheinbach
      </p>
      <p>
        Website:{" "}
        <a href="https://www.horus-studios.com" target="_blank" rel="noopener noreferrer">
          www.horus-studios.com
        </a>
        <br />
        Email: <a href="mailto:info@horus-studios.com">info@horus-studios.com</a>
        <br />
        Phone: +49 2226 89 229 13
      </p>

      <h2>EU dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution
        (OS):{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Our email address is listed above.
      </p>

      <h2>Consumer dispute resolution</h2>
      <p>
        We are not willing or obliged to take part in dispute resolution proceedings
        before a consumer arbitration board.
      </p>

      <h2>Liability for content</h2>
      <p>
        As a service provider, we are responsible for our own content on these
        pages under §7 (1) DDG and general law. According to §§8 to 10 DDG, as a
        service provider, we are not obliged to monitor transmitted or stored
        third-party information or to investigate circumstances pointing to
        illegal activity. Obligations to remove or block the use of information
        under general law remain unaffected. Liability is only possible from the
        time we know of a specific infringement. When we learn of such
        infringements, we will remove the content right away.
      </p>

      <h2>Liability for links</h2>
      <p>
        Our offer contains links to external websites of third parties whose
        content we have no influence over. Therefore, we cannot assume any
        responsibility for this external content. The respective provider or
        operator of the pages is always responsible for the content of linked
        pages. The linked pages were checked for possible legal violations at the
        time of linking. Illegal content was not visible at the time of linking. A
        permanent content check of the linked pages is not reasonable without
        specific evidence of a legal violation. If we learn of legal violations,
        we will remove such links right away.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works on these pages created by the site operators are
        subject to German copyright law. Duplication, processing, distribution,
        and any kind of use outside the limits of copyright require the written
        consent of the respective author or creator. Downloads and copies of this
        site are only allowed for private, non-commercial use.
      </p>
      <p>
        If the content on this page was not created by the operator, third-party
        copyrights are respected. In particular, third-party content is marked as
        such. Should you still notice a copyright violation, please let us know.
        When we learn of legal violations, we will remove such content right away.
      </p>
    </LegalShell>
  );
}
