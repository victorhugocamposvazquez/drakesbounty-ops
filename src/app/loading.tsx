import { Work_Sans } from "next/font/google";

const work = Work_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function RootLoading() {
  return (
    <div
      className={work.className}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "#E8DCC0",
        color: "#1A130C",
        fontSize: 14,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#762525",
          animation: "pulse 1.2s ease-in-out infinite",
        }}
      />
      <p style={{ margin: 0, letterSpacing: "0.2em", textTransform: "uppercase" as const, fontSize: 9 }}>
        Cargando
      </p>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(1.2); } }`}</style>
    </div>
  );
}
