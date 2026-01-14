"use strict";

module.exports = (sequelize, DataTypes) => {
  const LineFrequencyImage = sequelize.define(
    "LineFrequencyImage",
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'media', key: 'id' } },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "line_frequency_images",
      underscored: true,
      timestamps: false,
    }
  );

  LineFrequencyImage.associate = function (models) {
    LineFrequencyImage.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return LineFrequencyImage;
};

