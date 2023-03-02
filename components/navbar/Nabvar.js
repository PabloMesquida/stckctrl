import { useState } from "react";
import NavBtn from "./NavBtn.js";
import navStyles from "@/styles/Navbar.module.css";
import ThemeChanger from "./ThemeChanger.js";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  return (
    <nav className={navStyles.header}>
      <div className={navStyles.logo}>stckctrl</div>
      <div className={navStyles.nav_container}>
        <div className={navStyles.nav}>
          <div
            id="menu"
            className="p-4 md:p-0 backdrop-blur-2xl fixed md:backdrop-blur-none min-h-screen md:min-h-full top-16 left-0 md:static w-full justify-end md:w-auto md:flex md:justify-center md:items-center text-center md:bg-transparent hidden"
          >
            <ul className={navStyles.ul}>
              <li className="text-center">
                <NavBtn link="#">Demo</NavBtn>
              </li>
              <li className="text-center">
                <NavBtn link="#">Contact</NavBtn>
              </li>
            </ul>
            <div className={navStyles.button_container}></div>
          </div>
        </div>
        <button
          type="button"
          className={navStyles.dark_toggle_button}
          onClick={() => {
            menu
              ? document.getElementById("menu").classList.remove("hidden")
              : document.getElementById("menu").classList.add("hidden");
            setMenu(!menu);
          }}
        >
          <MdMenu />
        </button>
        | <ThemeChanger />
      </div>
    </nav>
  );
};

export default Navbar;
