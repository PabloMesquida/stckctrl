import stylesGeneral from "@/styles/General.module.css";
import navStyles from "@/styles/Navbar.module.css";
import { MdLogout } from "react-icons/md";

const Logout = ({ handleSignOut }) => {
  return (
    <div className={navStyles.nav_aside_logout_container}>
      <button onClick={handleSignOut} className={stylesGeneral.button_sm}>
        <MdLogout size={24} className="mr-4" /> LogOut
      </button>
    </div>
  );
};

export default Logout;
