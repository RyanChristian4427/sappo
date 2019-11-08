# Sappo Express Server

This is the back end server for Sappo, an ad hoc communication app used to assist in citizen science. The project is centered around the Brazilian Atlantic Rainforest, aims to retrieve information about frogs in particular. "Sappo" is Portuguese for "frog".

The back end for this project is written using Express, a fast, unopinionated, minimalist web framework for Node.js. The server is written entirely in TypeScript, it uses MongoDB for data persistence, and it utilizes Mongoose for the database connections. 

This Express server will be updated in conjunction with the React client.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
NodeJs
NPM
```

### Running

To run the web server on localhost, you will need to run from the root directory: 

```
npm install
```

Then, to run the dev build, run:

```
docker-compose up --build -d
```

#### Compiles and uses a local Mongo Docker Container for a Database

```
npm run serve:dev
```

#### Compiles and uses MongoDB Atlas for a Database

```
npm run serve:prod
```

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js). The linting rules are all quite standard.

### Lints files

```
npm run lint
```
