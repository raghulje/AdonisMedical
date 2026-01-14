"use strict";

module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define(
    "Testimonial",
    {
      clientName: { type: DataTypes.STRING(100), allowNull: false },
      clientPosition: { type: DataTypes.STRING(100), allowNull: true },
      clientCompany: { type: DataTypes.STRING(255), allowNull: true },
      clientImageId: {
        type: DataTypes.INTEGER,
        references: { model: 'media', key: 'id' }
      },
      testimonialText: { type: DataTypes.TEXT, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: true },
      orderIndex: { type: DataTypes.INTEGER, defaultValue: 0 },
      isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "testimonials",
      underscored: true,
      timestamps: true,
    }
  );

  Testimonial.associate = function (models) {
    Testimonial.belongsTo(models.Media, { foreignKey: 'clientImageId', as: 'clientImage' });
  };

  return Testimonial;
};

