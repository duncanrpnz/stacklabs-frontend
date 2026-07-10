import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The stacked-block "l" from the StackLabs wordmark.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: "#262c3d",
        }}
      >
        <div style={{ width: 84, height: 32, background: "#5B7FF0" }} />
        <div style={{ width: 84, height: 32, background: "#9CA3AF" }} />
        <div style={{ width: 84, height: 32, background: "#FAFAF9" }} />
      </div>
    ),
    { ...size }
  );
}
