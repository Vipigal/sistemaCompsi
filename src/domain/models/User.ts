export type UserType = "ALUNO" | "ADMIN" | "GERENCIAL";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
	profilePicUrl: string | null;
  userType: UserType;
  description: string | null;
}
