"use strict";

module.exports = (sequelize, DataTypes) => {
  const DreamSeriesImage = sequelize.define(
    "DreamSeriesImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "dream_series_images",
      underscored: true,
      timestamps: false,
    }
  );

  DreamSeriesImage.associate = function (models) {
    DreamSeriesImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return DreamSeriesImage;
};

