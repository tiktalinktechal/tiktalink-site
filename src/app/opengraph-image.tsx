import { ImageResponse } from "next/og";

export const alt = "Tiktalink Digital Evolution Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#0B1020",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: 12 }}>TIKTALINK</div>
        <div style={{ marginTop: 26, fontSize: 36 }}>Digital Evolution Systems</div>
        <div style={{ marginTop: 44, width: 680, height: 12, borderRadius: 999, background: "linear-gradient(90deg,#00D9FF,#8B6A4A,#7C3AED)" }} />
        <div style={{ marginTop: 34, fontSize: 28, color: "#4B5563" }}>
          Water → Land → Link → Tech → AI
        </div>
      </div>
    ),
    size
  );
}

