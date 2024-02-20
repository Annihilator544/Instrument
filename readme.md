# Project Title

## Introduction

Welcome to the Instrument REST API project. This API is designed to provide a comprehensive interface for managing an Instrument record system. It is built using Node.js and follows the principles of Test Driven Development (TDD).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
git clone https://github.com/Annihilator544/Instrument.git
```

### Prerequisites

What things you need to install the software and how to install them.

- Node.js
- npm

### Installing

A step by step series of examples that tell you how to get a development environment running.

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the server

## Running the tests

Run `npm test` to run the automated tests for this system.

## API Endpoints

API endpoints Description:

- `GET /` : This endpoint is used to get the index page of the instrument.
- `GET /instrument/create` : This endpoint is used to get the instrument creation page.
- `POST /instrument/create` : This endpoint is used to create a new instrument.
- `GET /instrument/:id/delete` : This endpoint is used to get the instrument deletion page for a specific instrument.
- `POST /instrument/:id/delete` : This endpoint is used to delete a specific instrument.
- `GET /instrument/:id/update` : This endpoint is used to get the instrument update page for a specific instrument.
- `POST /instrument/:id/update` : This endpoint is used to update a specific instrument.
- `GET /instrument/:id` : This endpoint is used to get the details of a specific instrument.
- `GET /instruments/` : This endpoint is used to get the details of a specific instrument.
- `GET /classification/create` : This endpoint is used to get the classification creation page.
- `POST /classification/create` : This endpoint is used to create a new classification.
- `GET /classification/:id/delete` : This endpoint is used to get the classification deletion page for a specific classification.
- `POST /classification/:id/delete` : This endpoint is used to delete a specific classification.
- `GET /classification/:id/update` : This endpoint is used to get the classification update page for a specific classification.
- `POST /classification/:id/update` : This endpoint is used to update a specific classification.
- `GET /classification/:id` : This endpoint is used to get the details of a specific classification.
- `GET /classifications/` : This endpoint is used to get the details of a specific classification.
- `GET /company/create` : This endpoint is used to get the company creation page.
- `POST /company/create` : This endpoint is used to create a new company.
- `GET /company/:id/delete` : This endpoint is used to get the company deletion page for a specific company.
- `POST /company/:id/delete` : This endpoint is used to delete a specific company.
- `GET /company/:id/update` : This endpoint is used to get the company update page for a specific company.
- `POST /company/:id/update` : This endpoint is used to update a specific company.
- `GET /company/:id` : This endpoint is used to get the details of a specific company.
- `GET /company/` : This endpoint is used to get the details of a specific company.
- `POST /search` : This endpoint is used to search for a instrument.

## Architectural Decisions

- made using model view control design.
- user Jest SuperTest to test Api endpoints.
- Postman was used to check for api payloads and responses.
- file populatedb.js is used to populate the db with some data.
- MongoDb was used for data storage and collection.
- Mongo memory server  was used to check for model errors.
- array of variants was used in products array instead of product id in every variant to reduce access times, and make the api faster.
- express validator used to validate response data and send error codes.
- async event handler used to fetch data asynchronously.
- test.js used to test the api endpoints using Jest/ SuperTest


## Other Instructions

change mongodb url to your mongodb url

## Built With

This project uses these dependencies:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [async-handler](https://www.npmjs.com/package/express-async-handler) - Middleware for handling exceptions inside of async express routes
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Middleware which parses cookies attached to the client request object
- [debug](https://www.npmjs.com/package/debug) - A tiny JavaScript debugging utility modelled after Node.js core's debugging technique
- [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Middleware for handling exceptions inside of async express routes
- [express-validator](https://express-validator.github.io/docs/) - An express.js middleware for validator.js.
- [http-errors](https://www.npmjs.com/package/http-errors) - Create HTTP error objects
- [mongodb](https://www.mongodb.com/) - The MongoDB Database
- [mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [pug](https://pugjs.org/api/getting-started.html) - High-performance template engine

This project uses these devDependencies:

- [jest](https://jestjs.io/) - Delightful JavaScript Testing

## Authors

* **Aditya Sharma** - *sigh* - [Annihilator544](https://github.com/Annihilator544)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details