import { get } from "http";
import { PostRepository } from "../repositories/postRepository";
import { TrataErrorUtil } from "../utils/errorHandler";
import { UserAttributes } from "./models/User";

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}
const postService = {
  async createPost(body: PostAttributes) {
    try {
      const { id, title, content, published, authorId } = body;
      const existingPost = await PostRepository.getPostById(id);

      if (existingPost) 
        throw new Error("id em uso");
    
        await PostRepository.createPost(body);
        return "Post criado";
        
      } catch (error: unknown) {
       return TrataErrorUtil(error);
    }
  },
  async getPostById (id: number) {
    const post = PostRepository.getPostById(id);
    return post;
  },

};

export default postService;
