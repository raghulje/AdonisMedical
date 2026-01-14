"use strict";

module.exports = (sequelize, DataTypes) => {
  const FooterLogo = sequelize.define(
    "FooterLogo",
    {
      name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      logoImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "footer_logos",
      underscored: true,
      timestamps: true,
    }
  );

  FooterLogo.associate = function (models) {
    FooterLogo.belongsTo(models.Media, { foreignKey: 'logoImageId', as: 'logoImage' });
  };

  return FooterLogo;
};

