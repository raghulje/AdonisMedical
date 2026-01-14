"use strict";

module.exports = (sequelize, DataTypes) => {
  const SocialLink = sequelize.define(
    "SocialLink",
    {
      platform: { type: DataTypes.STRING(50), allowNull: false },
      url: { type: DataTypes.STRING(500), allowNull: false },
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "social_links",
      underscored: true,
      timestamps: true,
    }
  );

  return SocialLink;
};

