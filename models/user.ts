'use strict';
import { Model, UUID, UUIDV4 } from 'sequelize';

interface UserAtributtes {
  id:string, 
  name: string, 
  email: string, 
  password: string,
  contactNumber : string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model <UserAtributtes> 
  implements UserAtributtes{

   id!: string;
   name!: string;
   email!: string;
   password!: string;
   contactNumber! : string;
    static associate(models: any) {
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};