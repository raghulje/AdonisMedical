"use strict";

module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define(
    "Certification",
    {
      name: { type: DataTypes.STRING(255), allowNull: false },
      abbreviation: { type: DataTypes.STRING(50), allowNull: true },
      logoId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      description: { type: DataTypes.TEXT, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "certifications",
      underscored: true,
      timestamps: false,
    }
  );

  Certification.associate = function (models) {
    Certification.belongsTo(models.Media, { foreignKey: 'logoId', as: 'logo' });
  };

  return Certification;
};

