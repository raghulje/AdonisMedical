"use strict";

module.exports = (sequelize, DataTypes) => {
  const DreamSeriesFeature = sequelize.define(
    "DreamSeriesFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "dream_series_features",
      underscored: true,
      timestamps: false,
    }
  );

  return DreamSeriesFeature;
};

