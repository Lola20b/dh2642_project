# dh2642_project

## Welcome to MUSICEJA

MUSICEJA is an app that allows the users to search for and find interesting information about their favorite songs, artists and albums. Furthermore, you can save your favorite content in your profile and show other's your opinions about music by liking content.

## Features

- Personal profile for users
- User can search for songs, albums and artists from the GENIUS API can see lyrics and interesting information about their favorite content
- User can save content in their profile
- User can "like" content and see how many others have liked a song, artist or album
- 3rd party component notification system that renders notification when a song is saved and on failed logins

## Technologies

- Vue
- Vite
- vue-toastification (3rd party component)

## User feedback
For this project we conducted two user consultations and one mid project review as part of the course. The received feedback and implemented changes can be found documented in userfeedback.txt.

## Project file structure (short description/purpose of each file)

| /.firebase            | Used to deploy in firebase                                                                                                                                                 |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /.vscode              | Used for vscode                                                                                                                                                            |
| /public               | This folder is used to store static assets that are not processed by Webpack/Vite (eg. logos, fonts, etc)                                                                  |
| /dist                 | default build output location                                                                                                                                              |
| /src/assets           | This folder is used to store assets that are processed by Webpack/vite (eg. CSS stylesheets, JavaScript modules, and images that are imported into your React components)  |
| /src/components/*     | Includes reusable components from the scaffolding                                                                                          |
| /src/presenters/*     | Includes the presenters of the application, ie connects the model with the views                                                                                           |
| /src/VueRoot.jsx | Router config and base starting point for project                                                                                                                                                        |
| /src/views/*          | Includes the views of the application                                                                                                                                      |                                                                                                                                   |



## Project Setup

```sh
npm install
```

### Add config files

To get the project working you have to add your API and firebase config to src/apiConfig.js and src/firebaseConfig.js respectively.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
