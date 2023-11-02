module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
      device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      device_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      threshold_id: DataTypes.INTEGER
    });

    Device.associate = function(models) {
        Device.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        Device.belongsTo(models.Threshold, {
          foreignKey: 'threshold_id'
        });
      };
    return Device;
  };
  