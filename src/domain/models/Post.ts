export interface PostAttributes {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
}
