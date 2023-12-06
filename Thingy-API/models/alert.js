module.exports = (sequelize, DataTypes) => {
    const Alert = sequelize.define('Alert', {
      device_name: DataTypes.STRING,
      metric_data: DataTypes.STRING,
      time_of_anomaly: DataTypes.DATE,
      anomaly_value: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,  // Add this field to associate with Device model
    });
  
    // Associate the Alert model with the Device model
    Alert.associate = (models) => {
      Alert.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    };
  
    return Alert;
  };
  