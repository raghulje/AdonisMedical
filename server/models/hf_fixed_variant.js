"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfFixedVariant = sequelize.define(
    "HfFixedVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "hf_fixed_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return HfFixedVariant;
};

