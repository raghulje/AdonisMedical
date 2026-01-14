"use strict";

module.exports = (sequelize, DataTypes) => {
  const Award = sequelize.define(
    "Award",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      awardDate: { type: DataTypes.DATEONLY, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "awards",
      underscored: true,
      timestamps: true,
    }
  );

  Award.associate = function (models) {
    Award.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return Award;
};

