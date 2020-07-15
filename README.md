# ebook-api
REST API Backend in Node.js for E-library

**Deployed on:**

base_url: https://classique-mandarine-10882.herokuapp.com/

## Features:
* APIs using Express
* Validation using Mongoose and Joi
* Logging using Winston
* Unit and Integration test using Jest
* Persistence using MongoDB and Transaction using Fawn
* Authentication with hashed passwords and Authorization using JWT
* Configuration using config

## APIs:
* [Categories](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Categories-api.md)
* [Books](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Books-api.md)
* [Customers](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Customers-api.md)
* [Users](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Users-api.md)
* [Auth](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Auth-api.md)
* [Rentals](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Rentals-api.md)
* [Returns](https://github.com/rohanchauhan/ebook-api/blob/master/api-docs/Returns-api.md)

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




