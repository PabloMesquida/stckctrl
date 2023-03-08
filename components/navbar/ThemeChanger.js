import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny, MdNightlightRound } from "react-icons/md";
import navStyles from "@/styles/Navbar.module.css";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={navStyles.menu_toggle_button_container}>
      {theme === "dark" ? (
        <button
          className={navStyles.menu_toggle_icon}
          onClick={() => setTheme("light")}
        >
          <MdOutlineWbSunny size={18} />
        </button>
      ) : (
        <button
          className={navStyles.menu_toggle_icon}
          onClick={() => setTheme("dark")}
        >
          <MdNightlightRound size={14} />
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
