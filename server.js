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
        name: "manager",
        message: "What is their manager's last name?",
        validate: function (response) {
            if (response.length < 1) {
                return console.log("Please enter their manager's last name.");
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
        connection.query("INSERT INTO departments (name) VALUES (" + answers.name + ");", function(err, res) {
            if (err) throw err;
            console.log(res);
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
        connection.query("SELECT departments.id FROM departments INNER JOIN roles ON (departments.id = roles.department_id) WHERE (department.name = ?)", [answers.department], function(err, res) {
            if (err) throw err;
            var department_id = res;
        });
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)" [answers.title, answers.salary, department_id], function(err, res) {
            if (err) throw err;
        });
    })
    .catch(err => {
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