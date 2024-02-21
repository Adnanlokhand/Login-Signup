Create Database task;
Create Table users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL

);

Insert into users (user_name,user_email,user_password) Values ('adnan','adnanlokhand@gmail.com','Adnan@5253');