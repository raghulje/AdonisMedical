"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeHeroSection = sequelize.define(
    "HomeHeroSection",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      subtitle: { type: DataTypes.TEXT, allowNull: true },
      backgroundImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      titleColor: { type: DataTypes.STRING(7), defaultValue: '#FFFFFF' },
      subtitleColor: { type: DataTypes.STRING(7), defaultValue: '#FFFFFF' },
      overlayOpacity: { type: DataTypes.INTEGER, defaultValue: 40 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "home_hero_section",
      underscored: true,
      timestamps: true,
    }
  );

  HomeHeroSection.associate = function (models) {
    HomeHeroSection.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
  };

  return HomeHeroSection;
};

