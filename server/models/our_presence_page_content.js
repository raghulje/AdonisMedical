"use strict";

module.exports = (sequelize, DataTypes) => {
  const OurPresencePageContent = sequelize.define(
    "OurPresencePageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
      mapImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      salesServiceHeading: { type: DataTypes.STRING(255), allowNull: true },
      salesServiceContent: { type: DataTypes.TEXT, allowNull: true },
      salesServiceImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "our_presence_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  OurPresencePageContent.associate = function (models) {
    OurPresencePageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
    OurPresencePageContent.belongsTo(models.Media, { foreignKey: 'mapImageId', as: 'mapImage' });
    OurPresencePageContent.belongsTo(models.Media, { foreignKey: 'salesServiceImageId', as: 'salesServiceImage' });
  };

  return OurPresencePageContent;
};

