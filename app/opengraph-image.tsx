import { ImageResponse } from "next/og";

export const alt =
  "StackLabs - software development studio in Cambridge, New Zealand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#262c3d",
          color: "#f2f4f9",
        }}
      >
        <div style={{ display: "flex", fontSize: 92 }}>
          <span style={{ fontWeight: 800 }}>Stack</span>
          <span style={{ fontWeight: 300 }}>Labs</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            fontWeight: 400,
            color: "#aeb8cc",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Prototypes and production systems for founders and growing teams.
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 28,
            color: "#6366f1",
            fontWeight: 600,
          }}
        >
          Cambridge, New Zealand · stacklabs.co.nz
        </div>
      </div>
    ),
    { ...size }
  );
}
