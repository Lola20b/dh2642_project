import InfoView from "../views/infoView";
import promiseNoData from "../views/promiseNoData.jsx";
import { useToast } from "vue-toastification";
import savedItemComponent from "../components/savedItemComponent.vue";
import {onMounted, onUnmounted, reactive} from "vue";
import { getDatabase, ref, get, set, update, push } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js'
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'
import {router} from "/src/VueRoot.jsx";

const toast = useToast();

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

        let alreadyLikedArtist = reactive({liked: false})
        let alreadyLikedSong = reactive({liked: false})
        let alreadyLikedAlbum = reactive({liked: false})

        async function lifeACB(){
            if (props.type === "artist") {
                if(!props.model.artistPromiseState.promise) {
                    props.model.fetchArtist({id: props.id});
                    get(ref(db, `likedArtists/${props.id}/likes`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            artistLikesCounter.likes = Object.values(snapshot.val()).length
                            if (Object.values(snapshot.val()).includes(props.model.user.uid)) {
                                alreadyLikedArtist.liked = true;
                            } else {
                                alreadyLikedArtist.liked = false;
                            }
                        } else {
                            artistLikesCounter.likes = 0;
                        }
                    })
                }
                
            } else if (props.type === "album") {
                if(!props.model.albumPromiseState.promise) {
                    props.model.fetchAlbum({id: props.id});
                    get(ref(db, `likedAlbums/${props.id}/likes`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            albumLikesCounter.likes = Object.values(snapshot.val()).length
                            if (Object.values(snapshot.val()).includes(props.model.user.uid)) {
                                alreadyLikedAlbum.liked = true;
                            } else {
                                alreadyLikedAlbum.liked = false;
                            }
                        } else {
                            albumLikesCounter.likes = 0;
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
                            if (Object.values(snapshot.val()).includes(props.model.user.uid)) {
                                alreadyLikedSong.liked = true;
                            } else {
                                alreadyLikedSong.liked = false;
                            }
                        } else {
                            songLikesCounter.likes = 0;
                        }
                    })
                }
            };

        }
        function ripACB(){} 

        onMounted(lifeACB);
        onUnmounted(ripACB);

        return function renderACB() {
            function generateToast(itemName){
                const notif = {
                    // Your component or JSX template
                    component: savedItemComponent,
                
                    // Props are just regular props, but these won't be reactive
                    props: {
                        itemName: itemName,
                    },
                
                    // Listeners will listen to and execute on event emission
                    listeners: {
                        // go to profile
                        click: () => {
                            router.push('/Profile');
                            toast.clear();
                        }
                    },
                };
                toast.success(notif);
            };

            if (props.type === "artist") {
                return ( <div>
                    
                    {promiseNoData(props.model.artistPromiseState) || 

                    <InfoView 
                        type="artist" 
                        artistData = {props.model.artistPromiseState.data} 
                        saveArtist={addArtistToProfileACB} 
                        likeArtist={likeArtistACB}
                        isArtistSaved={props.model.savedArtists.find(matchACB)}
                        artistLikesCounter = {artistLikesCounter.likes}
                        alreadyLikedArtist = {alreadyLikedArtist.liked}
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
                        isAlbumSaved={props.model.savedAlbums.find(matchACB)}
                        albumLikesCounter = {albumLikesCounter.likes}
                        alreadyLikedAlbum = {alreadyLikedAlbum.liked}
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
                        isSongSaved={props.model.savedSongs.find(matchACB)}
                        alreadyLikedSong = {alreadyLikedSong.liked}
                    />}
                
                    </div>);
            }

            function matchACB(elem) {
                return elem.id == props.id;
            }

            function addSongToProfileACB(song) {
                props.model.saveSong(song);
                generateToast(song.title);
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
                            if(!likeList.includes(props.model.user.uid)) {
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
                        alreadyLikedSong.liked = true
                    }
                })
                
            }

            async function likeAlbumACB(album) {

                await get(ref(db, 'likedAlbums')).then(function(snapshot) {
                    //increment like if user has not aldready like
                    if (snapshot.child(album.id.toString()).exists()) {

                        get(ref(db,'likedAlbums/' +album.id+'/likes')).then(function(snapshot2) {
                            let likeList = Object.values(snapshot2.val())
                            if(!likeList.includes(props.model.user.uid)) {
                                push(ref(db, 'likedAlbums/' + album.id + '/likes'), props.model.user.uid)
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
                        alreadyLikedAlbum.liked = true
                    }
                })
                
            }


            async function likeArtistACB(artist) {

                await get(ref(db, 'likedArtists')).then(function(snapshot) {
                    //increment like if user has not aldready like
                    if (snapshot.child(artist.id.toString()).exists()) {

                        get(ref(db,'likedArtists/' +artist.id+'/likes')).then(function(snapshot2) {
                            let likeList = Object.values(snapshot2.val())
                            if(!likeList.includes(props.model.user.uid)) {
                                push(ref(db, 'likedArtists/' + artist.id + '/likes'), props.model.user.uid)
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
                        alreadyLikedArtist.liked = true
                    }
                })
                
            }

            
        };
    },
}