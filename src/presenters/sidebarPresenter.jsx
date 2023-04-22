import { modelToPersistence } from "../firebaseModel";
import SidebarView from "../views/sidebarView";

export default 
    function Sidebar(props) {
        function onLogoutACB() {
            props.model.signOut();
        }

        return <SidebarView 
                logout={onLogoutACB}
                name={props.model.user.email } 
                imageSrc={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>;

    }