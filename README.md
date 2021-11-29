# Chatting Room

## Description

Chatting Room is a Live Chat App powered by `Stream API`. You can create your own channels, invite members and create DMs.
Authentification for user login/sign up is handled on backend using `Node.js`.

## Auth page

Forlumar on auth page handles `empty inputs`, checks whether the `passwords are matching` together while creating a new user and won't let the user create
the username that already exists in the stream database. Log in Formular could throw messages like `user not found` or `incorrect password`.

## App

After user is logged in they can experience fully responsive and live chatting app. Basic JSON data structure from the server are stored into cookies (such as authToken, and info provider in formular) after user logs in/signs in/logs out. Using mostly `Context API` allowed me to controle and access the state smoothly.


## Actions

User is able to `edit` channel name, `create` a new channel or `create` a direct message. For all of these mentioned actions there must be invited at least `one member from the user list.` Additionaly the `search bar` handles all input requests while sending an asynchronous API request via `promise all` to get all users and channels at once.

`It is required to fill in both .env files from client and server side folders by your own keys which can be found on https://getstream.io/`

`Note, that URL constant in config.ts file within the client folder is set to http://localhost:5000/auth , this can be changed depending where your server is hosted on`

## Available scripts

> In the project directory, you can run:

### `npm run`

- Runs the app in the development mode.\

### `npm test`

- Launches the test runner in the interactive watch mode.\

### `npm build`

- Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm eject`

- This command will remove the single build dependency from your project.
