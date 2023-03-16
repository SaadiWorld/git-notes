# Git Notes
A CRUD app that used the Github REST API to list, create, update and delete the public gists on GitHub.

## Features

- View Public Gists
- Switch between List and Grid View
- Pagination
- Github OAuth Implementation (Login)
- Search a gist by id
 ##### After login:
- Create and Edit your own gists
- Fork and Star/Unstar other public gists
- View Starred Gists
- View Profile
- Logout

## Description

This project contains two directories:
- `backend` - Proxy Server 
It is a simple express app to help us by-pass CORS error which was faced during login with github (`POST https://github.com/login/oauth/access_token`) on [Point # 2 on this page](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).

- `frontend` - React App
    Used [`tailwindcss`](https://tailwindcss.com/) and [`daisyui`](https://daisyui.com/) for styling.
Used [`react-gist`](https://www.npmjs.com/package/react-gist) for viewing gist content.
Used [`react-table`](https://react-table-v7.tanstack.com/) as a headless UI library for the tables.
Used [`react-paginate`](https://www.npmjs.com/package/react-paginate) for pagination for our tables.

## Installation & Setup
`for Dev Environment Only`

After cloning this project, we will use `yarn` as the package manager to install our packages.

Install the dependencies and devDependencies and start the application.

#### Backend:
```sh
cd backend
yarn install
```
Put `.env` file with these values in the directory
```
REACT_APP_CLIENT_ID=YOUR_CLIENT_ID
REACT_APP_CLIENT_SECRET=YOUR_CLIENT_SECRET
REACT_APP_REDIRECT_URI=http://localhost:3000/login
SERVER_PORT=9000
```
Start the project!
```
yarn start
```

#### Frontend:
```sh
cd frontend
yarn install
```
Put `.env` file with these values in the directory
```
REACT_APP_CLIENT_ID=YOUR_CLIENT_ID
REACT_APP_CLIENT_SECRET=YOUR_CLIENT_SECRET
REACT_APP_REDIRECT_URI=http://localhost:3000/login
REACT_APP_PROXY_SERVER=http://localhost:9000/
```
Start the project!
```
yarn start
```

The setup is complete, app is running and you are good to go!

## Resources

- [https://docs.github.com/en/rest/gists/gists](https://docs.github.com/en/rest/gists/gists)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [https://levelup.gitconnected.com/how-to-implement-login-with-github-in-a-react-app-bd3d704c64fc](https://levelup.gitconnected.com/how-to-implement-login-with-github-in-a-react-app-bd3d704c64fc)
