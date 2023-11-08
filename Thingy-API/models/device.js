module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
      device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING, //is the device name or Id
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    });

    Device.associate = function(models) {
        Device.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        Device.hasOne(models.Threshold, {
          foreignKey: 'device_id'
        });
      };
    return Device;
  };
  