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

        function ArtistRemoveACB(artist){
            props.model.removeArtist(artist);
        }

        function SongRemoveACB(song){
            props.model.removeSong(song);
        }

        function AlbumRemoveACB(album){
            props.model.removeAlbum(album);
        }

        return function renderACB() {
            return ( <div>
                    <ProfileView 
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




