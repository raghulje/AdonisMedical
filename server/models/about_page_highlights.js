"use strict";

module.exports = (sequelize, DataTypes) => {
  const AboutPageHighlight = sequelize.define(
    "AboutPageHighlight",
    {
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      text: { type: DataTypes.STRING(255), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      sectionName: { type: DataTypes.STRING(50), allowNull: true },
    },
    {
      tableName: "about_page_highlights",
      underscored: true,
      timestamps: false,
    }
  );

  return AboutPageHighlight;
};

