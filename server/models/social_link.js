"use strict";

module.exports = (sequelize, DataTypes) => {
  const SocialLink = sequelize.define(
    "SocialLink",
    {
      platform: { type: DataTypes.STRING(50), allowNull: false },
      url: { type: DataTypes.STRING(500), allowNull: true },
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      iconId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' }, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "social_links",
      underscored: true,
      timestamps: true,
    }
  );

  SocialLink.associate = function (models) {
    SocialLink.belongsTo(models.Media, { foreignKey: 'iconId', as: 'icon' });
  };

  return SocialLink;
};

