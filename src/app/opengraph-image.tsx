import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}: Power BI, SQL, DAX and Python`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bars = [120, 170, 150, 230, 205, 290, 260, 340];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0e14",
          color: "#edf0f4",
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#3fc1d6" }}>
            DATA ANALYST · POWER BI · SQL · PYTHON
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, color: "#86dcea" }}>
              Data Analyst.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9aa3b2" }}>
            Power BI · SQL · DAX · Python — loyalty, retail & operations analytics
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, position: "absolute", right: 72, bottom: 72 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                width: 34,
                height: h,
                borderRadius: 6,
                background: i === bars.length - 1 ? "#e3a94b" : "#3fc1d6",
                opacity: 0.35 + i * 0.08,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
