"use strict";

module.exports = (sequelize, DataTypes) => {
  const SpecialtiesPageCard = sequelize.define(
    "SpecialtiesPageCard",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      cardImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      internalLink: { type: DataTypes.STRING(500), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "specialties_page_cards",
      underscored: true,
      timestamps: true,
    }
  );

  SpecialtiesPageCard.associate = function (models) {
    SpecialtiesPageCard.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
    SpecialtiesPageCard.belongsTo(models.Media, { foreignKey: 'cardImageId', as: 'cardImage' });
  };

  return SpecialtiesPageCard;
};

