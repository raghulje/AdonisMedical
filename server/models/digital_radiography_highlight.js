"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyHighlight = sequelize.define(
    "DigitalRadiographyHighlight",
    {
      subtitle: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "digital_radiography_highlights",
      underscored: true,
      timestamps: true,
    }
  );

  return DigitalRadiographyHighlight;
};

