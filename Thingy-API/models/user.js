module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
      hashedPassword: DataTypes.STRING,
      email: DataTypes.STRING
    });

    User.associate = function(models) {
        User.hasMany(models.Device, {
          foreignKey: 'user_id'
        });
      };
      
    return User;
  };

  