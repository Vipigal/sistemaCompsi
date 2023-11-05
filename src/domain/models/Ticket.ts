import { UserAttributes } from "./User";

export type StatusType = "NOVO" | "TRANSFERIDO" | "RESPONDIDO"| "ESPERA"| "RESOLVIDO";

export interface TicketAttributes {
  id: number;
  title: string;
  content: string;
  statusType: StatusType;
 //author: UserAttributes;
  authorId: number;
}