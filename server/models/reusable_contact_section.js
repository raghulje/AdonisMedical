"use strict";

module.exports = (sequelize, DataTypes) => {
  const ReusableContactSection = sequelize.define(
    "ReusableContactSection",
    {
      heading: { type: DataTypes.STRING(255), allowNull: true },
      companyName: { type: DataTypes.STRING(255), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      email: { type: DataTypes.STRING(255), allowNull: true },
      imageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "reusable_contact_section",
      underscored: true,
      timestamps: true,
    }
  );

  ReusableContactSection.associate = function (models) {
    ReusableContactSection.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
    ReusableContactSection.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
  };

  return ReusableContactSection;
};

