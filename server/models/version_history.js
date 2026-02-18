"use strict";

module.exports = (sequelize, DataTypes) => {
  const VersionHistory = sequelize.define(
    "VersionHistory",
    {
      entityType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Type of entity (e.g., home_hero_section, product, etc.)'
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'ID of the entity'
      },
      versionNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: 'Version number for this entity'
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: 'Full snapshot of entity data at this version'
      },
      changes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Description of changes made'
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        comment: 'User ID who created this version'
      },
    },
    {
      tableName: "version_history",
      underscored: true,
      timestamps: true,
      updatedAt: false, // Versions are immutable
    }
  );

  VersionHistory.associate = function (models) {
    VersionHistory.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
  };

  return VersionHistory;
};

