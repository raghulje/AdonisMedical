"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyVariant = sequelize.define(
    "DigitalRadiographyVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "digital_radiography_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return DigitalRadiographyVariant;
};

