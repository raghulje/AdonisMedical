"use strict";

module.exports = (sequelize, DataTypes) => {
  const LineFrequencyPageContent = sequelize.define(
    "LineFrequencyPageContent",
    {
      title: { type: DataTypes.STRING(255), allowNull: true },
      mainImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      deploymentInfo: { type: DataTypes.STRING(255), allowNull: true },
      shortDescription: { type: DataTypes.TEXT, allowNull: true },
      fullDescription: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "line_frequency_page_content",
      underscored: true,
      timestamps: true,
    }
  );

  LineFrequencyPageContent.associate = function (models) {
    LineFrequencyPageContent.belongsTo(models.Media, { foreignKey: 'mainImageId', as: 'mainImage' });
  };

  return LineFrequencyPageContent;
};

