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
            <div>
                <button onClick={logoutACB}>
                    Logout
                </button>
            </div>
        </div>
    );

    function logoutACB() {
        props.logout()
    }
}
export default SidebarView;