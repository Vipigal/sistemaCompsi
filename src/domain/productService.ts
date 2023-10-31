import { get } from "http";
import { ProductRepository } from "../repositories/productRepository";

export type ProductType = "PRODUCT" | "EVENT";

export interface ProductAttributes {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    userType: ProductType;
}

const productService = {
    async createProduct (body: ProductAttributes){

    },

    deleteProductById(id: number) {

    },

    
}