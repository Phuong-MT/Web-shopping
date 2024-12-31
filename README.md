# Web-shopping
E-Commerce Website

This project is an e-commerce website built using React, Express.js, MySQL, and Sequelize.

1. Introduction

The e-commerce website provides the following main features:

Display product categories.

Manage shopping cart.

Process payments and manage orders.

User account management.

2. Technologies Used

Frontend

React: Build user interfaces.

Tailwind CSS: Flexible and visually appealing design.

Backend

Express.js: Build backend APIs.

Sequelize: ORM for MySQL.

MySQL: Primary database.

Others

Node.js: Runtime environment for backend.

Stripe: Integrated payment processing.

3. Installation and Running the Project

Step 1: Clone the repository

git clone https://github.com/Phuong-MT/Web-shopping
cd webshop

Step 2: Install dependencies

Frontend

cd client
npm install

Backend

cd server
npm install

Step 3: Configure environment variables

Create a .env file in the server directory and set the following environment variables:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=webshop
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

Step 4: Initialize the database

Run the following command to initialize the database:

cd server
npx sequelize db:migrate

Step 5: Start the project

Backend

cd server
npm start

Frontend

Open another terminal and run:

cd client
npm start

Step 6: Access the website

Open http://localhost:3000 in your browser.

4. Project Structure

webshop/
|-- client/          # Frontend code
    src/
        |-- assets/           # Static assets like images, fonts, and icons.
        |-- components/       # Reusable UI components such as buttons, headers, and modals.
        |-- container/        # High-level containers that combine multiple components to build pages or views.
        |-- service/          # API service logic for interacting with the backend.
        |-- store/            # Redux store configuration and state management logic.
        |-- utils/            # Utility functions and helpers for the frontend.
        |-- App.js            # Main application component.
        |-- index.js          # Application entry point.
        |-- axiosConfig.js    # Axios configuration for API requests.
        |-- redux.js          # Redux setup and middleware.
        |-- index.css         # Global CSS styles.

|-- server/          # Backend code
     src/
        |-- models/      # Sequelize models
        |-- routes/      # API routes
        |-- controllers/ # API logic
        |-- migrations/  # Database migrations

5. Main Features

Product Management: View, search, and filter products.

Shopping Cart: Add, remove, and update products in the cart.

Payments: Integrated Stripe for online payments.

User Account Management: Sign up, log in, and edit user details.

6. Contact

If you have any questions or contributions, please contact us at: phuong.tm225381@hust.edu.vn

