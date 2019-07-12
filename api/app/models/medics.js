module.exports = (sequelize, DataTypes) => {
  const Medics = sequelize.define('Medics', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  return Medics;
}