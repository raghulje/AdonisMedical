"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProductionFacilityFeature = sequelize.define(
    "ProductionFacilityFeature",
    {
      iconId: { type: DataTypes.INTEGER, allowNull: true, field: 'icon_id' },
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      heading: { type: DataTypes.STRING(255), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "production_facility_features",
      underscored: true,
      timestamps: false,
    }
  );

  ProductionFacilityFeature.associate = (models) => {
    ProductionFacilityFeature.belongsTo(models.Media, { as: 'icon', foreignKey: 'iconId' });
  };

  return ProductionFacilityFeature;
};

