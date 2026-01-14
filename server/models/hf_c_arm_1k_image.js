"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfCArm1kImage = sequelize.define(
    "HfCArm1kImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "hf_c_arm_1k_images",
      underscored: true,
      timestamps: false,
    }
  );

  HfCArm1kImage.associate = function (models) {
    HfCArm1kImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return HfCArm1kImage;
};

