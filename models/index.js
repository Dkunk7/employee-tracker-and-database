const Department = require(`./Department`);
const Employee = require(`./Employee`);
const Role = require(`./Role`);


Department.hasMany(Role)//, {
//     foreignKey: `department_id`
// });
Role.belongsTo(Department, {
    // foreignKey: `department_id`,
    // as: `department_name`
});

module.exports = { Department, Role, Employee };

