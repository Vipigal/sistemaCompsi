const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    contactNumber: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
});

User.sync().then(() => {
    console.log("User Model synced");
  });
  
module.exports = User;