"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeSpecialtiesSection = sequelize.define(
    "HomeSpecialtiesSection",
    {
      heading: { type: DataTypes.STRING(255), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      ctaText: { type: DataTypes.STRING(100), allowNull: true },
      ctaUrl: { type: DataTypes.STRING(500), allowNull: true },
    },
    {
      tableName: "home_specialties_section",
      underscored: true,
      timestamps: true,
    }
  );

  HomeSpecialtiesSection.associate = function (models) {
    HomeSpecialtiesSection.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return HomeSpecialtiesSection;
};

