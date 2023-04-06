# dh2642_project

## Short description of your project

Our app will allow the user to search for songs, albums and artists and find interesting information about them. Furthermore the user will be able to “like” specific songs,albums or artists and add them to a list specific to that user. 

## What we have done so far
So far, we have done a homepage where the user can search for songs, albums and artists and get the three top results from the genius API. We have also done a sidebar where the user can navigate between the homepage and the profile. In the profile view, we have hardcoded an example of what the profile could look like. In the profile, the user can see songs, artists and albums that the user has saved. 

## What we still plan to do
- A detailed view for songs,albums and artists that shows interesting information
- A login system allowing for different users
- A rating system allowing the user to rate songs/albums/artists
- Make it possible for users to only search for songs, artists or album, alternatively search for everything 
- Add a “save in profile” button so users can save songs, artists and albums in the profile (or this might be done automatically if a user “likes” something)
- possibly embedded youtube video for songs
- Make the app look good

## Project file structure (short description/purpose of each file)

| File/Folder            | Description                                                                                                                                                 |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /.firebase             | Used to deploy in firebase                                                                                                                                                            |
| /.vscode              | Used for vscode                                                                                                                                                            |
| /public               | This folder is used to store static assets that are not processed by Webpack/Vite (eg. logos, fonts, etc)                                                                  |
| /dist                 | default build output location                                                                                                                                              |
| /src/assets           | This folder is used to store assets that are processed by Webpack/vite (eg. CSS stylesheets, JavaScript modules, and images that are imported into your React components)  |
| /src/components/*     | Includes reusable components from the scaffolding that aren’t currently being used                                                                                         |
| /src/presenters/*     | Includes the presenters of the application, ie connects the model with the views                                                                                           |
| /src/router/index.jsx | Router config file                                                                                                                                                         |
| /src/views/*          | Includes the views of the application                                                                                                                                      |                                                                                                                                    |

### Specific files
profileView/presenter: A page where the user can see saved songs,albums and artists. The user should also be able to like/un-like from this page and navigate to the detailed view containing additional information for a song/album/artist.

searchFormView: Contains the search form

searchResultView: Renders the search results (a list of songs/albums/artists)

SearchPresenter: Provide the searchFormView and searchResultView with the search data.

sidebarView/-Presenter: Contains the sidebar with username and profile picture and links to the homepage and profile page

infoView/-Presenter: A page that will contain information about a certain song, album or artist

model.js: Model for the application. Contains abstract data for the application, such as search queries and promise state.

main.js: Initial entrypoint to application 

geniusAPI.js: Contains functions for retrieving data from the API (we’re using Genius API).

VueRoot.jsx: Initial App scaffold. Includes basic logic for routing to the appropriate presenter and displaying the sidebar


# This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
