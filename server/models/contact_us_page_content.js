"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContactUsPageContent = sequelize.define(
    "ContactUsPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      introText: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "contact_us_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  return ContactUsPageContent;
};

