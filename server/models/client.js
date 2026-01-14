"use strict";

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      logoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      websiteUrl: { type: DataTypes.STRING(500), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "clients",
      underscored: true,
      timestamps: true,
    }
  );

  Client.associate = function (models) {
    Client.belongsTo(models.Media, { foreignKey: 'logoId', as: 'logo' });
  };

  return Client;
};

