export type Status = "NOVO" | "TRANSFERIDO" | "RESPONDIDO" | "ESPERA" | "RESOLVIDO";

export interface TicketAttributes {
  id: number;
  title: string;
  content: string;
  status: Status;
  authorEmail: string | null;
}