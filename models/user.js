'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // single user can have many api-keys
      User.hasMany(models.ApiKey, {
        foreignKey: 'userId',
        as: 'apiKeys',
      });

      // single user can make many requests
      User.belongsToMany(models.ApiRequest, {
        through: models.ApiKey,
        foreignKey: 'userId',
        otherKey: 'keyId',
        as: 'apiRequests',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );

  return User;
};
