module.exports = (sequelize, DataTypes) => {
  const Consultations = sequelize.define('Consultations', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    medicId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Medics',
        key: 'id',
      },
    },
    scheduledTo: {
      type: DataTypes.DATE
    }
  });

  Consultations.associate = (models) => {
    Consultations.belongsTo(models.Medics)
    Consultations.belongsTo(models.Users)
  }

  return Consultations;
}