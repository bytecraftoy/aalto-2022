# Aalto AI assisted content creation tool

A web based automation tool for rapid game content creation using state of the art AI models.
This web application provides an efficient and easy to use interface for various online API's such as GPT3

## Setting up, running and deploying the project

To build the project and install dependencies, make sure that node.js and npm are installed. Refer to https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Quick start using npm scripts

The project contains npm scripts to make setting up and deploying easier. These shouldn't require any additional work, and can be run straight after cloning the repository (provided that node.js and npm are installed correctly)
The main ones are:

-   `npm run dev-project`: This will install missing dependencies, and start the backend and frontend in dev mode. After running the command, the frontend should open up in a browser automatically.
-   `npm run deploy-project`: This will install missing dependencies, build the backend and frontend for production, and copy them to a `deploy/` directory. This contains the frontend as static files which the backend serves.
-   `npm run demo-project`: This runs `deploy-project` but additionally starts up the production build with node. After running this, the website is available at `http://localhost:3030`

### Other commands

Other commands include utilities used by the previous commands, as well as testing, linting and documentation generation:

-   `npm run setup-project`: Install all dependencies for the project with one command from the root directory.
-   `npm run build-project`: Build backend and frontend separately in `backend/build` and `frontend/build`.
-   `npm run test-project`: Run unit tests for backend and frontend with one command.
-   `npm run lint-project`: Run linting for backend and frontend.
-   `npm run prettier`: Check all code files with prettier, but do not modify them.
-   `npm run prettier-write`: Enforce prettier rules in the project. Rewrite files that break them.

### Building and running separately

Using the convinience scripts is purely optional. The backend and frontend can be built, run or tested separately with `npm build`, `npm start` and `npm test` etc. from `backend/` or `frontend/` respectively.
