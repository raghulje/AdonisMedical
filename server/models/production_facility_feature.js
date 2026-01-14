"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProductionFacilityFeature = sequelize.define(
    "ProductionFacilityFeature",
    {
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      heading: { type: DataTypes.STRING(255), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "production_facility_features",
      underscored: true,
      timestamps: false,
    }
  );

  return ProductionFacilityFeature;
};

