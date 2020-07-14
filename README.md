# ebook-api
REST API Backend in Node.js for E-library

**Deployed on:**

## Features:
* APIs using Express
* Validation using Mongoose and Joi
* Logging using Winston
* Unit and Integration test using Jest
* Persistence using MongoDB and Transaction using Fawn
* Authentication with hashed passwords and Authorization using JWT
* Configuration using config

## APIs:
* Categories
* Books
* Customers
* Users
* Auth
* Rentals
* Returns

### Structure
* config - configuration for different environments
* middleware - middlewares for authentication, authorization, validation and error handling
* models - model for books, categories, customers, rentals and users
* routes - routes for apis listed above
* startup - used to load configuration, validation and routes, connect Db, enable logging and error handling
* tests - contains unit tests and integration tests
* combined.log - For logging info, warnings and error
* index.js -main file
* package.json - for installing dependencies

### Installation
1. Given that you have Node.js installed, download the repository.
2. Using terminal, go inside ebooks-api using `cd ebooks-api` command.
3. Run `npm install`




