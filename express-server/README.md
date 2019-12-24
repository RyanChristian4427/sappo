# Sappo Express Server

This is the back end server for Sappo, an ad hoc communication app used to assist in citizen science. The project is centered around the Brazilian Atlantic Rainforest and aims to retrieve information about frogs in particular. "Sappo" is Portuguese for "frog".

The back end for this project is written using Express, a fast, unopinionated, minimalist web framework for Node.js. The server is written entirely in TypeScript, it uses MongoDB for data persistence, and it utilizes Mongoose for the database connections. 

This Express server will be updated in conjunction with the React client.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
NodeJs
NPM
Docker (optional)
MongoDB (optional)
```

### Running

To run the web server on localhost, first you will need to install all dependencies. Run from the root directory: 

```
npm install
```

Then a decision will need to be made about the database. I have included a MongoDB Atlas database for use in a 'production' environment (i.e., for my lecturer to use while marking). There's no guarantees that this will remain up.

If it is not currently up, you will need to use the development profile, which means utilizing the docker-compose file I have provided or using your own install. Using the docker-compose files means you will have to do no configuration yourself.

To build the Mongo database from docker, run:

```
docker-compose up --build -d
```

After that, the dev server can be ran with:

```
npm run serve:dev
```

If you'd like to use the production profile, that can be ran with:

```
npm run serve:prod
```

If you choose to not use production (or can't), and don't want to use the Docker based database, you will need to edit the [.env](.env) file to include the correct database URL and credentials. 

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js). The linting rules are all quite standard.

### Lints files

```
npm run lint
```
