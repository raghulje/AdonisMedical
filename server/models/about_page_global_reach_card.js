"use strict";

module.exports = (sequelize, DataTypes) => {
  const AboutPageGlobalReachCard = sequelize.define(
    "AboutPageGlobalReachCard",
    {
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      iconId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      content: { type: DataTypes.TEXT, allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "about_page_global_reach_cards",
      underscored: true,
      timestamps: true,
    }
  );

  AboutPageGlobalReachCard.associate = function (models) {
    AboutPageGlobalReachCard.belongsTo(models.Media, { foreignKey: 'iconId', as: 'icon' });
  };

  return AboutPageGlobalReachCard;
};

