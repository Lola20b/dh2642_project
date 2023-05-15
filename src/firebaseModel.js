
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'
import { getDatabase, ref, get, set, update } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'


//const { getDatabase, ref, get, set, onValue}= require( "/src/teacherFirebase.js");

import firebaseConfig from "/src/firebaseConfig.js";

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
        if(obj.title){
            return {id: obj.id, name: obj.title};
        }else{
            return {id: obj.id, name: obj.name};
        }
    }           
}




function persistenceToModel(persistedData={}, model) {
    if (!persistedData) {
        persistedData = {};
    }

    // artists
    if(persistedData.savedArtists) {
        let artists = persistedData.savedArtists;
        artists.map((value) => model.savedArtists.push(value))
    }

    // Songs
    if(persistedData.savedSongs) {
        let songs = persistedData.savedSongs;
        songs.map((value) => model.savedSongs.push(value));
    }

    // albums
    if(persistedData.savedAlbums) {
        let albums = persistedData.savedAlbums;
        albums.map((value) => model.savedAlbums.push(value))
    }

}


export {observerRecap, firebaseModelPromise, modelToPersistence, persistenceToModel, connectModelToFirebase, auth};
