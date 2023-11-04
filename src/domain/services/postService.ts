import { PostRepository } from "../../repositories/postRepository";
import { PostAttributes } from "../models/Post";

const postService = {
  createPost: async (body: PostAttributes) => {
    if (!body.title || !body.content) {
      throw new Error("O título e o conteúdo são obrigatórios.");
    }
    body.published = true;
    body.authorId = Number(body.authorId);
    await PostRepository.createPost(body);
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
