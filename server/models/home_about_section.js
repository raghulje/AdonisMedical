"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeAboutSection = sequelize.define(
    "HomeAboutSection",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      subtitle: { type: DataTypes.STRING(255), allowNull: true },
      introText: { type: DataTypes.TEXT, allowNull: true },
      backgroundImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      mainImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      ctaText: { type: DataTypes.STRING(100), allowNull: true },
      ctaUrl: { type: DataTypes.STRING(500), allowNull: true },
    },
    {
      tableName: "home_about_section",
      underscored: true,
      timestamps: true,
    }
  );

  HomeAboutSection.associate = function (models) {
    HomeAboutSection.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
    HomeAboutSection.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return HomeAboutSection;
};

