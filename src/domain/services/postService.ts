import { PostRepository } from "../../repositories/postRepository";
import { PostAttributes } from "../models/Post";
import { PostType } from "../models/Post";

function verificarTipoPost(type: string | null): type is PostType{
  if (type === "SECTION" || type === "BANNER" ||type === "DEFAULT")
    return true;
  return false;
}

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
  listPosts: async (type: string | null, limit: number, page: number) => {
    let users;
    if (page < 1) {
      throw new Error("O número da página deve ser maior ou igual a 1.");
    }

    if (!type){
      users = await PostRepository.getAllPosts(null);
      return users;
    }

    if(!verificarTipoPost(type))
      throw new Error ("O tipo de post é inválido");

    users = await PostRepository.getAllPosts(type);
            // limit,
      // offset: (page - 1) * limit, // Calcula o offset a partir da página
    return users;
  },
  async deletePostByID(id: number) {
    try {
      await PostRepository.deletePostByID(id);
      return "Post deletado";
    } catch (error: unknown) {
      return "Erro ao deletar post";
    }
  },
};

export default postService;
