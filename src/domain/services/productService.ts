import { ProductRepository } from "../../repositories/productRepository";
import { ProductAttributes } from "../models/Product";

const productService = {
  async createProduct(body: ProductAttributes) {
    const { name } = body;

    const existingProduct = await ProductRepository.getProductByName(name);
    if (existingProduct)
      throw new Error("Este nome já está em uso");

    const product = await ProductRepository.createProduct(body);
    if (product) return "Produto criado";
    else throw new Error("Erro ao criar produto");
  },

  async deleteProductById(id: number) {
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      throw new Error("Produto não existente");
    }
    await ProductRepository.deleteProductById(id);
    return "Produto deletado";
  },

  async listProducts() {
    const allProducts = await ProductRepository.getProducts();
    if (allProducts) return allProducts;
    else throw new Error("Erro ao buscar produto");
  },

  async getProductById(id: number) {
    const product = await ProductRepository.getProductById(id);
    if (product) return product;
    else throw new Error("Erro ao buscar produto");
  },

  async getProductByName(name: string) {
    const product = await ProductRepository.getProductByName(name);
    if (product) return product;
    else throw new Error("Erro ao buscar produto");
  },

  async updateProductbyId(id: number, body: Partial<ProductAttributes>) {
    const product = await ProductRepository.updateProductById(id, body);
    if (product) return "Produto editado por ID";
    else throw new Error("Erro ao editar produto");
  },
};

export default productService;
