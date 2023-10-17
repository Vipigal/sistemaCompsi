'use strict';
import { DataTypes, Model, UUID, UUIDV4 } from 'sequelize';

type UserType = 'student' | 'admin' | 'management';

interface UserAtributtes {
  id:string, 
  name: string, 
  email: string, 
  password: string,
  contactNumber : string,
  userType : UserType,
  description: string
}

export default (sequelize: any, DataTypes: any) => {
  class User extends Model <UserAtributtes> 
  implements UserAtributtes{

   id!: string;
   name!: string;
   email!: string;
   password!: string;
   contactNumber! : string;
   userType! : UserType;
   description! : string;
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
    userType:{
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'student',
      values: ['student', 'admin', 'managment'],
    },
    description: {
      type: DataTypes.STRING, 
      allowNull: true,

    }
  }, {
    sequelize,
    modelName: 'User',    
	  tableName: 'Users',
	  indexes: [{ unique: true, fields: ["email"] }]
});
  return User;
};