const express = require(`express`);
const fetch = require(`node-fetch`);
const cTable = require(`console.table`);
const routes = require(`./routes`);
const inquirer = require(`inquirer`);
const sequelize = require(`./config/connection`);
const Department = require("./models/Department");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`));
});

const mainPrompt = () => {
    return inquirer
        .prompt([
            {
                type: `list`,
                name: `choice`,
                message: `What would you like to do?`,
                choices: [`View all departments`, `View all roles`, `View all employees`, `Add a department`, `Add a role`, `Add an employee`, `Update an employee`]
            }
        ]).then(response => {
            if (response.choice === `View all departments`) {
                console.log(`a`)
                return viewAllDept();
            } else if (response.choice === `View all roles`) {
                console.log(`b`)
                return viewAllRoles();
            } else if (response.choice === `View all employees`) {
                console.log(`c`)
                return viewAllEmp();
            } else if (response.choice === `Add a department`) {
                console.log(`d`)
                return addDept();
            } else if (response.choice === `Add a role`) {
                console.log(`e`)
                return addRole();
            } else if (response.choice === `Add an employee`) {
                console.log(`f`)
                return addEmp();
            } else if (response.choice === `Update an employee`) {
                console.log(`g`)
                return updateEmp();
            }
        });
}

const viewAllDept = () => {
    fetch(`http://localhost:3001/api/departments`, {
        method: `GET`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            alert('Error: ' + response.statusText);
        })
        .then(response => {
            console.table(response);
        })
}

const viewAllRoles = () => {
    fetch(`http://localhost:3001/api/roles`, {
        method: `GET`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            // alert('Error: ' + response.statusText);
        })
        .then(response => {
            console.table(response);
        })
}

const viewAllEmp = () => {
    fetch(`http://localhost:3001/api/employees`, {
        method: `GET`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            // alert('Error: ' + response.statusText);
        })
        .then(response => {
            console.table(response);
        })
}

const addDept = () => {
    
}

const addRole = () => {
    
}

const addEmp = () => {
    
}

const updateEmp = () => {
    
}

mainPrompt();