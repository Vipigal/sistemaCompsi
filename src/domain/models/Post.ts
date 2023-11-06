export type PostType = "BANNER" | "SOBRE" | "GESTAO" | "TICKET" | "DEFAULT";


export interface PostAttributes {
  id: number;
  title: string;
  subtitle: string | null;
  imageURL: string | null;
  description: string | null;
  published: boolean;
  authorEmail: string | null;
  type: PostType;
  createdAt: Date;
}
