"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfFixedPageContent = sequelize.define(
    "HfFixedPageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "hf_fixed_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  HfFixedPageContent.associate = function (models) {
    HfFixedPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return HfFixedPageContent;
};

