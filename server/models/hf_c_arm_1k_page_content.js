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

