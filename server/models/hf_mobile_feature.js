"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobileFeature = sequelize.define(
    "HfMobileFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "hf_mobile_features",
      underscored: true,
      timestamps: false,
    }
  );

  return HfMobileFeature;
};

