INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, 3), 
    ('Mike', 'Tyson', 2, 1), 
    ('Ashley', 'Carter', 3, null), 
    ('Kevin', 'Hart', 4, 3), 
    ('Jordan', 'Brown', 5, null), 
    ('Sarah', 'Smith', 6, null), 
    ('Tom', 'Allen', 7, 6), 
    ('Christian', 'Thompson', 3, 2);

INSERT INTO employee_Role(title, salary, department_id)
VALUES 
    ('Sales lead', 100000, 1), 
    ('Sales person', 80000, 1), 
    ('Lead engineer', 150000, 2), 
    ('Software engineer', 120000, 2), 
    ('Accountant', 125000, 3), 
    ('Legal team lead', 250000, 4), 
    ('Lawyer', 190000, 4);

INSERT INTO employee_Dept(dept_name)
VALUES 
    ('Sales'), 
    ('Engineering'),
    ('Finance'), 
    ('Legal');
