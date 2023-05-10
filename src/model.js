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

        // likes
        // this.likedSongs = [];
        // this.likedAlbums = [];
        // this.likedArtists = [];
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

    // saveSong(song) {
    //     function sameSongIdCB(currSong) {
    //         return currSong.id === song.id;
    //     }

    //     // Adds song att end of savedArtists if not already present
    //     if (!this.savedSongs.some(sameSongIdCB)) {
    //         this.savedSongs= [...this.savedSongs, song];
    //         this.notifyObservers({addedSong: song})
    //     }
    // }

    // saveAlbum(album) {
    //     function sameAlbumIdCB(currAlbum) {
    //         return currAlbum.id === album.id;
    //     }

    //     // Adds album att end of savedArtists if not already present
    //     if (!this.savedAlbums.some(sameAlbumIdCB)) {
    //         this.savedAlbums= [...this.savedAlbums, album];
    //         this.notifyObservers({addedAlbum: album})
    //     }
    // }

    // saveArtist(artist) {
    //     function sameArtistIdCB(currArtist) {
    //         return currArtist.id === artist.id;
    //     }

    //     // Adds artist att end of savedArtists if not already present
    //     if (!this.savedArtists.some(sameArtistIdCB)) {
    //         this.savedArtists= [...this.savedArtists, artist];
    //         console.log("Save artist");
    //         console.log(this.savedArtists);
    //         this.notifyObservers({addedArtist: artist})

    //     }
    // }

    // likeSong(song) {
    //     function sameSongIdCB(currSong) {
    //         return currSong.songID === song.id;
    //     }

    //     // If song not in likedsongs, add to list and add like
    //     if (!this.likedSongs.some(sameSongIdCB)) { 
    //         let songObj = {songID: song.id, likecounter: 1}
    //         this.likedSongs= [...this.likedSongs, songObj];

    //         this.notifyObservers({likedSong: songObj})
    //     } else { 
    //         // If already in list, increase like counter
    //         let objIndex = this.likedSongs.findIndex((obj => obj.songID == song.id))
    //         this.likedSongs[objIndex].likecounter = this.likedSongs[objIndex].likecounter + 1; 

    //     }
    // }

    
    // likeAlbum(album) {
    //     function sameAlbumIdCB(currAlbum) {
    //         return currAlbum.albumID === album.id;
    //     }

    //     // If album not in likedsongs, add to list and add like
    //     if (!this.likedAlbums.some(sameAlbumIdCB)) { 
    //         let albumObj = {albumID: album.id, likecounter: 1}
    //         this.likeAlbums= [...this.likedAlbums, albumObj];

    //         this.notifyObservers({likedAlbum: albumObj})
    //     } else { 
    //         // If already in list, increase like counter
    //         let objIndex = this.likedAlbums.findIndex((obj => obj.albumID == album.id))
    //         this.likedAlbums[objIndex].likecounter = this.likedAlbums[objIndex].likecounter + 1; 

    //     }
    // }

    
    // likeArtist(artist) {
    //     function sameArtistIdCB(currArtist) {
    //         return currArtist.artistID === artist.id;
    //     }

    //     // If artist not in likedsongs, add to list and add like
    //     if (!this.likedArtists.some(sameArtistIdCB)) { 
    //         let artistObj = {artistID: artist.id, likecounter: 1}
    //         this.likedArtists= [...this.likedArtists, artistObj];

    //         this.notifyObservers({likedArtist: artistObj})
    //     } else { 
    //         // If already in list, increase like counter
    //         let objIndex = this.likedArtists.findIndex((obj => obj.artistID == artist.id))
    //         this.likedArtists[objIndex].likecounter = this.likedArtists[objIndex].likecounter + 1; 

    //     }
    // }

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