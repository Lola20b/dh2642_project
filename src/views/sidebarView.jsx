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
                <a href="/Profile">Profile</a>
            </div>
        </div>
    );
}
export default SidebarView;