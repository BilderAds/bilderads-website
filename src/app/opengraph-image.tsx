import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BilderAds — Mehr zahlende Kunden für lokale Dienstleister";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 25% 20%, rgba(58,5,96,0.85) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(181,84,250,0.45) 0%, transparent 60%), #000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 80px",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #3a0560 0%, #7c3aed 50%, #b554fa 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            Ba
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            BilderAds
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              fontWeight: 500,
              color: "#d6c2ff",
              padding: "10px 22px",
              border: "1px solid rgba(181,84,250,0.45)",
              borderRadius: 999,
              alignSelf: "flex-start",
              background: "rgba(58,5,96,0.5)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#b554fa",
              }}
            />
            3.700.000 €+ für Kunden generiert
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2.4,
              lineHeight: 1.08,
              maxWidth: 980,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Mehr zahlende Kunden</div>
            <div>für dein Business.</div>
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Google Ads, Website &amp; Anzeigen für lokale Dienstleister.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <div>bilderads.de</div>
          <div style={{ display: "flex", gap: 28 }}>
            <span>Google Ads</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <span>Website</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <span>Lokal</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
