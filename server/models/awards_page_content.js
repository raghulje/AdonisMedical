"use strict";

module.exports = (sequelize, DataTypes) => {
  const AwardsPageContent = sequelize.define(
    "AwardsPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "awards_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  AwardsPageContent.associate = function (models) {
    AwardsPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
  };

  return AwardsPageContent;
};

