SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager

FROM employee 

LEFT JOIN employee manager ON manager.id = employee.manager_id

INNER JOIN employee_Role ON employee.role_id = employee_Role.id

INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;

SELECT dept_name FROM employee_Dept;

SELECT title FROM employee_Role