"use strict";

module.exports = (sequelize, DataTypes) => {
  const QualityAssurancePageContent = sequelize.define(
    "QualityAssurancePageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      mainHeading: { type: DataTypes.STRING(255), allowNull: true },
      mainContent: { type: DataTypes.TEXT, allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "quality_assurance_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  QualityAssurancePageContent.associate = function (models) {
    QualityAssurancePageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
    QualityAssurancePageContent.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
    QualityAssurancePageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return QualityAssurancePageContent;
};

