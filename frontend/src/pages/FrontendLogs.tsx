import { useState } from "react";
import type { FrontLogEntry } from "../types";

export default function FrontendLogs() {
  const [logs] = useState<FrontLogEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("frontend_logs") || "[]");
    } catch {
      return [];
    }
  });

  function downloadLogs() {
    const text = logs.map((l) => JSON.stringify(l)).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "frontend_logs.txt";
    a.click();
  }

  return (
    <div className="app-container logs-page">
      <h1 className="logs-title">Frontend Logs</h1>

      <button className="logs-download-btn" onClick={downloadLogs}>
        Download Logs
      </button>

      <div className="logs-box">
        {logs.map((l, i) => (
          <pre key={i}>{JSON.stringify(l, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
}
