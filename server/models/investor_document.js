"use strict";

module.exports = (sequelize, DataTypes) => {
  const InvestorDocument = sequelize.define(
    "InvestorDocument",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      fileId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      documentType: { type: DataTypes.STRING(50), allowNull: true },
      publishDate: { type: DataTypes.DATE, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "investor_documents",
      underscored: true,
      timestamps: true,
    }
  );

  InvestorDocument.associate = function (models) {
    InvestorDocument.belongsTo(models.Media, { foreignKey: 'fileId', as: 'file' });
  };

  return InvestorDocument;
};

