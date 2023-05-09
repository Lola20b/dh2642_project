import {searchMusic, getSongDetails, getLyricsDetails, getAlbumDetails, getArtistDetails} from "./geniusAPI.js";
import resolvePromise from "./resolvePromise";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'


// Model to keep abstract data

class Model{
    constructor(){
        // model properties
        this.searchInput={};
        this.searchInput.q = "";
        this.searchInput.per_page = 5;
        this.searchInput.page = 1;
        this.searchResultsPromiseState = {};
        this.songPromiseState = {};
        this.lyricsPromiseState = {};
        this.albumPromiseState = {};
        this.artistPromiseState = {};
        this.searchInputType = "All";
        
        // saved items
        this.savedSongs = [];
        this.savedAlbums = [];
        this.savedArtists = [];

        // observers
        this.observerArray = [];

        // authentication
        this.ready = true;
        this.user = null;
    }    

    // Set the search input
    setSearchQuery(searchText) {
        this.searchInput.q = searchText;
    }

    // Set the search type
    setSearchType(searchType) {
        this.searchInputType = searchType;
    }

    // Do the search
    doSearch(searchParams) {
        resolvePromise(searchMusic(searchParams), this.searchResultsPromiseState);
    }

    fetchSong(songParams) {
        resolvePromise(getSongDetails(songParams), this.songPromiseState);
    }
 
    fetchLyrics(lyricsParams) {
        resolvePromise(getLyricsDetails(lyricsParams), this.lyricsPromiseState);
    }

    fetchAlbum(albumParams) {
        resolvePromise(getAlbumDetails(albumParams), this.albumPromiseState)
    }

    fetchArtist(artistParams) {
        resolvePromise(getArtistDetails(artistParams), this.artistPromiseState)
    }

    saveSong(song) {
        function sameSongIdCB(currSong) {
            return currSong.id === song.id;
        }

        // Adds song att end of savedArtists if not already present
        if (!this.savedSongs.some(sameSongIdCB)) {
            this.savedSongs= [...this.savedSongs, song];
            this.notifyObservers({addedSong: song})
        }
    }

    saveAlbum(album) {
        function sameAlbumIdCB(currAlbum) {
            return currAlbum.id === album.id;
        }

        // Adds album att end of savedArtists if not already present
        if (!this.savedAlbums.some(sameAlbumIdCB)) {
            this.savedAlbums= [...this.savedAlbums, album];
            this.notifyObservers({addedAlbum: album})
        }
    }

    saveArtist(artist) {
        function sameArtistIdCB(currArtist) {
            return currArtist.id === artist.id;
        }

        // Adds artist att end of savedArtists if not already present
        if (!this.savedArtists.some(sameArtistIdCB)) {
            this.savedArtists= [...this.savedArtists, artist];
            console.log("Save artist");
            console.log(this.savedArtists);
            this.notifyObservers({addedArtist: artist})

        }
    }

    removeSong(song) {
        function diffSongIdCB(currSong) {
            return currSong.id !== song.id;
        }

        this.savedSongs = this.savedSongs.filter(diffSongIdCB);
        this.notifyObservers({removedSong: song})
    }

    removeAlbum(album) {
        function diffAlbumIdCB(currAlbum) {
            return currAlbum.id !== album.id;
        }

        this.savedAlbums = this.savedAlbums.filter(diffAlbumIdCB);
        this.notifyObservers({removedAlbum: album})
    }

    removeArtist(artist) {
        function diffArtistIdCB(currArtist) {
            return currArtist.id !== artist.id;
        }

        this.savedArtists = this.savedArtists.filter(diffArtistIdCB);
        this.notifyObservers({removedArtist: artist})
    }

    signOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });          
    }

    addObserver(myObserverACB) {
        this.observerArray=[...this.observerArray, myObserverACB];
    }
    
    removeObserver(myObserverACB) {
        this.observerArray=this.observerArray.filter(removeObserverCB)

        function removeObserverCB(elem){
            return elem!==myObserverACB;
        }
    }

    notifyObservers(payload) {
        
        function invokeObserverCB(obs){
            try{obs(payload);}catch(err){console.error(err);} 
        }

        console.log(this.observerArray)
        this.observerArray.forEach(invokeObserverCB) 
    }
}

export default Model;