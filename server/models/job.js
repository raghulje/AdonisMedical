"use strict";

module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      title: { type: DataTypes.STRING(255), allowNull: false },
      department: { type: DataTypes.STRING(100), allowNull: true },
      location: { type: DataTypes.STRING(100), allowNull: true },
      employmentType: { type: DataTypes.STRING(50), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      requirements: { type: DataTypes.TEXT, allowNull: true },
      responsibilities: { type: DataTypes.TEXT, allowNull: true },
      salaryRange: { type: DataTypes.STRING(100), allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      postedDate: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "jobs",
      underscored: true,
      timestamps: true,
    }
  );

  return Job;
};

