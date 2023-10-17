'use strict';
import { Model, UUID, UUIDV4 } from 'sequelize';

interface UserAtributtes {
  id:string, 
  name: string, 
  email: string, 
  password: string,
  contactNumber : string
}

export default (sequelize: any, DataTypes: any) => {
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
    }, 
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  }, {
    sequelize,
    modelName: 'User',    
	  tableName: 'Users',
	  indexes: [{ unique: true, fields: ["email"] }]
});
  return User;
};