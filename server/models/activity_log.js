"use strict";

module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define(
    "ActivityLog",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' }
      },
      action: { type: DataTypes.STRING(100), allowNull: false },
      entityType: { type: DataTypes.STRING(100), allowNull: true },
      entityId: { type: DataTypes.INTEGER, allowNull: true },
      page: { type: DataTypes.STRING(100), allowNull: true, comment: 'Page name (e.g., Home, About)' },
      section: { type: DataTypes.STRING(100), allowNull: true, comment: 'Section name (e.g., Hero Section)' },
      field: { type: DataTypes.STRING(100), allowNull: true, comment: 'Field name that was changed' },
      oldValue: { type: DataTypes.TEXT, allowNull: true, comment: 'Previous value' },
      newValue: { type: DataTypes.TEXT, allowNull: true, comment: 'New value' },
      description: { type: DataTypes.TEXT, allowNull: true },
      ipAddress: { type: DataTypes.STRING(45), allowNull: true },
      userAgent: { type: DataTypes.TEXT, allowNull: true },
      metadata: { type: DataTypes.JSON, allowNull: true, comment: 'Additional metadata' },
    },
    {
      tableName: "activity_logs",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    }
  );

  ActivityLog.associate = function (models) {
    ActivityLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return ActivityLog;
};

