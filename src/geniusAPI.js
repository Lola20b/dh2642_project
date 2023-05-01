import {BASE_URL, API_KEY} from "/src/apiConfig.js";

// function below is taken from lecture slides
function treatHTTPResponseACB(response){ 
    if(!response.ok) throw new Error("API problem "+response.status);  
            // or response.status!==200 
    return response.json(); 
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY
    },
};

function searchMusic(object) {
    function transformResultACB(response){
        return response;
    }
       
    return fetch(BASE_URL + '/search/multi/?' + new URLSearchParams(
        object
    ), options).then(treatHTTPResponseACB).then(transformResultACB);
}

function getSongDetails(object) {
    return fetch(BASE_URL + '/song/details/?'+ new URLSearchParams(object), options).then(treatHTTPResponseACB);
}

function getLyricsDetails(object) {
    return fetch(BASE_URL + '/song/lyrics/?'+ new URLSearchParams(object), options).then(treatHTTPResponseACB);
}

function getAlbumDetails(object) {
    return fetch(BASE_URL + '/album/details/?'+ new URLSearchParams(object), options).then(treatHTTPResponseACB);
}

function getArtistDetails(object) {
    console.log(object)
    return fetch(BASE_URL + '/artist/details/?'+ new URLSearchParams(object), options).then(treatHTTPResponseACB);
}


// TODO: gör så att vi kan använda de tre som finns ovan ist
function getArtistDetailsFirebase(object) {
    console.log(object)
    return fetch(BASE_URL + '/artist/details/?id='+ object.join(), options).then(treatHTTPResponseACB);
}

function getAlbumDetailsFirebase(object) {
    console.log(object)
    return fetch(BASE_URL + '/album/details/?id='+ object.join(), options).then(treatHTTPResponseACB);
}

function getSongDetailsFirebase(object) {
    console.log(object)
    return fetch(BASE_URL + '/song/details/?id='+ object.join(), options).then(treatHTTPResponseACB);
}



export {searchMusic, getSongDetails, getLyricsDetails, getAlbumDetails, getArtistDetails, getAlbumDetailsFirebase, getArtistDetailsFirebase, getSongDetailsFirebase}

