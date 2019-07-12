module.exports = (sequelize, DataTypes) => {
  const Consultations = sequelize.define('Consultations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    scheduledTo: {
      type: DataTypes.DATE
    }
  });

  return Consultations;
}