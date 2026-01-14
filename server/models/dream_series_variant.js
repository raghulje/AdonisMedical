"use strict";

module.exports = (sequelize, DataTypes) => {
  const DreamSeriesVariant = sequelize.define(
    "DreamSeriesVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "dream_series_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return DreamSeriesVariant;
};

