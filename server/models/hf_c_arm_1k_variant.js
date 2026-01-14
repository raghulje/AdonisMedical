"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfCArm1kVariant = sequelize.define(
    "HfCArm1kVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "hf_c_arm_1k_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return HfCArm1kVariant;
};

