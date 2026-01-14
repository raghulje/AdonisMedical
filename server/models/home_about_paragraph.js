"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeAboutParagraph = sequelize.define(
    "HomeAboutParagraph",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      tableName: "home_about_paragraphs",
      underscored: true,
      timestamps: true,
    }
  );

  return HomeAboutParagraph;
};

