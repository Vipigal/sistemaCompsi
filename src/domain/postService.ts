import { PostRepository } from "../repositories/postRepository";

export type UserType = "ALUNO" | "ADMIN" | "GERENCIAL";

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  published: boolean;
  userType: UserType;
  authorId: number;
}
const postService = {
  createPost: async (body: PostAttributes) => {
    if (!body.title || !body.content) {
      throw new Error("O título e o conteúdo são obrigatórios.");
    }
    await PostRepository.createPost(body);
    return "Post criado";
  },
  getPostById: async (id: number) => {
    const post = await PostRepository.getPostById(id);
    if (PostRepository) return post;
    else throw new Error("Nenhum post cadastrado");
  },
};

export default postService;
