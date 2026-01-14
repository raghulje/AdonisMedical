"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContactSubmission = sequelize.define(
    "ContactSubmission",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false },
      mobile: { type: DataTypes.STRING(50), allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: true },
      source: { type: DataTypes.STRING(100), allowNull: true, defaultValue: 'contact-us' }, // contact-us, about, etc.
      ipAddress: { type: DataTypes.STRING(45), allowNull: true },
      userAgent: { type: DataTypes.TEXT, allowNull: true },
      status: { 
        type: DataTypes.ENUM('new', 'read', 'replied', 'archived'), 
        allowNull: false, 
        defaultValue: 'new' 
      },
    },
    {
      tableName: "contact_submissions",
      underscored: true,
      timestamps: true,
    }
  );

  return ContactSubmission;
};

