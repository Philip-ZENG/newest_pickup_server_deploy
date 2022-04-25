-- Activity-user database
-- role: role of a user in an activity, can only be either "manager" or "participant"

CREATE TABLE activity_user 
(
    activity_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(20) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activity_info(activity_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- User database

CREATE TABLE user_info
(
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    gender VARCHAR(20),
    contact_info VARCHAR(20),
    personal_intro VARCHAR(255),
    profile_photo VARCHAR(255)
);


-- Activity database

CREATE TABLE activity_info
(
    activity_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    time DATETIME NOT NULL,
    location VARCHAR(255),
    description VARCHAR(255),
    max_capacity INT NOT NULL,
    quota_left INT,
    type VARCHAR(255) NOT NULL
);


-- Admin Account database
CREATE TABLE admin_account
(
    admin_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    admin_email VARCHAR(255) UNIQUE NOT NULL,
    admin_password VARCHAR(255) NOT NULL
);