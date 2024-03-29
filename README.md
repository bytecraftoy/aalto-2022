# Aalto AI assisted content creation tool

A web based automation tool for rapid game content creation using state of the art AI models.
This web application provides an efficient and easy-to-use interface for various online API's such as GPT3

## Easy setup with Docker

This setup is recommended for running or demonstrating the app locally with a OpenAI API key. However, it is not recommended to use this setup for development.

1. Make sure [Docker](https://www.docker.com/) is installed and running.

2. Clone this repository by running: `git clone https://github.com/bytecraftoy/aalto-2022`.

3. Fetch the aalto-2022-proxy submodule by running `git submodule init` and `git submodule update` inside the aalto-2022 folder.

4. Copy the sample files inside aalto-2022/docker_deploy/ and aalto-2022/docker_deploy/db/ with new names that don't include the "-sample". For example, aalto-2022/docker_deploy/.backend-env-sample should be copied to aalto-2022/docker_deploy/.backend-env.

5. Modify the copied files with any text editor following the instructions given in each file.

6. Inside aalto-2022/ run: `docker-compose up`.

7. The app can now be accessed from [http://localhost:3030](http://localhost:3030).

## Setting up, running and deploying the project

To build the project and install dependencies, make sure that node.js and npm are installed. Refer to https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Docker

Development requires [Docker](https://www.docker.com/) for running a developer database. Your account should have permission to start new Docker containers using docker-compose.

### Quick start using npm scripts

The project contains npm scripts to make setting up and deploying easier. These shouldn't require any additional work, and can be run straight after cloning the repository (provided that node.js and npm are installed correctly) The scripts are designed to be run from a single terminal.
The main ones are:

-   `npm run dev-project`: This will install missing dependencies, and start the backend and frontend in dev mode. After running the command, the frontend should open up in a browser automatically.
-   `npm run deploy-project`: This will install missing dependencies, build the backend and frontend for production, and copy them to a `deploy/` directory. This contains the frontend as static files which the backend serves.
-   `npm run demo-project`: This runs `deploy-project` but additionally starts up the production build with node. After running this, the website is available at `http://localhost:3030`

### Other commands

Other commands include utilities used by the previous commands, as well as testing, linting and documentation generation:

-   `npm run ds`: Quick start dev mode, don't install dependencies.
-   `npm run setup-project`: Install all dependencies for the project with one command from the root directory.
-   `npm run build-project`: Build backend and frontend separately in `backend/build` and `frontend/build`.
-   `npm run test-project`: Run unit tests for backend and frontend with one command.
-   `npm run lint-project`: Run linting for backend and frontend.
-   `npm run prettier`: Check all code files with prettier, but do not modify them.
-   `npm run prettier-write`: Enforce prettier rules in the project. Rewrite files that break them.
-   `npm run clean-project`: Cleans node modules, builds and deploys.
-   `npm run check-project`: Do a sanity check on the project before commits. This will lint, build, test, and prettier-write.
-   `npm run clean-check`: Clean project, and then check it.
-   `npm run playwright`: Run End-to-End tests with Playwright.

### Building and running separately

Using the convinience scripts is purely optional. The backend and frontend can be built, run or tested separately with `npm build`, `npm start` and `npm test` etc. from `backend/` or `frontend/` respectively.

### Documentation

The project contains a documentation site created from markdown using [Docusaurus](https://docusaurus.io/)
To view the documentation, you can use `npm run docusaurus`. This will open documentation as a site at `http://localhost:7777`.
It is the same as running the commands:

-   `npm run build-docs`
-   `npm run start-docs`
