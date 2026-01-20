"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfCArm1kHospital = sequelize.define(
    "HfCArm1kHospital",
    {
      hospitalName: { type: DataTypes.STRING(255), allowNull: false },
      city: { type: DataTypes.STRING(100), allowNull: true },
      state: { type: DataTypes.STRING(100), allowNull: true },
      hospitalLogoId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' }, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "hf_c_arm_1k_hospitals",
      underscored: true,
      timestamps: true,
    }
  );

  HfCArm1kHospital.associate = function (models) {
    HfCArm1kHospital.belongsTo(models.Media, { foreignKey: 'hospitalLogoId', as: 'hospitalLogo' });
  };

  return HfCArm1kHospital;
};

