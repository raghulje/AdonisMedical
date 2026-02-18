"use strict";

module.exports = (sequelize, DataTypes) => {
    const ProductionFacilityFeature = sequelize.define(
        "ProductionFacilityFeature",
        {
            heading: { type: DataTypes.STRING(255), allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: true },
            iconId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'media', key: 'id' }
            },
            iconClass: { type: DataTypes.STRING(100), allowNull: true },
            orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            tableName: "production_facility_features",
            underscored: true,
            timestamps: true,
        }
    );

    ProductionFacilityFeature.associate = function (models) {
        ProductionFacilityFeature.belongsTo(models.Media, { foreignKey: 'iconId', as: 'icon' });
    };

    return ProductionFacilityFeature;
};
