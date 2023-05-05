import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import {onMounted, onUnmounted, reactive} from "vue";
import { getDatabase, ref, get, set, update, push } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js'
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'


export default 
{
    name: "Info",
    props: ["model", "type", "id"],
    setup(props) {

        // Initialise firebase
        const app= initializeApp(firebaseConfig);
        const db= getDatabase(app);

        let songLikesCounter = reactive({likes: 0})
        let albumLikesCounter = reactive({likes: 0})
        let artistLikesCounter = reactive({likes: 0})


        async function lifeACB(){
            if (props.type === "artist") {
                if(!props.model.artistPromiseState.promise) {
                    props.model.fetchArtist({id: props.id});
                    get(ref(db, `likedArtists/${props.id}/likes`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            artistLikesCounter.likes = Object.values(snapshot.val()).length
                        } else {
                            artistLikesCounter.likes = 0;
                            console.log("no data")
                        }
                    })
                }
                
            } else if (props.type === "album") {
                if(!props.model.albumPromiseState.promise) {
                    props.model.fetchAlbum({id: props.id});
                    get(ref(db, `likedAlbums/${props.id}/likes`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            albumLikesCounter.likes = Object.values(snapshot.val()).length
                        } else {
                            albumLikesCounter.likes = 0;
                            console.log("no data")
                        }
                    })
                };
                
            } else if (props.type === "song") {
                if(!props.model.songPromiseState.promise) {
                    props.model.fetchSong({id: props.id});
                    props.model.fetchLyrics({id: props.id, text_format: 'plain'});
                    get(ref(db, `likedSongs/${props.id}/likes`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            songLikesCounter.likes = Object.values(snapshot.val()).length
                        } else {
                            songLikesCounter.likes = 0
                            console.log("no data")
                        }
                    })
                }
            };

        }
        function ripACB(){console.log("perform cleanup");} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            
            if (props.type === "artist") {
                return ( <div>
                    
                    {promiseNoData(props.model.artistPromiseState) || 
                    <InfoView 
                        type="artist" 
                        artistData = {props.model.artistPromiseState.data} 
                        saveArtist={addArtistToProfileACB} 
                        likeArtist={likeArtistACB}
                        artistLikesCounter = {artistLikesCounter.likes}
                    />
                    }
                
                    </div>);
            } else if (props.type === "album") {
                return ( <div>
                              
                    {promiseNoData(props.model.albumPromiseState) || 
                    <InfoView 
                        type="album" 
                        albumData = {props.model.albumPromiseState.data} 
                        saveAlbum={addAlbumToProfileACB} 
                        likeAlbum={likeAlbumACB}
                        albumLikesCounter = {albumLikesCounter.likes}
                    />}

                    </div>);
            }  else if (props.type === "song") {
                return ( <div>
                
                    {promiseNoData(props.model.songPromiseState) || promiseNoData(props.model.lyricsPromiseState) || 
                    <InfoView 
                        type="song" 
                        songData = {props.model.songPromiseState.data} 
                        lyricsData= {props.model.lyricsPromiseState.data} 
                        saveSong={addSongToProfileACB} 
                        likeSong={likeSongACB}
                        songLikesCounter = {songLikesCounter.likes}
    
                    />}
                
                    </div>);
            }

            

            function addSongToProfileACB(song) {
                props.model.saveSong(song);
            }
            function addAlbumToProfileACB(album) {
                props.model.saveAlbum(album);
            }
            function addArtistToProfileACB(artist) {
                props.model.saveArtist(artist);
            }



            async function likeSongACB(song) {

                await get(ref(db, 'likedSongs')).then(function(snapshot) {
                    //increment like if user has not aldready like
                    if (snapshot.child(song.id.toString()).exists()) {


                        get(ref(db,'likedSongs/' +song.id+'/likes')).then(function(snapshot2) {
                            let likeList = Object.values(snapshot2.val())
                            if(likeList.includes(props.model.user.uid)) {
                                console.log("user already liked")
                            } else {
                                push(ref(db, 'likedSongs/' + song.id + '/likes'), props.model.user.uid)
                            }
                        })

                    } else {
                        update(ref(db, 'likedSongs/' + song.id), {likes: []})
                        push(ref(db, 'likedSongs/' + song.id + '/likes'), props.model.user.uid)

                    }
                })
                
                // update like
                get(ref(db, `likedSongs/${props.model.songPromiseState.data.song.id}/likes`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        songLikesCounter.likes = Object.values(snapshot.val()).length
                    } else {
                        console.log("no data")
                    }
                })
                
            }

            async function likeAlbumACB(album) {

                await get(ref(db, 'likedAlbums')).then(function(snapshot) {
                    //increment like if user has not aldready like
                    if (snapshot.child(album.id.toString()).exists()) {

                        get(ref(db,'likedAlbums/' +album.id+'/likes')).then(function(snapshot2) {
                            let likeList = Object.values(snapshot2.val())
                            if(likeList.includes(props.model.user.uid)) {
                                console.log("user already liked")
                            } else {
                                push(ref(db, 'likedSongs/' + song.id + '/likes'), props.model.user.uid)
                            }
                        })

                    } else {
                        update(ref(db, 'likedAlbums/' + album.id), {likes: []})
                        push(ref(db, 'likedAlbums/' + album.id + '/likes'), props.model.user.uid)

                    }
                })

                // update like
                get(ref(db, `likedAlbums/${props.model.albumPromiseState.data.album.id}/likes`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        albumLikesCounter.likes = Object.values(snapshot.val()).length
                    } else {
                        console.log("no data")
                    }
                })
                
            }


            async function likeArtistACB(artist) {

                await get(ref(db, 'likedArtists')).then(function(snapshot) {
                    //increment like if user has not aldready like
                    if (snapshot.child(artist.id.toString()).exists()) {

                        get(ref(db,'likedArtists/' +artist.id+'/likes')).then(function(snapshot2) {
                            let likeList = Object.values(snapshot2.val())
                            if(likeList.includes(props.model.user.uid)) {
                                console.log("user already liked")
                            } else {
                                push(ref(db, 'likedSongs/' + song.id + '/likes'), props.model.user.uid)
                            }
                        })
                    } else {
                        update(ref(db, 'likedArtists/' + artist.id), {likes: []})
                        push(ref(db, 'likedArtists/' + artist.id + '/likes'), props.model.user.uid)

                    }
                })

                // update like
                get(ref(db, `likedArtists/${props.model.artistPromiseState.data.artist.id}/likes`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        artistLikesCounter.likes = Object.values(snapshot.val()).length
                    } else {
                        console.log("no data")
                    }
                })
                
            }

            
        };
    },
}