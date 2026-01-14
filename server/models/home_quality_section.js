"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeQualitySection = sequelize.define(
    "HomeQualitySection",
    {
      heading: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      backgroundImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      ctaText: { type: DataTypes.STRING(100), allowNull: true },
      ctaUrl: { type: DataTypes.STRING(500), allowNull: true },
    },
    {
      tableName: "home_quality_section",
      underscored: true,
      timestamps: true,
    }
  );

  HomeQualitySection.associate = function (models) {
    HomeQualitySection.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
  };

  return HomeQualitySection;
};

