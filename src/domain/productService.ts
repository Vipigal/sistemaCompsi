import { ProductRepository } from "../repositories/productRepository";

export type ProductType = "PRODUCT" | "EVENT";

export interface ProductAttributes {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  productType: ProductType;
}

const productService = {
  async createProduct(body: ProductAttributes) {
    try {
      const { name } = body;
      const existingProduct = await ProductRepository.getProductByName(name);

      if (existingProduct) {
        return "Este nome já está em uso.";
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
      await ProductRepository.deleteProductById(id);
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
