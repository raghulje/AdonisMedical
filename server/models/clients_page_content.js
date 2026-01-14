"use strict";

module.exports = (sequelize, DataTypes) => {
  const ClientsPageContent = sequelize.define(
    "ClientsPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "clients_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  ClientsPageContent.associate = function (models) {
    ClientsPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
  };

  return ClientsPageContent;
};

