import {searchMusic, getSongDetails, getLyricsDetails, getAlbumDetails, getArtistDetails} from "./geniusAPI.js";
import resolvePromise from "./resolvePromise";

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
        
        this.savedSongs = [];
        this.savedAlbums = [];
        this.savedArtists = [];

        this.observerArray = [];
    }

    // Set the search input
    setSearchQuery(searchText) {
        this.searchInput.q = searchText;
    }

    // Set the search type
    setSearchType(searchType) {
        //this.searchInput.type = searchType;
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

        // Adds artistID att end of savedArtists if not already present
        if (!this.savedSongs.some(sameSongIdCB)) {
            this.savedSongs= [...this.savedSongs, song];
            this.notifyObservers({addedSong: song})
        }
    }

    saveAlbum(album) {
        function sameAlbumIdCB(currAlbum) {
            return currAlbum.id === album.id;
        }

        // Adds artistID att end of savedArtists if not already present
        if (!this.savedAlbums.some(sameAlbumIdCB)) {
            this.savedAlbums= [...this.savedAlbums, album];
            this.notifyObservers({addedAlbum: album})
        }
    }

    saveArtist(artist) {
        function sameArtistIdCB(currArtist) {
            return currArtist.id === artist.id;
        }

        // Adds artistID att end of savedArtists if not already present
        if (!this.savedArtists.some(sameArtistIdCB)) {
            this.savedArtists= [...this.savedArtists, artist];
            console.log("Save artist");
            console.log(this.savedArtists);
            this.notifyObservers({addedArtist: artist})

        }
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
            console.log("test1")
            try{obs(payload);}catch(err){console.error(err);} 
        }

        console.log(this.observerArray)
        this.observerArray.forEach(invokeObserverCB) 
        console.log("test2")
    }
}

export default Model;