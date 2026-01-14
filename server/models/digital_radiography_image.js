"use strict";

module.exports = (sequelize, DataTypes) => {
  const DigitalRadiographyImage = sequelize.define(
    "DigitalRadiographyImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "digital_radiography_images",
      underscored: true,
      timestamps: false,
    }
  );

  DigitalRadiographyImage.associate = function (models) {
    DigitalRadiographyImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return DigitalRadiographyImage;
};

