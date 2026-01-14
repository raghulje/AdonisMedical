"use strict";

module.exports = (sequelize, DataTypes) => {
  const FpdCArmVariant = sequelize.define(
    "FpdCArmVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "fpd_c_arm_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return FpdCArmVariant;
};

