# Employee Database

## Description

This application is a command line application built using Node.js, Inspire, and MySQL that serves as a dynamic employee database generator.

The application creates a database containing 3 tables: Departments, Roles, and Employees. The Departments table includes an ID and the department name. The Roles table includes an ID, the role title, the salary, and the ID of the department the role is in. The Employees table includes an ID, the first and last name of the employee, the ID of the role the employee is in, and the ID of the employee's manager(optional). These tables are populated with information inputted by the user in terminal in response to a series of prompts based on the action the user selects.

The can perform the following actions:
* Add Employees
* Add Departments
* Add Roles
* View Employees
* View Departments
* View Roles
* Update Employee Roles

## Installation

1. Clone the repository from github to your local server. In terminal, type: "git clone https://github.com/cnix273/employee-database.git".
2. Install Node.js. https://nodejs.org/en/download/
3. Install the Inquirer npm package. In terminal, type: "npm install inquirer".
4. Install the MySQL npm package. In terminal, type: "npm install mysql".

## Usage

**Technologies Used**
* JavaScript - Used to make the application dynamic so that input can be received from the user.
* Node.js - JavaScript runtime environment that executes JavaScript code outside a web browser.
* GitHub - Hosts the repository that can be deployed to GitHub Pages.
* MySQL - Databse Management System.

Using terminal, navigate to the directory containing the server.js file. Type "node server.js" into the command line to run the application. You will be prompted with a series of questions that will be used to generate populate the employee databse.

**This video is a walkthrough of the application, showing its functioalityn**
![Video Walkthrough](https://github.com/cnix273/README-Generator/blob/main/assets/Walkthrough.mov)

## Credits

**Author:** Cameron Nix
* [LinkedIn](https://www.linkedin.com/in/cameron-nix-a74aa1109/)
* [GitHub](https://github.com/cnix273)

## Contributing

Pull requests are welcome.

To contribute to this refactor, clone this repo locally and commit your code on a separate branch.

## License

Licensed by: MIT License.
