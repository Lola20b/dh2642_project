
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'
import { getDatabase, ref, get, set, update } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'


//const { getDatabase, ref, get, set, onValue}= require( "/src/teacherFirebase.js");

import firebaseConfig from "/src/firebaseConfig.js";

import { getSongDetails, getArtistDetails, getAlbumDetails, getAlbumDetailsFirebase, getArtistDetailsFirebase, getSongDetailsFirebase } from './geniusAPI';


// Initialise firebase
const app= initializeApp(firebaseConfig);
const db= getDatabase(app);
const auth = getAuth();

function observerRecap(model) {
    function printPayloadACB(payload){
        // console.log(payload);
    }
    model.addObserver(printPayloadACB);
}


function connectModelToFirebase(model) {
    //addObserver --> if model.ready set(REF)
    // onAuthStateChanged --> ACB(user)
    
    model.addObserver(obsACB)

    //onAuthStateChanged(auth,userACB(model.user))

    onAuthStateChanged(auth, userACB)

    function obsACB() {
        if(model.ready && model.user) {
            set(ref(db, 'users/' + model.user.uid), modelToPersistence(model));
            //update(ref(db), modelToPersistenceLikes(model));
        }
    }

    function userACB(user) {
        if(user) {
            model.user = user;
            firebaseModelPromise(model)
        }
        else {
            model.user=null
        }
    }

    
}


function firebaseModelPromise(model) {
    //model.ready=false, retrieve data from firbase using get(REF) --> persistenceToModel --> model.ready=true

    model.ready=false;

    return get(ref(db, 'users/' + model.user.uid)).then(persistenceToModelACB).then(setmodelTrueACB);

    function setmodelTrueACB() {
        model.ready=true;
        return model;
    }

    function persistenceToModelACB(dataFromFirebase) {

        if(!dataFromFirebase.val()) {
            return;
        }
        return persistenceToModel(dataFromFirebase.val(),model);
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

function modelToPersistenceLikes(model) {
    const persistedData = {likedArtists: [], likedAlbums: [], likedSongs: []};

    // save liked artists
    if(model.likedArtists) {
        persistedData.likedArtists = model.likedArtists.map(getArtistIDCB).sort();
    } else {
        persistedData.savedArtists = [];
    }

    // save liked albums
    if(model.likedAlbums) {
        persistedData.likedAlbums = model.likedAlbums.map(getAlbumIDCB).sort();
    } else {
        persistedData.likedAlbums = [];
    }

            
    // save liked songs
    if(model.likedSongs) {
        persistedData.likedSongs = model.likedSongs.map(getSongIDCB).sort();
    } else {
        persistedData.likedSongs = [];
    }

    return persistedData;

    function getSongIDCB(song) {
        if(!song) {
            return null;
        }
        return song;
    }        
    
    function getAlbumIDCB(album) {
        if(!album) {
            return null;
        }
        return album;
    } 

    function getArtistIDCB(artist) {
        if(!artist) {
            return null;
        }
        return artist;
    } 

}


function persistenceToModel(persistedData={}, model) {
    if (!persistedData) {
        persistedData = {};
    }

    // artists
    if(persistedData.savedArtists) {
        let artists = persistedData.savedArtists.map(getArtistDetailsFirebase);
        artists.map(setModelArtistsCB)
    }

    function setModelArtistsCB(artist) {
        artist.then((value) => model.savedArtists.push(value.artist))
        return model;
    }

    // Songs
    if(persistedData.savedSongs) {
        let songs = persistedData.savedSongs.map(getSongDetailsFirebase);
        songs.map(setModelSongsCB)
    }

    function setModelSongsCB(song) {
        song.then((value) => model.savedSongs.push(value.song))
        return model;
    }

    // albums
    if(persistedData.savedAlbums) {
        let albumbs = persistedData.savedAlbums.map(getAlbumDetailsFirebase);
        albumbs.map(setModelAlbumsCB)
    }

    function setModelAlbumsCB(album) {
        album.then((value) => model.savedAlbums.push(value.album))
        return model;
    }

    // Liked artists, songs and albums
    // if(persistedData.likedArtists) {
    //     model.likedAlbums = persistedData.likedArtists
    // }
    // if(persistedData.savedArtists) {
    //     model.likedArtists = persistedData.likedArtists
    // }
    // if(persistedData.likedSongs) {
    //     model.likedSongs = persistedData.likedSongs
    // }
}


export {observerRecap, firebaseModelPromise, modelToPersistence, modelToPersistenceLikes, persistenceToModel, connectModelToFirebase, auth};
