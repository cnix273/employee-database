const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cookie2936!",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  actionList();
});

const departmentQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the department name?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter department name.");
            }
            else {
                return true;
            }
        }
    }
];

const roleQuestions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter role title.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter salary.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "department",
        message: "What department is the role in?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter department.");
            }
            else {
                return true;
            }
        }
    }
];

const employeeQuestions = [
    {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their first name.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their last name.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "role",
        message: "What is their role?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their role.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "manager_firstName",
        message: "What is their manager's first name?"
    },
    {
        type: "input",
        name: "manager_lastName",
        message: "What is their manager's last name?"
    }
];

const updateRoleQuestions = [
    {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their first name.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their last name.");
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "role",
        message: "What is their new role?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their role.");
            }
            else {
                return true;
            }
        }
    }
];

function actionList() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles"
        ]
    }).then (answer => {
        switch (answer.action) {
        case "Add departments":
            newDepartments();
            break;

        case "Add roles":
            newRoles();
            break;
        
        case "Add employees":
            newEmployees();
            break;

        case "View departments":
            viewDepartments();
            break;

        case "View roles":
            viewRoles();
            break;

        case "View employees":
            viewEmployees();
            break;

        case "Update employee roles":
            updateEmployeeRoles();
            break;
        }
    });
};

function newDepartments () {
    inquirer.prompt(departmentQuestions)
    .then (answers => {
        const queryString = 'INSERT INTO departments (name) VALUE (?);'
        connection.query(queryString, [answers.name], function(err, res) {
            if (err) throw err;
            console.log(`You have added this department: ${answers.name}.`)

            connection.end();
        });
    })
    .catch(err => {
        console.log(err);
    });
};

function newRoles () {
    inquirer.prompt(roleQuestions)
    .then (answers => {
        let departmentArray = [];
        let queryString = `SELECT * FROM departments`
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            res.forEach( (data) => {
                let departmentInfo = {id: data.id, department: data.name}
                departmentArray.push(departmentInfo);
            });

            let department_id = "";
                for (i=0; i<departmentArray.length; i++) {
                    if (answers.department = departmentArray[i].department) {
                        department_id = departmentArray[i].id;
                    }
                };

            let queryString = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, " + department_id + ");"
            connection.query(queryString, [answers.title, answers.salary], function(err, res) {
                if (err) throw err;
                console.log(`You have added this role: ${answers.title}.`)

                connection.end();
            });
        })
    }).catch(err => {
        console.log(err);
    });
};


function newEmployees () {
    inquirer.prompt(employeeQuestions)
    .then (answers => {
            let roleArray = [];
            let queryString = "SELECT id, title FROM roles";
            connection.query(queryString, (err, res) => {
                if (err) throw err;
                res.forEach( (data) => {
                    let roleInfo = {id: data.id, role: data.title};
                    roleArray.push(roleInfo)
                });

                let role_id = "";
                for (i=0; i<roleArray.length; i++) {
                    if (answers.role = roleArray[i].role) {
                        role_id = roleArray[i].id;
                    }
                };

                if (answers.manager_firstName !== "") {
                    let managerArray = [];
                    let queryString = "SELECT id, first_name, last_name FROM employees"
                    connection.query(queryString, (err, res) => {
                        if (err) throw err;
                        res.forEach((data) => {
                            let managerInfo = {id: data.id, firstName: data.first_name, lastName: data.last_name};
                            managerArray.push(managerInfo);
                        });

                        let manager_id = "";
                        for (i=0; i<managerArray.length; i++) {
                            if (answers.manager_firstName == managerArray[i].firstName && answers.manager_lastName == managerArray[i].lastName) {
                                manager_id = managerArray[i].id;
                            }
                        }

                        const queryString = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?," + role_id + ", " + manager_id + ");"
                        connection.query(queryString, [answers.first_name, answers.last_name], function(err, res) {
                            if (err) throw err;
                            console.log(`You have added this employee: ${answers.first_name} ${answers.last_name}.`);

                            connection.end();
                        });
                    })
                }

                else {
                    const queryString = "INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?," + role_id + ");"
                    connection.query(queryString, [answers.first_name, answers.last_name], function(err, res) {
                        if (err) throw err;
                        console.log(`You have added this employee: ${answers.first_name} ${answers.last_name}.`);

                        connection.end();
                    });
                }
            })
    })
    .catch (err => {
        console.log(err);
    });
};

function viewDepartments () {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function viewRoles () {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function viewEmployees () {
    connection.query("SELECT * FROM employees", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function updateEmployeeRoles () {
    inquirer.prompt(updateRoleQuestions)
    .then (answers => {
        let roleArray = [];
        let queryString = "SELECT id, title FROM roles";
        connection.query(queryString, (err, res) => {
                if (err) throw err;
                res.forEach( (data) => {
                    let roleInfo = {id: data.id, role: data.title};
                    roleArray.push(roleInfo)
                });

                let role_id = "";
                for (i=0; i<roleArray.length; i++) {
                    if (answers.role = roleArray[i].role) {
                        role_id = roleArray[i].id;
                    }
                };
            const queryString = "UPDATE employees SET role_id = " + role_id + " WHERE first_name = ? AND last_name = ?;"
            connection.query(queryString, [answers.first_name, answers.last_name], function(err, res) {
                if (err) throw err;
                console.log("Role updated")

                connection.end();
            });
        });
    }).catch(err => {
        console.log(err);
    });
};