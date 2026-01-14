"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyFeature = sequelize.define(
    "DigitalRadiographyFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
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

