import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The stacked-block "l" from the StackLabs wordmark.
export default function Icon() {
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
          gap: 2,
          background: "#262c3d",
          borderRadius: 7,
        }}
      >
        <div style={{ width: 15, height: 6, background: "#5B7FF0" }} />
        <div style={{ width: 15, height: 6, background: "#9CA3AF" }} />
        <div style={{ width: 15, height: 6, background: "#FAFAF9" }} />
      </div>
    ),
    { ...size }
  );
}
