"use strict";

module.exports = (sequelize, DataTypes) => {
  const LineFrequencyVariant = sequelize.define(
    "LineFrequencyVariant",
    {
      variantName: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "line_frequency_variants",
      underscored: true,
      timestamps: false,
    }
  );

  return LineFrequencyVariant;
};

