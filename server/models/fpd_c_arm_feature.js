"use strict";

module.exports = (sequelize, DataTypes) => {
  const FpdCArmFeature = sequelize.define(
    "FpdCArmFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "fpd_c_arm_features",
      underscored: true,
      timestamps: false,
    }
  );

  return FpdCArmFeature;
};

