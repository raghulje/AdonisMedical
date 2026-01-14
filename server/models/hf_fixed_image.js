"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfFixedImage = sequelize.define(
    "HfFixedImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "hf_fixed_images",
      underscored: true,
      timestamps: false,
    }
  );

  HfFixedImage.associate = function (models) {
    HfFixedImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return HfFixedImage;
};

