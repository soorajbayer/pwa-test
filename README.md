# Project README

## Overview

This project was bootstrapped with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) and utilizes the PWA (Progressive Web Application) template. It serves data from a JSON server and has been specifically developed to address merge conflicts.
This project is based on typescript

### Technologies

- **Frontend**: React
- **Backend**: Node.js

### Setup Instructions

#### Serving Data with JSON Server

To serve the data from the JSON server, follow these steps:

1. Ensure you have `json-server` installed globally. If not, install it using npm:

   `npm i -g json-server`

2. Navigate to the directory containing your `json-server-db.json` file.

3. Start the JSON server by running the following command:

   `json-server --watch json-server-db.json --port 3001`

This will start the JSON server on port 3001, serving the data defined in `json-server-db.json`.

### Development

4. To run the application in development mode, navigate to the project directory and execute:
   `npm install`
   `npm start`

This command starts the app in development mode, opening it in the default web browser.

### Production

5. To create the production build, navigate to the project directory and execute :

   `npm run build`

   `serve -s build`

### Versioning

This version of the project has been specifically tailored to resolve merge conflicts. It represents a stable release focused on addressing these issues.
