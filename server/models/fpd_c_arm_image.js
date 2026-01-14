"use strict";

module.exports = (sequelize, DataTypes) => {
  const FpdCArmImage = sequelize.define(
    "FpdCArmImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "fpd_c_arm_images",
      underscored: true,
      timestamps: false,
    }
  );

  FpdCArmImage.associate = function (models) {
    FpdCArmImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return FpdCArmImage;
};

