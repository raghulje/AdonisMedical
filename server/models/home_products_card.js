"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeProductsCard = sequelize.define(
    "HomeProductsCard",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      cardImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      internalLink: { type: DataTypes.STRING(500), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "home_products_cards",
      underscored: true,
      timestamps: true,
    }
  );

  HomeProductsCard.associate = function (models) {
    HomeProductsCard.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
    HomeProductsCard.belongsTo(models.Media, { foreignKey: 'cardImageId', as: 'cardImage' });
  };

  return HomeProductsCard;
};

