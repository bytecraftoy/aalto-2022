## Available Scripts

In the backend directory, you can run:

### `npm run copy-sample-env`

Copies `.env-sample` to `.env` and generates a unique development database password.

### `npm run dev`

Runs the app and database in the development mode.\
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

The server will restart if you make edits.

If the database fails to start and backend is timed out, the `.env` file most likely is outdated or does not exist. If it is missing, copy `.env-sample` to `.env` or run `npm run copy-sample-env`. If you already have one, add the missing values from `.env-sample`.

### `npm run start-dev`

Start only backend in development mode.

### `npm run start-dev-database`

Start only database in development mode.

### `npm run lint`

Checks the code for lint errors.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm start`

Runs the app from `build` folder in production mode.
