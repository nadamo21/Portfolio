import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const bar = (h: number, color: string) => (
    <div style={{ width: 26, height: h, borderRadius: 6, background: color }} />
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 14,
          paddingBottom: 42,
          background: "#13171f",
        }}
      >
        {bar(46, "#3fc1d6")}
        {bar(74, "rgba(63,193,214,.75)")}
        {bar(102, "#e3a94b")}
      </div>
    ),
    size,
  );
}
