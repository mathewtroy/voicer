export function logFrontend(event: string, data?: unknown) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    data,
  };

  console.log("[FRONT]", entry);

  const logs = JSON.parse(localStorage.getItem("frontend_logs") || "[]");
  logs.push(entry);
  localStorage.setItem("frontend_logs", JSON.stringify(logs));
}
