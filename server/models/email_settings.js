"use strict";

module.exports = (sequelize, DataTypes) => {
  const EmailSettings = sequelize.define(
    "EmailSettings",
    {
      // Map model fields to existing database columns
      smtpHost: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'smtp.gmail.com',
        field: 'smtp_host',
      },
      smtpPort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 587,
        field: 'smtp_port',
      },
      // In DB this is stored as smtp_encryption (string), but we expose it as smtpSecure flag
      smtpSecure: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'tls',
        field: 'smtp_encryption',
      },
      smtpUser: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'smtp_username',
      },
      smtpPassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'smtp_password',
      },
      fromEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'from_email',
      },
      fromName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'Adonis Medical',
        field: 'from_name',
      },
      contactFormEmail: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'contact_form_email',
      },
      requestDemoEmail: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'request_demo_email',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
    },
    {
      tableName: "email_settings",
      underscored: true,
      timestamps: true,
    }
  );

  return EmailSettings;
};

