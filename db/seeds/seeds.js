const Department = require(`../../models/Department`);
const Role = require(`../../models/Role`);
const sequelize = require(`../../config/connection`);

const deptData = [
    {
        name: `Sales`
    },
    {
        name: `Engineering`
    },
    {
        name: `Legal`
    },
    {
        name: `Finance`
    }
]

sequelize
    .sync({ force: true })
    .then(() => {
        return Department.bulkCreate(deptData);
    })
    .then(data => {
        console.log(`Departments seeded`);
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

const roleData = [
    {
        title: `Salesperson`,
        salary: 80000,
        department_id: 1
    },
    {
        title: `Sales Lead`,
        salary: 10000,
        department_id: 1
    },
    {
        title: `Lead Engineer`,
        salary: 150000,
        department_id: 2
    },
    {
        title: `Software Engineer`,
        salary: 120000,
        department_id: 2
    },
    {
        title: `Accountant`,
        salary: 125000,
        department_id: 4
    },
    {
        title: `Legal Team Lead`,
        salary: 250000,
        department_id: 3
    },
    {
        title: `Lawyer`,
        salary: 190000,
        department_id: 3
    }
]
    
    
sequelize
    .sync({ force: true })
    .then(() => {
        return Role.bulkCreate(roleData);
    })
    .then(data => {
        console.log(`Roles seeded`);
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });


const employeeData = [
    {
        first_name:
        last_name:
        manager_id:
    }
]