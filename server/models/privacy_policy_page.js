"use strict";

module.exports = (sequelize, DataTypes) => {
  const PrivacyPolicyPage = sequelize.define(
    "PrivacyPolicyPage",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 'Privacy Policy'
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
      tableName: "privacy_policy_page",
      underscored: true,
      timestamps: true,
    }
  );

  PrivacyPolicyPage.associate = function (models) {
    PrivacyPolicyPage.hasMany(models.PrivacyPolicyParagraph, {
      foreignKey: 'privacyPolicyPageId',
      as: 'paragraphs'
    });
  };

  return PrivacyPolicyPage;
};

