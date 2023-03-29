import ProfileView from "../views/profileView";

export default{
    name: "Profile",   // useful for Vue stacktraces
    props: ["user"],
    setup(props){

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



        return function renderACB(props){return (
            <div>
            {<ProfileView artists={["bob   marley", "2pac"]} songs={["woopdido", "sdfjdksfj", "sdjdsfj"]} albums={["mahatma", "ghandi"]}/>}
            </div>

        );};
    },
};