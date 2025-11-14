export function logFrontend(event: string, data?: unknown) {
  if (data !== undefined) {
    console.log(`[FRONT] ${event}`, data);
  } else {
    console.log(`[FRONT] ${event}`);
  }
}
