"use strict";

module.exports = (sequelize, DataTypes) => {
  const FaqsPage = sequelize.define(
    "FaqsPage",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      backgroundImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      sectionBackgroundImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      titleColor: { type: DataTypes.STRING(7), defaultValue: '#FFFFFF' },
      subtitleColor: { type: DataTypes.STRING(7), defaultValue: '#FFFFFF' },
      overlayOpacity: { type: DataTypes.INTEGER, defaultValue: 40 },
    },
    {
      tableName: "faqs_page",
      underscored: true,
      timestamps: true,
    }
  );

  FaqsPage.associate = function (models) {
    FaqsPage.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
    FaqsPage.belongsTo(models.Media, { foreignKey: 'sectionBackgroundImageId', as: 'sectionBackgroundImage' });
  };

  return FaqsPage;
};

