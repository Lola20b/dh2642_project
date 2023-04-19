import ProfileView from "../views/profileView";

export default 
{
    name: "Info",
    props: ["model"],
    setup(props) {
        // TODO: Implement functions below
        function ArtistRemoveACB(){
            console.log("ArtistRemoveACB");
        }

        function ArtistAddACB(){
            console.log("ArtistAddACB");
        }

        // same but for songs and albums
        function SongRemoveACB(){
            console.log("SongRemoveACB");
        }

        function SongAddACB(){
            console.log("SongAddACB");
        }

        function AlbumRemoveACB(){
            console.log("AlbumRemoveACB");
        }

        function AlbumAddACB(){
            console.log("AlbumAddACB");
        }

        function print() {
            console.log(props.model.savedArtists)
        }

        return function renderACB() {
            return ( <div>
                    <ProfileView 
                    printPres={print}
                    savedArtists={props.model.savedArtists}
                    savedSongs={props.model.savedSongs}
                    savedAlbums={props.model.savedAlbums}
                    />
                </div>);
        };
    },
}




