export type Sender = "user" | "assistant";

export interface Message {
  id: number;
  sender: Sender;
  text: string;
}
