"use strict";

module.exports = (sequelize, DataTypes) => {
  const PrivacyPolicyParagraph = sequelize.define(
    "PrivacyPolicyParagraph",
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
      tableName: "privacy_policy_paragraphs",
      underscored: true,
      timestamps: true,
    }
  );

  PrivacyPolicyParagraph.associate = function (models) {
    PrivacyPolicyParagraph.belongsTo(models.PrivacyPolicyPage, {
      foreignKey: 'privacyPolicyPageId',
      as: 'page'
    });
  };

  return PrivacyPolicyParagraph;
};

