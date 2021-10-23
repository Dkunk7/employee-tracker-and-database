const cTable = require(`console.table`);
const { prompt } = require(`inquirer`);
// const inquirer = require(`inquirer`);

const db = require("./db/connection");


const mainPrompt = () => {
    // return inquirer
        prompt([
            {
                type: 'list',
                name: `choice`,
                message: `What would you like to do?`,
                choices: [`View all departments`, `View all roles`, `View all employees`, `Add a department`, `Add a role`, `Add an employee`, `Update an employee`]
            }
        ]).then((response) => {
            let choice = response.choice
            switch (choice) {
                case "View all departments":
                    viewAllDept();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmp();
                    break;
                case "Add a department":
                    addDept();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmp();
                    break;
                case "Update an employee":
                    updateEmp();
                    break;
                // default:
                //     mainPrompt();
                //     break;
            }
        })
        // .catch(err => console.log(err));
}

// View all departments
const viewAllDept = () => {
    console.log('Showing all departments');

    const sql = 'SELECT * FROM department';
    db.promise().query(sql)
    .then(([rows]) => {
        let department = rows;
        console.table(department);

        mainPrompt();
    })
};

// View all roles
const viewAllRoles = () => {
    console.log('Showing all roles');

    const sql = 'SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id';
    db.promise().query(sql)
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);

        mainPrompt();
    })
};

// View all employees
const viewAllEmp = () => {
    console.log('Shwoing all employees');

    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';
    db.promise().query(sql)
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);

        mainPrompt();
    })
};

const addDept = () => {
    console.log('Adding new department...');
    
       prompt([
           {name: 'dept',
            type: 'input',
            message: 'Please include the name of the new department'
        },
       ])
       .then(answer => {
           const sql = 'INSERT INTO department (name) VALUES (?)';
           db.query(sql, answer.dept, (err, res) => {
               if (err) throw err;
               console.log(`${answer.dept} was successfully added to departments`);
               viewAllDept();

               mainPrompt();
           })
       });
};

const addRole = () => {
    console.log('Adding new role...');
        const dsql = `SELECT * FROM department`;
        
        db.query(dsql, (err, res) => {
            if (err) throw err;
            const choices = res.map(({name, id}) =>({name: name, value: id}));
            prompt([
                {
                     name: 'title',
                     type: 'input',
                     message: 'Please include the name of the new role'
                 },
     
             {
                 name: 'salary',
                 type: 'input',
                 message: 'Please include the salary of the new role'
             },
     
             {   name: 'dept',
                 type: 'list',
                 message: 'Please include the department for the new role',
                 choices: choices
             },
            ])
            .then(function(answer) {
                const params = [];
                const title = answer.title;
                params.push(title);
                const salary = answer.salary;
                params.push(salary);
                const dept = answer.dept;
                params.push(dept);
                const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log(`${answer.name} was successfully added to roles`);
                    viewAllRoles();
                })
     
            })
            
        })
};

const addEmp = () => {
    console.log('Adding new employee...');

       prompt([
           
            {       name: 'firstName',
                    type: 'input',
                    message: "Please include the employee's first name",
                    validate: firstName => {
                        if (firstName) {
                            return true;
                        } else {
                            console.log('Please enter a first name!');
                            return false;
                        }
                    }
            },

        
                {   name: 'lastName',
                    type: 'input',
                    message: "Please include the employee's last name",
                    validate: lastName => {
                        if (lastName) {
                            return true;
                        } else {
                            console.log('Please enter a last name!');
                            return false;
                        }
                    }
            }
       ])
       .then(response => {
           const params = [response.firstName, response.lastName]

           const rsql = `SELECT role.id, role.title FROM role`;

           db.query(rsql, (err,res) => {
               if (err) throw err;

               const choices = res.map(({id, title}) => ({name:title, value: id}))
               prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Please include the role of the employee',
                                choices: choices
                            }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);

                    const msql = `SELECT * FROM employee`;
                    db.query(msql, (err, res) => {
                        if (err) throw err;
                        const employees = res.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

                        prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                choices: employees
                            }
                        ])
                        .then(mChoice => {
                            const manager = mChoice.manager;
                            params.push(manager);
                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                            db.query(sql, params, (err, res) => {
                                if (err) throw err;
                                console.log('Employee was succesffully added')

                                viewAllEmp();
                            })
                        })
                    })
                })
            })
       });
}

const updateEmp = () => {
    const esql = `SELECT * FROM employee`;

    db.query(esql, (err, res) => {
        if (err) throw err;
        const employees = res.map(({id, first_name, last_name}) =>({name: first_name + " " + last_name, value: id}));
        prompt([
            {
            type: 'list',
            name: 'name',
            message: "Please select the employee you'd like to edit",
            choices: employees
        }
        ])
        .then(answer => {
            const employee = answer.name;
            const params = [];
            params.push(employee);

            const rsql = `SELECT * FROM role`;
            db.query(rsql, (err, res) => {
                if (err) throw err;

                const roles = res.map(({id, title}) =>({name: title, value: id}));

                prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please include the new role for the employee',
                        choices: roles
                    }
                ])
                .then(answer => {
                    const role = answer.role;
                    params.push(role);

                    params[0] = role;
                    params[1] = emply;

                    const sql = `UPDATE employee SET role_id = ? WHERE id =?`;
                    db.query(sql, params, (err,res) => {
                        if (err) throw err;
                        console.log('Employee updated');

                        viewAllEmp();
                    });
                })
            })
        })
    })
};

mainPrompt();