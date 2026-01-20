"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyHospital = sequelize.define(
    "DigitalRadiographyHospital",
    {
      hospitalName: { type: DataTypes.STRING(255), allowNull: false },
      city: { type: DataTypes.STRING(100), allowNull: true },
      state: { type: DataTypes.STRING(100), allowNull: true },
      hospitalLogoId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' }, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "digital_radiography_hospitals",
      underscored: true,
      timestamps: true,
    }
  );

  DigitalRadiographyHospital.associate = function (models) {
    DigitalRadiographyHospital.belongsTo(models.Media, { foreignKey: 'hospitalLogoId', as: 'hospitalLogo' });
  };

  return DigitalRadiographyHospital;
};

