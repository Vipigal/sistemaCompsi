import { PostRepository } from "../../repositories/postRepository";
import { PostAttributes } from "../models/Post";
import { PostType } from "../models/Post";

function verificarTipoPost(type: string | null): type is PostType {
  if (type === "GESTAO" || type === "TICKET" || type === "SOBRE" || type === "BANNER" || type === "DEFAULT")
    return true;
  return false;
}

const postService = {
  createPost: async (body: PostAttributes, email: string | undefined) => {
    if (!body.title) {
      throw new Error("O título é obrigatório.");
    }
    if (!email) {
      throw new Error("Usuário não logado");
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

    if (!type) {
      users = await PostRepository.getAllPosts(null);
      return users;
    }

    if (!verificarTipoPost(type))
      throw new Error("O tipo de post é inválido");

    users = await PostRepository.getAllPosts(type);
    // limit,
    // offset: (page - 1) * limit, // Calcula o offset a partir da página
    return users;
  },
  async deletePostByID(id: number) {
      await PostRepository.deletePostByID(id);
      throw new Error("Post deletado");

  },
  async updatePostByID(id: number, body: Partial<PostAttributes>){
    if(!id)
      throw new Error("Post não existente");

    const post = await PostRepository.updatePostByID(id, body);
    if (post) return post;
    else throw new Error("Erro ao atualizar post");
  },
};

export default postService;
