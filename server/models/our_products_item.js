"use strict";

module.exports = (sequelize, DataTypes) => {
  const OurProductsItem = sequelize.define(
    "OurProductsItem",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      productImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      internalLink: { type: DataTypes.STRING(500), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "our_products_items",
      underscored: true,
      timestamps: true,
    }
  );

  OurProductsItem.associate = function (models) {
    OurProductsItem.belongsTo(models.Media, { foreignKey: 'productImageId', as: 'productImage' });
    OurProductsItem.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
  };

  return OurProductsItem;
};

