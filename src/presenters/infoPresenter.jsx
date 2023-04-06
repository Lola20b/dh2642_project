import InfoView from "../views/infoView";

export default 
{
    name: "Info",
    setup() {
        return function renderACB() {
            return <InfoView type={"song"}
            songData={{title: "Faded", artist: "Alan Walker", custom_song_art_image_url:"https://images.genius.com/708aef5551c9f670205b5cab3f38c8bd.1000x1000x1.jpg", 
            description_preview: "Originally an instrumental from August 2014 titled “Fade,” Alan released this updated version in December 2015 under the slightly-altered name “Faded,” with ISELIN providing vocals. “I’m still just an eighteen year old from Bergen in Norway,” Walker told Genius. Until “Faded” blew up, he was “more concerned about [his] homework and lack of focus in studies than on having a song that was topping the charts in many territories.” I’m just really humble and grateful for the response and feedback this track has gotten. Unimaginable, if that’s possible to say. Just unreal! Restrung Version:"}}
            lyricsData={"[Verse 1] You were the shadow to my light Did you feel us? Another star, you fade away Afraid our aim is out of sight Wanna see us alight [Pre-Chorus 1] Where are you now? Where are you now? Where are you now? Was it all in my fantasy? Where are you now? Were you only imaginary? [Chorus] Where are you now? Atlantis, under the sea, under the sea Where are you now? Another dream The monster's running wild inside of me I'm faded, I'm faded So lost, I'm faded, I'm faded So lost, I'm faded [Verse 2] These shallow waters never met what I needed I'm letting go, a deeper dive Eternal silence of the sea I'm breathing, alive [Pre-Chorus 2] Where are you now? Where are you now? Under the bright but faded lights You set my heart on fire Where are you now? Where are you now? [Chorus] Where are you now? Atlantis, under the sea, under the sea Where are you now? Another dream The monster's running wild inside of me I'm faded, I'm faded So lost, I'm faded, I'm faded So lost, I'm faded"}
        />;
        }
    }
}