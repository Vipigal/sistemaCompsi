import { UserAttributes } from "./User";

export interface PostAttributes {
  id: number;
  title: string;
  imageURL: string | null;
  description: string | null;
  published: boolean;
  authorEmail: string | null;
}
