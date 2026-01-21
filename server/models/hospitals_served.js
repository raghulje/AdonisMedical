"use strict";

module.exports = (sequelize, DataTypes) => {
  const HospitalsServed = sequelize.define(
    "HospitalsServed",
    {
      hospitalName: { type: DataTypes.STRING(255), allowNull: false },
      cityState: { type: DataTypes.STRING(255), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "hospitals_served",
      underscored: true,
      timestamps: true,
    }
  );

  return HospitalsServed;
};

