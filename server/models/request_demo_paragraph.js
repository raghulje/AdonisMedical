"use strict";

module.exports = (sequelize, DataTypes) => {
  const RequestDemoParagraph = sequelize.define(
    "RequestDemoParagraph",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pageContentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: { model: 'request_demo_page_content', key: 'id' }
      },
    },
    {
      tableName: "request_demo_paragraphs",
      underscored: true,
      timestamps: true,
    }
  );

  RequestDemoParagraph.associate = function (models) {
    RequestDemoParagraph.belongsTo(models.RequestDemoPageContent, { foreignKey: 'pageContentId', as: 'pageContent' });
  };

  return RequestDemoParagraph;
};

