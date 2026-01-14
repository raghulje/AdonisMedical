"use strict";

module.exports = (sequelize, DataTypes) => {
  const InvestorRelationsPageContent = sequelize.define(
    "InvestorRelationsPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "investor_relations_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  InvestorRelationsPageContent.associate = function (models) {
    InvestorRelationsPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
  };

  return InvestorRelationsPageContent;
};

