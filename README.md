# Group 7 Design Project - Fitness App

## Fitness App Backend
This is the backend for a fitness application built using Flask and SQLAlchemy. It provides endpoints to manage workout programs, exercises, users, and their relationships in a MySQL database.

## Getting started
To set up your development environment and start working on this project, follow the steps below:

### 1. Prerequisites
Make sure you have the following installed on your machine:
- Python
- pip
- MySQL

**Set up an account on your machine for MySQL!**

### 2. Clone branch
To clone this branch to your computer run the following command:
```sh
git clone --single-branch --branch back-end git@github.com:okeefeja/group-7-design-project.git <directory_name>
```
You also need the database branch on your machine:
```sh
git clone --single-branch --branch database git@github.com:okeefeja/group-7-design-project.git <directory_name>
```

### 3. Installing dependencies
Run the following command to install dependencies:
```sh
pip install -r requirements.txt
```

### 4. Starting the backend server
- Ensure your MySQL server is running
  
Run this command to populate the database from the .sql file:
```sh
mysql -u root -p fitness_app < ../PATH/TO/DATABASE_DIRECTORY/fitness_app.sql
```

Now run this command to start the backend server:
```sh
DATABASE_URL=mysql+pymysql://USERNAME:PASSWORD@127.0.0.1/fitness_app python3 app.py
```

The application will start running on http://127.0.0.1:5000/.
