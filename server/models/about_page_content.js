"use strict";

module.exports = (sequelize, DataTypes) => {
  const AboutPageContent = sequelize.define(
    "AboutPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      overviewHeading: { type: DataTypes.STRING(255), allowNull: true },
      overviewContent: { type: DataTypes.TEXT, allowNull: true },
      overviewImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      safetyHeading: { type: DataTypes.STRING(255), allowNull: true },
      safetyContent: { type: DataTypes.TEXT, allowNull: true },
      safetyImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      excellenceHeading: { type: DataTypes.STRING(255), allowNull: true },
      excellenceContent: { type: DataTypes.TEXT, allowNull: true },
      excellenceImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "about_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  AboutPageContent.associate = function (models) {
    AboutPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
    AboutPageContent.belongsTo(models.Media, { foreignKey: 'overviewImageId', as: 'overviewImage' });
    AboutPageContent.belongsTo(models.Media, { foreignKey: 'safetyImageId', as: 'safetyImage' });
    AboutPageContent.belongsTo(models.Media, { foreignKey: 'excellenceImageId', as: 'excellenceImage' });
  };

  return AboutPageContent;
};

