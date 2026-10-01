import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(120deg, #af0000 0%, #7f1d1d 55%, #b45309 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Nov 11–14, 2026 · Yenagoa
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.05,
            marginTop: 16,
          }}
        >
          Values Re-orientation: Hope for a Better Nigeria
        </div>
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.85 }}>
          19th Inspired Niger Delta Schools Conference
        </div>
      </div>
    ),
    { ...size }
  );
}
