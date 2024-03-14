# Group 7 Design Project - Fitness App

## Overview
This document provides instructions on how to run the MySQL script necessary for setting up the database for the Fitness App.

## Running the MySQL Script

### Prerequisites
- Ensure MySQL Server is installed and running on your machine.

### Steps to Run the Script

1. Open your terminal or command prompt.

2. Log in to your MySQL server with the following command:
    ```sh
    mysql -u [your-username] -p
    ```
    Replace `[your-username]` with your actual MySQL username.

3. When prompted, enter your MySQL password.

4. Execute the script by running:
    ```sql
    SOURCE /path/to/your/fitness_app.sql;
    ```
    Replace `/path/to/your/fitness_app.sql` with the actual path to your MySQL script file.

This will create the necessary tables and populate them with any initial data required for the Fitness App to function properly.
