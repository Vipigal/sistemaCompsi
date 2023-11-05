import { PostRepository } from "../../repositories/postRepository";
import { PostAttributes } from "../models/Post";

const postService = {
  createPost: async (body: PostAttributes, email: string | undefined) => {
    if (!body.title) {
      throw new Error("O título é obrigatório.");
    }
    body.published = true;
    if (!email) {
      throw new Error("Usuário não logado")
    }
    await PostRepository.createPost(body, email);
    return "Post criado";
  },
  getPostById: async (id: number) => {
    const post = await PostRepository.getPostById(id);
    if (post) return post;
    else throw new Error("Nenhum post cadastrado");
  },
  listPosts: async (limit: number, page: number) => {
    if (page < 1) {
      throw new Error("O número da página deve ser maior ou igual a 1.");
    }

    const users = await PostRepository
      .getAllPosts
      // limit,
      // offset: (page - 1) * limit, // Calcula o offset a partir da página
      ();
    return users;
  },
};

export default postService;
