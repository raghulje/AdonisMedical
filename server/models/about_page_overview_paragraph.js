"use strict";

module.exports = (sequelize, DataTypes) => {
  const AboutPageOverviewParagraph = sequelize.define(
    "AboutPageOverviewParagraph",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      position: { type: DataTypes.STRING(20), allowNull: true }, // 'before' or 'after' highlights
    },
    {
      tableName: "about_page_overview_paragraphs",
      underscored: true,
      timestamps: true,
    }
  );

  return AboutPageOverviewParagraph;
};

