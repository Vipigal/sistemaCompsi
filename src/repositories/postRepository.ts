import prisma from "../config/dbConfig";
import { PostAttributes } from "../domain/postService";
import { Optional } from "../utils/option";

export interface IPostRepository {
  createPost(
    body: Optional<PostAttributes, "id">
  ): Promise<PostAttributes | null>;
  getPostById(id: number): Promise<PostAttributes | null>;
}

export const PostRepository: IPostRepository = {
  createPost: async (body: Optional<PostAttributes, "id">) => {
    try {
      const newPost = await prisma.post.create({
        data: body,
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
};