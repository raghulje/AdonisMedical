"use strict";

module.exports = (sequelize, DataTypes) => {
  const DreamSeriesPageContent = sequelize.define(
    "DreamSeriesPageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
      productGalleryTitle: { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'Product Gallery' },
      ourProductsTitle: { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'Our Products' },
      hospitalsServedTitle: { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'Hospitals Served' },
      enquireButtonText: { type: DataTypes.STRING(100), allowNull: true, defaultValue: 'Enquire Now' },
    },
    {
      tableName: "dream_series_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  DreamSeriesPageContent.associate = function (models) {
    DreamSeriesPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return DreamSeriesPageContent;
};

