module.exports = (sequelize, DataTypes) => {
  const Medics = sequelize.define('Medics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  return Medics;
}