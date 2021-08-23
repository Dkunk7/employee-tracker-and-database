const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);
const Department = require("./Department");

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: `department`,
            //     key: `id`
            // }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: `role`
    }
);

module.exports = Role;