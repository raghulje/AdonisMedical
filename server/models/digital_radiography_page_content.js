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
    },
    {
      tableName: "digital_radiography_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  DigitalRadiographyPageContent.associate = function (models) {
    DigitalRadiographyPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return DigitalRadiographyPageContent;
};

