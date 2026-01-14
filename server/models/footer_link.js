"use strict";

module.exports = (sequelize, DataTypes) => {
  const FooterLink = sequelize.define(
    "FooterLink",
    {
      footerSectionId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: 'footer_sections', key: 'id' }
      },
      label: { type: DataTypes.STRING(100), allowNull: false },
      url: { type: DataTypes.STRING(500), allowNull: false },
      iconSvg: { type: DataTypes.TEXT, allowNull: true, comment: 'SVG icon code or path for the link' },
      iconImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' }, allowNull: true, comment: 'Icon image upload (JPG, PNG, SVG)' },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "footer_links",
      underscored: true,
      timestamps: false,
    }
  );

  FooterLink.associate = function (models) {
    FooterLink.belongsTo(models.FooterSection, { foreignKey: 'footerSectionId', as: 'section' });
    FooterLink.belongsTo(models.Media, { foreignKey: 'iconImageId', as: 'iconImage' });
  };

  return FooterLink;
};

