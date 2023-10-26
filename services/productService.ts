import db from "../models";

const productService = {
    async createProduct(req: any) {
        try {
            const { name, image, description, productType, price } = req;

            var existingProduct = await db.Product.findOne({
                where: { name },
            });

            if (existingProduct) {
                return ("Este produto já foi cadastrado")
            }

            await db.Product.create({ name, image, description, productType, price });

            return "Produto cadastrado com sucesso";
        } catch (error: any) {
            console.log(req.body);
            return "Erro ao criar usuário";
        };
    },

    deleteProductByID(resourceId: any){
        return "Usuário deletado";
    },

    async listProducts(limit: number, page: number){
        try {
            if (page < 1) {
                throw new Error("O número da página deve ser maior ou igual a 1");
            }

            const products = await db.Product.findAll({
                limit,
                offset: (page - 1) * limit,
            });

            return products;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao listar os usuários");
        }
    },

    getProductById(resourceId: any){
        return "Produto encontrado por ID";
    },

    updateProductByID(resource: any){
        return "Produto editado por ID";
    },

    async getProductByName(name: string){
        return "Produto encontrado por nome";
    },
};

export default productService;