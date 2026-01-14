"use strict";

module.exports = (sequelize, DataTypes) => {
  const ManagementPageContent = sequelize.define(
    "ManagementPageContent",
    {
      heroTitle: { type: DataTypes.STRING(255), allowNull: true },
      heroSubtitle: { type: DataTypes.TEXT, allowNull: true },
      heroImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      introText: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "management_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  ManagementPageContent.associate = function (models) {
    ManagementPageContent.belongsTo(models.Media, { foreignKey: 'heroImageId', as: 'heroImage' });
  };

  return ManagementPageContent;
};

