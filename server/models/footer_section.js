"use strict";

module.exports = (sequelize, DataTypes) => {
  const FooterSection = sequelize.define(
    "FooterSection",
    {
      title: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "footer_sections",
      underscored: true,
      timestamps: true,
    }
  );

  FooterSection.associate = function (models) {
    FooterSection.hasMany(models.FooterLink, { foreignKey: 'footerSectionId', as: 'links' });
  };

  return FooterSection;
};

