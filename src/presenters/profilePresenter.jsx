import ProfileView from "../views/profileView";
import { onUnmounted} from "vue";


export default 
{
    name: "Info",
    props: ["model"],
    setup(props) {
        onUnmounted(() => {
            props.model.savedAlbums = [];
            props.model.savedArtists = [];
            props.model.savedSongs = [];
        });

        // TODO: Implement functions below
        function ArtistRemoveACB(artist){
            props.model.removeArtist(artist);
            console.log("ArtistRemoveACB");
        }

        function ArtistAddACB(){
            console.log("ArtistAddACB");
        }

        // same but for songs and albums
        function SongRemoveACB(song){
            props.model.removeSong(song);
            console.log("SongRemoveACB");
        }

        function SongAddACB(){
            console.log("SongAddACB");
        }

        function AlbumRemoveACB(album){
            props.model.removeAlbum(album);
            console.log("AlbumRemoveACB");
        }

        function AlbumAddACB(){
            console.log("AlbumAddACB");
        }

        function print() {
            console.log("model")
            console.log(props.model)
        }

        return function renderACB() {
            return ( <div>
                    <ProfileView 
                    printPres={print}
                    savedArtists={props.model.savedArtists}
                    savedSongs={props.model.savedSongs}
                    savedAlbums={props.model.savedAlbums}

                    onWishRemoveArtist={ArtistRemoveACB}
                    onWishRemoveSong={SongRemoveACB}
                    onWishRemoveAlbum={AlbumRemoveACB}
                    />
                </div>);
        };
    },
}




