const { initializeApp, getDatabase, ref, get, set, onValue }= require( "firebase/app");
//const { getDatabase, ref, get, set, onValue}= require( "/src/teacherFirebase.js");

import firebaseConfig from "/src/firebaseConfig.js";


// Initialise firebase
const app= initializeApp(firebaseConfig);
const db= getDatabase(app);
const rf = ref(db,"object")


function firebaseModelPromise(model) {
    return;
}

function modelToPersistence(model) {
    return;
}

function persistenceToModel(persistedData={}, model) {
    return;
}


export {observerRecap, firebaseModelPromise, modelToPersistence, persistenceToModel};
