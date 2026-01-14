"use strict";

module.exports = (sequelize, DataTypes) => {
  const OfficeLocation = sequelize.define(
    "OfficeLocation",
    {
      officeType: { type: DataTypes.STRING(50), allowNull: true },
      city: { type: DataTypes.STRING(100), allowNull: true },
      state: { type: DataTypes.STRING(100), allowNull: true },
      country: { type: DataTypes.STRING(100), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      email: { type: DataTypes.STRING(100), allowNull: true },
      latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
      longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "office_locations",
      underscored: true,
      timestamps: false,
    }
  );

  return OfficeLocation;
};

