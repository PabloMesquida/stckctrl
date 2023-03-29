import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import NavBtn from "./NavBtn.js";
import NavUser from "./NavUser.js";
import NavMenu from "./NavMenu.js";
import Footer from "./Footer.js";
import ThemeChanger from "./ThemeChanger.js";
import Logout from "./Logout.js";
import navStyles from "@/styles/Navbar.module.css";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const widthNavigator = useWidthNavigator();

  useEffect(() => {
    setIsVisible(widthNavigator > 640);
  }, [widthNavigator]);

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <nav className={navStyles.header}>
        <button
          type="button"
          className={`${navStyles.menu_toggle_icon} inline-flex sm:hidden ${
            !session && "hidden"
          }`}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <MdMenu />
        </button>
        <div className={`${navStyles.logo} ${!session && "ml-4"}`}>
          stckctrl
        </div>
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
      {widthNavigator < 640 && isVisible && (
        <div
          className="backdrop-blur-sm bg-black/30 fixed inset-0 z-30"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        ></div>
      )}
      <aside
        id="logo-sidebar"
        className={`${navStyles.nav_aside} ${
          !session && "sm:hidden"
        } transition-transform -translate-x-full sm:translate-x-0 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        {session && (
          <div className={navStyles.nav_aside_container}>
            <NavUser session={session} />
            <NavMenu />
            <Logout handleSignOut={handleSignOut} />
          </div>
        )}
      </aside>
      <Footer />
    </>
  );
};

export default Navbar;
