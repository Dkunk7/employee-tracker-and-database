INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Legal'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', '60000', 1),    -- id: 1
('Salesperson', '50000', 1), -- id: 2
('Software Engineer', '75001', 2), -- id: 3
('Lead Engineer', '95000', 2), -- id: 4
('Lawyer', '85000', 3), -- id: 5
('Legal Team Lead', '100000', 3), -- id: 6
('Accountant', '65000', 4); -- id: 7

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ragnar', 'Johnson', 1, NULL),
('Terry', 'Jerry', 2, 1),
('Abernathy', 'Scott', 3, 5),
('Joshua', 'Reaves', 3, 5),
('Ectus', 'Amundo', 4, NULL),
('Ralph', 'Dinbo', 5, 7),
('Phinneas', 'Adobo', 6, NULL),
('Karen', 'Stephen', 7, NULL),