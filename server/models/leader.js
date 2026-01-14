"use strict";

module.exports = (sequelize, DataTypes) => {
  const Leader = sequelize.define(
    "Leader",
    {
      fullName: { type: DataTypes.STRING(255), allowNull: false },
      position: { type: DataTypes.STRING(255), allowNull: false },
      department: { type: DataTypes.STRING(100), allowNull: true },
      bio: { type: DataTypes.TEXT, allowNull: true },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'media', key: 'id' }
      },
      email: { type: DataTypes.STRING(100), allowNull: true },
      linkedinUrl: { type: DataTypes.STRING(500), allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "leaders",
      underscored: true,
      timestamps: true,
    }
  );

  Leader.associate = function (models) {
    Leader.belongsTo(models.Media, { foreignKey: 'imageId', as: 'image' });
  };

  return Leader;
};

