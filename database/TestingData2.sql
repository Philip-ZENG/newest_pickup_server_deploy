INSERT INTO activity_user 
(activity_id, user_id, role)
VALUES
(1,3,'MANAGER'),
(1,4,'MEMBER'),
(2,1,'MANAGER'),
(2,2,'MEMBER'),
(2,3,'MEMBER'),
(2,4,'MEMBER'),
(3,1,'MANAGER'),
(3,2,'MEMBER');


INSERT INTO activity_info
(title, time, max_capacity, type)
VALUES
('Shopping', '2022-05-29 12:00:00', 10, 'Shopping'),
('Running', '2022-05-29 12:00:00', 10, 'Running'),
('Eating', '2022-05-29 12:00:00', 10, 'Eating');


INSERT INTO user_info
(email,password,user_name)
VALUES
('philip@google.com', '123456', 'philip'),
('alex@google.com', '123456', 'alex'),
('bob@google.com', '123456', 'bob'),
('marry@google.com','123456', 'marry'),
('max@gmail.com', '123456', 'max');

INSERT INTO admin_account
(admin_email, admin_password)
VALUES
('admin1@gmail.com', '123456');