"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProductionFacilityPageContent = sequelize.define(
    "ProductionFacilityPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
      introBackgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      flexibilityHeading: { type: DataTypes.STRING(255), allowNull: true },
      flexibilityContent: { type: DataTypes.TEXT, allowNull: true },
      highlightedBoxText: { type: DataTypes.TEXT, allowNull: true },
      flexibilityAdditionalText: { type: DataTypes.TEXT, allowNull: true },
      flexibilityImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      qualityHeading: { type: DataTypes.STRING(255), allowNull: true },
      qualityContent: { type: DataTypes.TEXT, allowNull: true },
      qualityBackgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      qualityImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "production_facility_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  ProductionFacilityPageContent.associate = function (models) {
    ProductionFacilityPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
    ProductionFacilityPageContent.belongsTo(models.Media, { foreignKey: 'introBackgroundImageId', as: 'introBackgroundImage' });
    ProductionFacilityPageContent.belongsTo(models.Media, { foreignKey: 'flexibilityImageId', as: 'flexibilityImage' });
    ProductionFacilityPageContent.belongsTo(models.Media, { foreignKey: 'qualityBackgroundImageId', as: 'qualityBackgroundImage' });
    ProductionFacilityPageContent.belongsTo(models.Media, { foreignKey: 'qualityImageId', as: 'qualityImage' });
  };

  return ProductionFacilityPageContent;
};

