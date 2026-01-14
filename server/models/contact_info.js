"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContactInfo = sequelize.define(
    "ContactInfo",
    {
      companyName: { type: DataTypes.STRING(255), allowNull: false },
      addressLine1: { type: DataTypes.STRING(255), allowNull: true },
      addressLine2: { type: DataTypes.STRING(255), allowNull: true },
      city: { type: DataTypes.STRING(100), allowNull: true },
      state: { type: DataTypes.STRING(100), allowNull: true },
      postalCode: { type: DataTypes.STRING(20), allowNull: true },
      country: { type: DataTypes.STRING(100), allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      email: { type: DataTypes.STRING(100), allowNull: true },
      supportEmail: { type: DataTypes.STRING(100), allowNull: true },
      googleMapsEmbedUrl: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "contact_info",
      underscored: true,
      timestamps: true,
    }
  );

  return ContactInfo;
};

