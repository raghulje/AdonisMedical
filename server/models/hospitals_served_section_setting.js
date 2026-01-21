"use strict";

module.exports = (sequelize, DataTypes) => {
  const HospitalsServedSectionSetting = sequelize.define(
    "HospitalsServedSectionSetting",
    {
      backgroundImageId: { type: DataTypes.INTEGER, references: { model: 'media', key: 'id' } },
    },
    {
      tableName: "hospitals_served_section_settings",
      underscored: true,
      timestamps: true,
    }
  );

  HospitalsServedSectionSetting.associate = function (models) {
    HospitalsServedSectionSetting.belongsTo(models.Media, { foreignKey: 'backgroundImageId', as: 'backgroundImage' });
  };

  return HospitalsServedSectionSetting;
};

