"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeContactSection = sequelize.define(
    "HomeContactSection",
    {
      heading: { type: DataTypes.STRING(255), allowNull: true },
      companyName: { type: DataTypes.STRING(255), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      email: { type: DataTypes.STRING(255), allowNull: true },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
    },
    {
      tableName: "home_contact_section",
      underscored: true,
      timestamps: true,
    }
  );

  HomeContactSection.associate = function (models) {
    HomeContactSection.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return HomeContactSection;
};

