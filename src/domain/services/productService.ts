import { ProductRepository } from "../../repositories/productRepository";
import { ProductAttributes, ProductType } from "../models/Product";

function verificarTipoProduct(type: string | null): type is ProductType {
  if (type === "EVENT" || type === "PRODUCT") return true;
  return false;
}

const productService = {
  async createProduct(body: ProductAttributes) {
    try {
      const { name } = body;
      const existingProduct = await ProductRepository.getProductByName(name);

      if (existingProduct) {
        return "Este nome já está em uso.";
      }

      if (body.amount < 0) {
        throw new Error("A quantidade do produto deve ser positiva!");
      }

      if (body.price < 0) {
        throw new Error("O preco do produto deve ser positivo!");
      }

      await ProductRepository.createProduct(body);
      return "Produto criado";
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao criar porduto");
    }
  },

  async deleteProductById(id: number) {
    try {
      const product = await ProductRepository.getProductById(id);
      if (!product) {
        throw new Error("Produto não existente");
      }
      ProductRepository.deleteProductById(id);
      return "Produto deletado";
    } catch (error: unknown) {
      return "Erro ao deletar produto";
    }
  },

  async listProducts() {
    try {
      const allProducts = await ProductRepository.getProducts();
      return allProducts;
    } catch (e) {
      console.error(e);
      throw new Error("Erro ao buscar produto");
    }
  },
  async getProductByType(type: string) {
    if (!verificarTipoProduct(type)) {
      throw new Error("Tipo do produto inválido");
    }
    const productsByType = await ProductRepository.getProductsByType(type);
    if (productsByType && productsByType.length) return productsByType;
    else throw new Error("Nenhum produto com esse tipo cadastrado");
  },
  async getProductById(id: number) {
    try {
      const product = await ProductRepository.getProductById(id);
      return product;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao buscar produto");
    }
  },

  async getProductByName(name: string) {
    try {
      const product = await ProductRepository.getProductByName(name);
      return product;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao buscar produto");
    }
  },

  async updateProductbyId(id: number, body: Partial<ProductAttributes>) {
    try {
      await ProductRepository.updateProductById(id, body);
      return "Produto editado por id";
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao editar produto");
    }
  },
};

export default productService;
