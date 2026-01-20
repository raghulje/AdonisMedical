"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyFeature = sequelize.define(
    "DigitalRadiographyFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      subtitle: { type: DataTypes.STRING(255), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "digital_radiography_features",
      underscored: true,
      timestamps: false,
    }
  );

  return DigitalRadiographyFeature;
};

