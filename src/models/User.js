// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = sequelize => {
//   // defino el modelo
//   sequelize.define('user', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     mail: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       isEmail: true, 
//     },
//     pass: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         is: /^[0-9a-f]{32}$/i
//       }
//     },
//   });
// };


