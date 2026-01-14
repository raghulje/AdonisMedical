"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobileVariant = sequelize.define(
    "HfMobileVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "hf_mobile_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return HfMobileVariant;
};

