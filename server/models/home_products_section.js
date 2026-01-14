"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeProductsSection = sequelize.define(
    "HomeProductsSection",
    {
      heading: { type: DataTypes.STRING(255), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      ctaText: { type: DataTypes.STRING(100), allowNull: true },
      ctaUrl: { type: DataTypes.STRING(500), allowNull: true },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "home_products_section",
      underscored: true,
      timestamps: true,
    }
  );

  HomeProductsSection.associate = function (models) {
    HomeProductsSection.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
  };

  return HomeProductsSection;
};

