"use strict";

module.exports = (sequelize, DataTypes) => {
  const FpdCArmPageContent = sequelize.define(
    "FpdCArmPageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "fpd_c_arm_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  FpdCArmPageContent.associate = function (models) {
    FpdCArmPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return FpdCArmPageContent;
};

