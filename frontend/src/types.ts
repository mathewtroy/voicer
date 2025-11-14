export type Sender = "user" | "assistant";

export interface Message {
  id: number;
  sender: Sender;
  text: string;
}
export interface FrontLogEntry {
  timestamp: string;
  event: string;
  data?: unknown;
}
