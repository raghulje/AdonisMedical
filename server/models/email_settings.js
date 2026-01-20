"use strict";

module.exports = (sequelize, DataTypes) => {
  const EmailSettings = sequelize.define(
    "EmailSettings",
    {
      smtpHost: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'smtp.gmail.com' },
      smtpPort: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 587 },
      smtpSecure: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      smtpUser: { type: DataTypes.STRING(255), allowNull: false },
      smtpPassword: { type: DataTypes.STRING(255), allowNull: false },
      fromEmail: { type: DataTypes.STRING(255), allowNull: false },
      fromName: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'Adonis Medical' },
      contactFormEmail: { type: DataTypes.STRING(255), allowNull: true },
      requestDemoEmail: { type: DataTypes.STRING(255), allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "email_settings",
      underscored: true,
      timestamps: true,
    }
  );

  return EmailSettings;
};

