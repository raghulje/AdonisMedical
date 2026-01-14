"use strict";

module.exports = (sequelize, DataTypes) => {
  const TermsAndConditionsPage = sequelize.define(
    "TermsAndConditionsPage",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 'Terms and Conditions'
      },
      subtitle: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      richTextContent: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      }
    },
    {
      tableName: "terms_and_conditions_page",
      underscored: true,
      timestamps: true,
    }
  );

  TermsAndConditionsPage.associate = function (models) {
    TermsAndConditionsPage.hasMany(models.TermsAndConditionsParagraph, {
      foreignKey: 'termsAndConditionsPageId',
      as: 'paragraphs'
    });
  };

  return TermsAndConditionsPage;
};

