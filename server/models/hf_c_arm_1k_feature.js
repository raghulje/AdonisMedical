"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfCArm1kFeature = sequelize.define(
    "HfCArm1kFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "hf_c_arm_1k_features",
      underscored: true,
      timestamps: false,
    }
  );

  return HfCArm1kFeature;
};

