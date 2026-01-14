"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeStats = sequelize.define(
    "HomeStats",
    {
      iconClass: { type: DataTypes.STRING(100), allowNull: true },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      number: { type: DataTypes.STRING(50), allowNull: false },
      label: { type: DataTypes.STRING(100), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      tableName: "home_stats",
      underscored: true,
      timestamps: false,
    }
  );

  HomeStats.associate = function (models) {
    HomeStats.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return HomeStats;
};

