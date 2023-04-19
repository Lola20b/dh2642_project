
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'
import { getDatabase, ref, get, set } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js'

//const { getDatabase, ref, get, set, onValue}= require( "/src/teacherFirebase.js");

import firebaseConfig from "/src/firebaseConfig.js";


// Initialise firebase
const app= initializeApp(firebaseConfig);
const db= getDatabase(app);
const rf = ref(db,"object")


function connectModelToFirebase(model) {
    //addObserver --> if model.ready set(REF)
    return;
}


function firebaseModelPromise(model) {
    //change to: model.ready=false, get(REF) --> persistenceToModel --> model.ready=true

    // 1) retrieves data from firebase using firebase get()
    // 2) saves the data into the model (received as parameter)
    // 3) adds a model observer that calls firebase set() and modelToPersistence()
    return get(rf).then(persistenceToModelACB).then(addObserverACB);

    function persistenceToModelACB(dataFromFirebase) {
        if(!dataFromFirebase.val()) {
            return;
        }
        return persistenceToModel(dataFromFirebase.val(),model);
    }

    function addObserverACB() {
        model.addObserver(obsACB)
        console.log("model", model)
        return model
    }

    function obsACB() {
        set(rf, modelToPersistence(model));
    }
}

function modelToPersistence(model) {
    //Converts saved artists, albums and songs to IDs sorted
    
    const persistedData = {savedArtists: [], savedSongs: [], savedAlbums: []};

    // save artists
    if(model.savedArtists) {
        persistedData.savedArtists = model.savedArtists.map(getIDCB).sort();
    } else {
        persistedData.savedArtists = [];
    }

    // save songs
    if(model.savedSongs) {
        persistedData.savedSongs = model.savedSongs.map(getIDCB).sort();
    } else {
        persistedData.savedSongs = [];
    }

    // save albums
    if(model.savedAlbums) {
        persistedData.savedAlbums = model.savedAlbums.map(getIDCB).sort();
    } else {
        persistedData.savedAlbums = [];
    }

    return persistedData;

    function getIDCB(obj) {
        if(!obj) {
            return null;
        }
        return obj.id;
    }           
}

function persistenceToModel(persistedData={}, model) {
    if (!persistedData) {
        persistedData = {};
    }

    // artists
    if(!persistedData.savedArtists) {
        persistedData.savedArtists = [];
    }
    getArtistDetails(persistedData.savedArtists).then(setModelArtistsCB);

    function setModelArtistsCB(artists) {
        model.savedArtists = artists.sort() 
        return model;
    }

    // Songs
    if(!persistedData.savedSongs) {
        persistedData.savedSongs = [];
    }
    getSongDetails(persistedData.savedSongs).then(setModelSongsCB);

    function setModelSongsCB(songs) {
        model.savedSongs = songs.sort() 
        return model;
    }

    // albums
    if(!persistedData.savedAlbums) {
        persistedData.savedAlbums = [];
    }
    return getAlbumDetails(persistedData.savedAlbums).then(setModelAlbumsCB);

    function setModelAlbumsCB(albums) {
        model.savedAlbums = albums.sort() 
        return model;
    }
}


export {firebaseModelPromise, modelToPersistence, persistenceToModel, connectModelToFirebase};
