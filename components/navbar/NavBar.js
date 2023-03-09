import { useSession, signOut } from "next-auth/react";
import NavBtn from "./NavBtn.js";
import Navpanel from "./NavPanel.js";
import NavUser from "./NavUser.js";
import Logout from "./Logout.js";
import navStyles from "@/styles/Navbar.module.css";
import ThemeChanger from "./ThemeChanger.js";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <nav className={navStyles.header}>
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className={`${navStyles.menu_toggle_icon} inline-flex sm:hidden`}
        >
          <MdMenu />
        </button>
        <div className={navStyles.logo}>stckctrl</div>
        <div className={navStyles.nav_container}>
          <div className={navStyles.nav}>
            <div id="menu" className={navStyles.nav_btns_container}>
              <ul className={navStyles.ul}>
                <li className="text-center">
                  <NavBtn link="#">Demo</NavBtn>
                </li>
                <li className="text-center">
                  <NavBtn link="#">Contact</NavBtn>
                </li>
              </ul>
              |
            </div>
          </div>
          <ThemeChanger />
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`${navStyles.nav_aside} ${
          !session && "sm:hidden"
        } transition-transform -translate-x-full sm:translate-x-0`}
        aria-label="Sidebar"
      >
        {session && (
          <div className={navStyles.nav_aside_container}>
            <NavUser session={session} />
            <Navpanel />
            <Logout handleSignOut={handleSignOut} />
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;
