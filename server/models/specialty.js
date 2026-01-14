"use strict";

module.exports = (sequelize, DataTypes) => {
  const Specialty = sequelize.define(
    "Specialty",
    {
      name: { type: DataTypes.STRING(100), allowNull: false },
      slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "specialties",
      underscored: true,
      timestamps: true,
    }
  );

  Specialty.associate = function (models) {
    Specialty.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return Specialty;
};

