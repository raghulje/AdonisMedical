"use strict";

module.exports = (sequelize, DataTypes) => {
  const RequestDemoFeature = sequelize.define(
    "RequestDemoFeature",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      iconImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pageContentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: { model: 'request_demo_page_content', key: 'id' }
      },
    },
    {
      tableName: "request_demo_features",
      underscored: true,
      timestamps: true,
    }
  );

  RequestDemoFeature.associate = function (models) {
    RequestDemoFeature.belongsTo(models.RequestDemoPageContent, { foreignKey: 'pageContentId', as: 'pageContent' });
    RequestDemoFeature.belongsTo(models.Media, { foreignKey: 'iconImageId', as: 'iconImage' });
  };

  return RequestDemoFeature;
};

