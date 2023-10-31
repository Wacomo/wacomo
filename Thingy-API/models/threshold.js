module.exports = (sequelize, DataTypes) => {
    const Threshold = sequelize.define('Threshold', {
      threshold_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      temp_max: DataTypes.FLOAT,
      temp_min: DataTypes.FLOAT,
      humidity_max: DataTypes.FLOAT,
      humidity_min: DataTypes.FLOAT,
      co2_max: DataTypes.FLOAT,
      co2_min: DataTypes.FLOAT
    });
    return Threshold;
  };
  