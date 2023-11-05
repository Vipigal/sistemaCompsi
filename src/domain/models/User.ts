export type Role = "ALUNO" | "ADMIN" | "GERENCIAL";

import { TicketAttributes } from "./Ticket";
import { PostAttributes } from "./Post";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
	profilePicUrl: string | null;
  userType: Role;
  description: string | null;
}
