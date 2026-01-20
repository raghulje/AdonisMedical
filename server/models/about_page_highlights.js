"use strict";

module.exports = (sequelize, DataTypes) => {
  const AboutPageHighlight = sequelize.define(
    "AboutPageHighlight",
    {
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      iconId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
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

  AboutPageHighlight.associate = function (models) {
    AboutPageHighlight.belongsTo(models.Media, { foreignKey: 'iconId', as: 'icon' });
  };

  return AboutPageHighlight;
};

