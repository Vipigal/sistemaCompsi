import { ProductRepository } from "../../repositories/productRepository";
import { ProductAttributes, ProductType } from "../models/Product";

function verificarTipoProduct(type: string | null): type is ProductType {
  if (type === "EVENT" || type === "PRODUCT") return true;
  return false;
}

const productService = {
  async createProduct(body: ProductAttributes) {

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

    const product = await ProductRepository.createProduct(body);
    if (product) return "Produto criado";
    else throw new Error("Erro ao criar produto");
  },

  async deleteProductById(id: number) {
      const product = await ProductRepository.getProductById(id);
      if (!product) {
        throw new Error("Produto não existente");
      }
      ProductRepository.deleteProductById(id);
      return "Produto deletado";
  },

  async listProducts() {
    const allProducts = await ProductRepository.getProducts();
    if (allProducts) return allProducts;
    else throw new Error("Erro ao buscar produto");
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
