import SidebarView from "../views/sidebarView";

export default 
{
    name: "Sidebar",
    setup(){
        return function renderACB() {
            return <SidebarView name={"Music Enjoyer"} imageSrc={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>;
        }
    }
}