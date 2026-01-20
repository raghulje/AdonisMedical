"use strict";

module.exports = (sequelize, DataTypes) => {
  const HfMobileHospital = sequelize.define(
    "HfMobileHospital",
    {
      hospitalName: { type: DataTypes.STRING(255), allowNull: false },
      city: { type: DataTypes.STRING(100), allowNull: true },
      state: { type: DataTypes.STRING(100), allowNull: true },
      hospitalLogoId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' }, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "hf_mobile_hospitals",
      underscored: true,
      timestamps: true,
    }
  );

  HfMobileHospital.associate = function (models) {
    HfMobileHospital.belongsTo(models.Media, { foreignKey: 'hospitalLogoId', as: 'hospitalLogo' });
  };

  return HfMobileHospital;
};

