const { Department, Role, Employee } = require(`../../models`);
// const Role = require(`../../models/Role`);
// const Employee = require(`../../models/Employee`);
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
        first_name: `Don`,
        last_name: `Quixote`,
        role_id: 2,
        manager_id: null
    },
    {
        first_name: `Big`,
        last_name: `Jim`,
        role_id: 3,
        manager_id: null
    },
    {
        first_name: `Earl`,
        last_name: `King`,
        role_id: 6,
        manager_id: null
    },
    {
        first_name: `Timmy`,
        last_name: `Kills`,
        role_id: 1,
        manager_id: 1
    },
    {
        first_name: `Benny`,
        last_name: `Buckhorn`,
        role_id: 1,
        manager_id: 1
    },
    {
        first_name: `Gordon`,
        last_name: `Ramshead`,
        role_id: 4,
        manager_id: 2
    },
    {
        first_name: `Chayenne`,
        last_name: `Apathy`,
        role_id: 4,
        manager_id: 2
    },
    {
        first_name: `Leon`,
        last_name: `Louise`,
        role_id: 5,
        manager_id: null
    },
    {
        first_name: `Tara`,
        last_name: `Bithia`,
        role_id: 7,
        manager_id: 6
    },
    
]

sequelize
    .sync({ force: true })
    .then(() => {
        return Employee.bulkCreate(employeeData);
    })
    .then(data => {
        console.log(`Employees seeded`);
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });