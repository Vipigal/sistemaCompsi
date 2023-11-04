import { get } from "http";
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
    async createProduct (body: ProductAttributes){
        try {
            const { name, description, price, image, productType } = body;
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

    deleteProductById(id: number) {
        try {
            const deletedProduct = ProductRepository.deleteProductById(id);
            return "Produto deletado";
          } catch (error: unknown) {
            return "Erro ao deletar produto";
          }
    },

    listProducts(){

    },

    getProductById(id: number){
        try {
            const product = ProductRepository.getProductById(id);
            return product
          } catch (error: unknown) {
            console.error(error);
            throw new Error("Erro ao buscar produto");
          }
    },

    getProductByName(name: string){
        try {
            const product = ProductRepository.getProductByName(name);
            return product
          } catch (error: unknown) {
            console.error(error);
            throw new Error("Erro ao buscar produto");
          }
    },

    updateProductbyId(id: number, body: Partial<ProductAttributes>){
        try {
            const updatedProduct = ProductRepository.updateProductById(id, body);
            return "Produto editado por id";
          } catch (error: unknown) {
            console.error(error);
            throw new Error("Erro ao editar produto");
          }
    },
};

export default productService;