'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiRequest extends Model {
    static associate(models) {}
  }

  ApiRequest.init(
    {
      keyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endpoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ApiRequest',
      tableName: 'ApiRequests',
      underscored: true,
    }
  );

  return ApiRequest;
};
