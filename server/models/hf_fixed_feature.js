"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfFixedFeature = sequelize.define(
    "HfFixedFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "hf_fixed_features",
      underscored: true,
      timestamps: false,
    }
  );

  return HfFixedFeature;
};

