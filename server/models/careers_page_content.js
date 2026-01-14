"use strict";

module.exports = (sequelize, DataTypes) => {
  const CareersPageContent = sequelize.define(
    "CareersPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
      introImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      lifeAtAdonisTitle: { type: DataTypes.STRING(255), allowNull: true },
      lifeAtAdonisBackgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      lifeAtAdonisImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "careers_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  CareersPageContent.associate = function (models) {
    CareersPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
    CareersPageContent.belongsTo(models.Media, { foreignKey: 'introImageId', as: 'introImage' });
    CareersPageContent.belongsTo(models.Media, { foreignKey: 'lifeAtAdonisBackgroundImageId', as: 'lifeAtAdonisBackgroundImage' });
    CareersPageContent.belongsTo(models.Media, { foreignKey: 'lifeAtAdonisImageId', as: 'lifeAtAdonisImage' });
  };

  return CareersPageContent;
};

