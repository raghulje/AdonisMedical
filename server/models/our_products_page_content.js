"use strict";

module.exports = (sequelize, DataTypes) => {
  const OurProductsPageContent = sequelize.define(
    "OurProductsPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      sectionIntro: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      sectionBackgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "our_products_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  OurProductsPageContent.associate = function (models) {
    OurProductsPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
    OurProductsPageContent.belongsTo(models.Media, { foreignKey: 'sectionBackgroundImageId', as: 'sectionBackgroundImage' });
  };

  return OurProductsPageContent;
};

