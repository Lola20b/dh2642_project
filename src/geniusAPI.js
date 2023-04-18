import {BASE_URL, API_KEY} from "/src/apiConfig.js";

// function below is taken from lecture slides
function treatHTTPResponseACB(response){ 
    if(!response.ok) throw new Error("API problem "+response.status);  
            // or response.status!==200 
    return response.json(); 
}

function searchMusic(object) {
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY
        },
    };

    function transformResultACB(response){
        return response;
    }
       
    return fetch(BASE_URL + '/search/multi/?' + new URLSearchParams(
        object
    ) + '&page=1', options).then(treatHTTPResponseACB).then(transformResultACB);
}

function getSongDetails(object) {
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
        }
    };

    return fetch(BASE_URL + '/song/details/?'+ new URLSearchParams(object), options).then(treatHTTPResponseACB);
}

function getLyricsDetails(object) {
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
        }
    };

    return fetch(BASE_URL + '/song/lyrics/?'+ new URLSearchParams(object), options).then(treatHTTPResponseACB);
}

export {searchMusic, getSongDetails, getLyricsDetails}

