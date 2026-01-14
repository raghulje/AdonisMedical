"use strict";

module.exports = (sequelize, DataTypes) => {
  const SpecialtiesPageContent = sequelize.define(
    "SpecialtiesPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "specialties_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  SpecialtiesPageContent.associate = function (models) {
    SpecialtiesPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
  };

  return SpecialtiesPageContent;
};

