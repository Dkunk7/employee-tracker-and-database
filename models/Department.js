const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Department extends Model {}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: `department`
    }
);

module.exports = Department;