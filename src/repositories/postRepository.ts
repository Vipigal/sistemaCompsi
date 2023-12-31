import prisma from "../config/dbConfig";
import { PostAttributes } from "../domain/models/Post";
import { Optional } from "../utils/option";
import { PostType } from "../domain/models/Post";

export interface IPostRepository {
  createPost(body: Optional<PostAttributes, "id">, email: string): Promise<PostAttributes | null>;
  getPostById(id: number): Promise<PostAttributes | null>;
  getAllPosts(type: PostType | null): Promise<PostAttributes[] | null>;
  deletePostByID(id: number): void;
  updatePostByID(id: number, body: Partial<PostAttributes>): Promise<PostAttributes | null>;
}

export const PostRepository: IPostRepository = {
  createPost: async (body: Optional<PostAttributes, "id">, email: string) => {
    try {
      const newPost = await prisma.post.create({
        data: {
          title: body.title,
          imageURL: body.imageURL,
          description: body.description,
          authorEmail: email,
          type: body.type
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
  async getAllPosts(type: PostType | null) {
    try {
      let post;
      if (!type)
        post = await prisma.post.findMany();
      else
        if (type === "BANNER" || type === "DEFAULT")
          post = await prisma.post.findMany({
            where: { type: type }
          });
        else
          post = await prisma.post.findFirst({
            where: { type: type },
            orderBy: { createdAt: 'desc' }
          });
      if (post) return post as PostAttributes[];
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deletePostByID: async (id: number) => {
    try {
      await prisma.post.delete({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  updatePostByID: async (id: number, body: Partial<PostAttributes>) => {
    try {
      const updatedPost = await prisma.post.update({
        where: { id: id },
        data: body
      });
      return updatedPost;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
};
