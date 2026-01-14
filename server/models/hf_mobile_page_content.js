"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobilePageContent = sequelize.define(
    "HfMobilePageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "hf_mobile_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  HfMobilePageContent.associate = function (models) {
    HfMobilePageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return HfMobilePageContent;
};

