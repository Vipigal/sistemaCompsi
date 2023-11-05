import { UserAttributes } from "./User";

export interface PostAttributes {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
 // author : UserAttributes;
  authorId: number;
}
