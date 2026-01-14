"use strict";

module.exports = (sequelize, DataTypes) => {
  const LineFrequencyFeature = sequelize.define(
    "LineFrequencyFeature",
    {
      featureText: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "line_frequency_features",
      underscored: true,
      timestamps: false,
    }
  );

  return LineFrequencyFeature;
};

