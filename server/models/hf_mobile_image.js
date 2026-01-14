"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobileImage = sequelize.define(
    "HfMobileImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "hf_mobile_images",
      underscored: true,
      timestamps: false,
    }
  );

  HfMobileImage.associate = function (models) {
    HfMobileImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return HfMobileImage;
};

