import prisma from "../config/dbConfig";
import { PostAttributes } from "../domain/models/Post";
import { Optional } from "../utils/option";

export interface IPostRepository {
  createPost(body: Optional<PostAttributes, "id">, email: string): Promise<PostAttributes | null>;
  getPostById(id: number): Promise<PostAttributes | null>;
  getAllPosts(): Promise<PostAttributes[] | null>;
}

export const PostRepository: IPostRepository = {
  createPost: async (body: Optional<PostAttributes, "id">, email: string) => {
    try {
      const newPost = await prisma.post.create({
        data: {
          title: body.title,
          imageURL: body.imageURL,
          description: body.description,
          published: body.published,
          authorEmail: email
        },
      });
      if (newPost) return newPost as PostAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  async getPostById(id: number): Promise<PostAttributes | null> {
    try {
      const post = await prisma.post.findFirst({ where: { id: id } });
      if (post) return post as PostAttributes;
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getAllPosts() {
    try {
      const post = await prisma.post.findMany();
      if (post) return post as PostAttributes[];
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
