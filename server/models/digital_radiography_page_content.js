"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyPageContent = sequelize.define(
    "DigitalRadiographyPageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
      productGalleryTitle: { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'Product Gallery' },
      ourProductsTitle: { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'Our Products' },
      hospitalsServedTitle: { type: DataTypes.STRING(255), allowNull: true, defaultValue: 'Hospitals Served' },
      hospitalsBackgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      enquireButtonText: { type: DataTypes.STRING(100), allowNull: true, defaultValue: 'Enquire Now' },
    },
    {
      tableName: "digital_radiography_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  DigitalRadiographyPageContent.associate = function (models) {
    DigitalRadiographyPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
    DigitalRadiographyPageContent.belongsTo(models.Media, { foreignKey: 'hospitalsBackgroundImageId', as: 'hospitalsBackgroundImage' });
  };

  return DigitalRadiographyPageContent;
};

