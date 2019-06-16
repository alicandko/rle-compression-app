# RLE Compression App

This is an application that encodes the incoming data streams using RLE and caches it. The application exposes a single endpoint to access the data at a given index.

## Setting up the project

To run the server, follow these steps:

1. [Install yarn.](https://yarnpkg.com/en/)
2. `cd` to the directory of the project.
3. Execute `yarn install` to install the client application.
4. Execute `yarn start` to run the client application.
5. The server runs on `localhost:1337`
6. Execute `yarn test` to run the tests.

## How to test
1. Execute `docker run -p 8080:80 21re/coding-challenge`
2. Execute `curl localhost:1337/$index`