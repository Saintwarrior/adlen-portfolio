import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "ADLEN — студия разработки интернет-продуктов";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0907",
          color: "#F2EDE4",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8A857B",
            fontFamily: "monospace",
          }}
        >
          <span>ADLEN · STUDIO · ALMATY</span>
          <span>EST 2019</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
          <span style={{ fontSize: 120, letterSpacing: "-0.03em", fontWeight: 500 }}>
            Делаем интернет-продукты,
          </span>
          <span
            style={{
              fontSize: 120,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              display: "flex",
              gap: 24,
            }}
          >
            которые{" "}
            <span style={{ fontStyle: "italic", color: "#D4FF4A" }}>
              работают.
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#A9A299",
            fontFamily: "monospace",
          }}
        >
          <span>14 проектов · 8 инженеров · 6 лет один состав</span>
          <span>adlen.kz</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
