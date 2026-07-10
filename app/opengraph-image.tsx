import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "StackLabs - software development studio in Cambridge, New Zealand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const wordmark = await readFile(
    join(process.cwd(), "public", "stacklabs-wordmark-dark-bg.svg")
  );
  const wordmarkSrc = `data:image/svg+xml;base64,${wordmark.toString("base64")}`;

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
        <img src={wordmarkSrc} width={584} height={80} alt="" />
        <div
          style={{
            marginTop: 40,
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
            color: "#5B7FF0",
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
