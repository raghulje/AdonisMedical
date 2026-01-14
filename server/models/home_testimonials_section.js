"use strict";

module.exports = (sequelize, DataTypes) => {
  const HomeTestimonialsSection = sequelize.define(
    "HomeTestimonialsSection",
    {
      subtitle: { type: DataTypes.STRING(255), allowNull: true },
      heading: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
      tableName: "home_testimonials_section",
      underscored: true,
      timestamps: true,
    }
  );

  return HomeTestimonialsSection;
};

