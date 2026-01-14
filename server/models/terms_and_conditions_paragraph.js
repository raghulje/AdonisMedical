"use strict";

module.exports = (sequelize, DataTypes) => {
  const TermsAndConditionsParagraph = sequelize.define(
    "TermsAndConditionsParagraph",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      orderIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: "terms_and_conditions_paragraphs",
      underscored: true,
      timestamps: true,
    }
  );

  TermsAndConditionsParagraph.associate = function (models) {
    TermsAndConditionsParagraph.belongsTo(models.TermsAndConditionsPage, {
      foreignKey: 'termsAndConditionsPageId',
      as: 'page'
    });
  };

  return TermsAndConditionsParagraph;
};

