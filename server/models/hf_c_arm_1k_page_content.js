"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfCArm1kPageContent = sequelize.define(
    "HfCArm1kPageContent",
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
      tableName: "hf_c_arm_1k_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  HfCArm1kPageContent.associate = function (models) {
    HfCArm1kPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return HfCArm1kPageContent;
};

