function SidebarView(props) {
    return (
        <div class = "sidebarView">
            <div class="username">
                <img src={props.imageSrc} height ="40"></img>
                {props.name}
            </div>
            <div>
                <a href="/">Home</a>
            </div>
            <div>
                <a href="#">Artists</a>
            </div>
            <div>
            <a href="#">Albums</a>
            </div>
            <div>
            <a href="#">Songs</a>
            </div>
            <div>
            <a href="#">Find something!</a>
            </div>
        </div>
    );
}
export default SidebarView;