'use strict';
import { DataTypes, Model, UUID, UUIDV4 } from 'sequelize';

type ProductType = 'ticket' | 'object';

interface ProductAttributes {
    id: string,
    name: string,
    image: string, //?
    description: string,
    productType: string,
    price: number
}

export default (sequelize: any, DataTypes: any) => {
    class Product extends Model<ProductAttributes>

        implements ProductAttributes {
        id!: string;
        name!: string;
        image!: string;
        description!: string;
        productType!: string;
        price!: number
        static associate(models: any) {}
    }

    Product.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['ticket', 'object'],
            defaultValue: 'object',
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        indexes: [{ unique: true, fields: ["name"] }]
    });
    return Product;
};