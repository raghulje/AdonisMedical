"use strict";

module.exports = (sequelize, DataTypes) => {
  const RequestDemoPageContent = sequelize.define(
    "RequestDemoPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      introText: { type: DataTypes.TEXT, allowNull: true },
      feature1Icon: { type: DataTypes.STRING(100), allowNull: true },
      feature1Text: { type: DataTypes.STRING(255), allowNull: true },
      feature2Icon: { type: DataTypes.STRING(100), allowNull: true },
      feature2Text: { type: DataTypes.STRING(255), allowNull: true },
      feature3Icon: { type: DataTypes.STRING(100), allowNull: true },
      feature3Text: { type: DataTypes.STRING(255), allowNull: true },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "request_demo_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  RequestDemoPageContent.associate = function (models) {
    RequestDemoPageContent.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
    RequestDemoPageContent.hasMany(models.RequestDemoParagraph, { foreignKey: 'pageContentId', as: 'paragraphs' });
    RequestDemoPageContent.hasMany(models.RequestDemoFeature, { foreignKey: 'pageContentId', as: 'features' });
  };

  return RequestDemoPageContent;
};

