"use strict";

module.exports = (sequelize, DataTypes) => {
  const DemoRequest = sequelize.define(
    "DemoRequest",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      hospitalName: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false },
      mobile: { type: DataTypes.STRING(50), allowNull: false },
      product: { type: DataTypes.STRING(255), allowNull: false },
      preferredDate: { type: DataTypes.DATEONLY, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: true },
      ipAddress: { type: DataTypes.STRING(45), allowNull: true },
      userAgent: { type: DataTypes.TEXT, allowNull: true },
      status: { 
        type: DataTypes.ENUM('pending', 'scheduled', 'completed', 'cancelled'), 
        allowNull: false, 
        defaultValue: 'pending' 
      },
    },
    {
      tableName: "demo_requests",
      underscored: true,
      timestamps: true,
    }
  );

  return DemoRequest;
};

