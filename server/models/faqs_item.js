"use strict";

module.exports = (sequelize, DataTypes) => {
  const FaqsItem = sequelize.define(
    "FaqsItem",
    {
      question: { type: DataTypes.TEXT, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "faqs_items",
      underscored: true,
      timestamps: true,
    }
  );

  FaqsItem.associate = function (models) {
    FaqsItem.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return FaqsItem;
};

