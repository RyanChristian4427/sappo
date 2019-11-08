# Sappo React Client

This is the front end client for Sappo, an ad hoc communication app used to assist in citizen science. The project is centered around the Brazilian Atlantic Rainforest, aims to retrieve information about frogs in particular. "Sappo" is Portuguese for "frog".

The front end for this project is written in React, a library used to for building user interfaces. Global state is managed using MobX, every component and helper file is written using TypeScript, and this project utilizes the Bulma SCSS framework.

This React client will be updated in conjunction with the Express API server.

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

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js). The linting rules are all quite standard.

### Lints files
```
npm run lint
```
